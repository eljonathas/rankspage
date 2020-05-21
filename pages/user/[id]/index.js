import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaHeart, FaTrophy, FaUserFriends, FaUserPlus, FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import Link from 'next/link';
import api from '../../../services/api';
import Head from 'next/head';
import UserRows from '../../../components/UserRows';


export default function User(){
    const [userData, setUserData]           = useState([]);
    const [userLove, setUserLove]           = useState([]);
    const [userFans, setUserFans]           = useState([]);
    const [userFollowed, setUserFollowed]   = useState([]);
    const [isLoading, setIsLoading]         = useState(true);
    const [displayName, setDisplayName]     = useState('');
    const [displayRefer, setDisplayRefer]   = useState('');
    const [displayShow, setDisplayShow]     = useState([]);

    useEffect(() => {
        if(window.location.pathname.match(/[0-9].*/) == null){
            document.getElementsByClassName('ranks__container')[0].classList.remove('user__profile');
            document.getElementsByClassName('ranks__container')[0].innerHTML = '<p>Usuário inválido</p>';
            return;
        }

        api.get(`/user/${window.location.pathname.match(/[0-9].*/)[0]}`).then(response => {
            if(response.data && !response.data.error){
                setUserData(response.data);
                setDisplayName(`Seguidores de ${response.data.username} (${response.data.allfans})`);

                // get user fans
                api.get(`/get/fans/${response.data.pid}`).then(resp => {
                    setUserFans(resp.data);
                    setDisplayShow(resp.data);
                    setIsLoading(false);
                });

                // get user love data
                if(response.data.love)
                    api.get(`/get/love/${response.data.pid}`).then(resp => setUserLove(resp.data));

                // get user followed
                api.get(`/get/followed/${response.data.pid}`).then(resp => setUserFollowed(resp.data));
            }else{
                document.getElementsByClassName('ranks__container')[0].classList.remove('user__profile');
                document.getElementsByClassName('ranks__container')[0].innerHTML = '<p>Usuário inválido</p>';
            }
        });
    }, []);

    function parseMsToDate(time){
        let thisDate = new Date(time);

        return `${thisDate.getDate()}/${thisDate.getMonth()+1}/${thisDate.getFullYear()}`
    }

    function sizeOf(array) {
        if(typeof array.length != 'undefined')
            return array.length;
        else
            return 0;
    }

    function handleClickItem(event) {
        const dataTarget = event.target.getAttribute('data-row');
        const classList = event.target.classList;

        if(!classList.contains('active')){
            document.querySelectorAll('.user__navigator .__item').forEach(element => {
                element.classList.remove('active');
            });

            event.target.classList.add('active');

            switch(dataTarget){
                case 'fans':
                    setDisplayName(`Seguidores de ${userData.username} (${userData.allfans})`);
                    setDisplayShow(userFans);
                    setDisplayRefer('friends');
                    break;
                case 'following':
                    setDisplayName(`Usuários que ${userData.username} segue (${userData.allfollowed})`);
                    setDisplayShow(userFollowed);
                    setDisplayRefer('friends');
                    break;
                case 'conquests':
                    setDisplayName(`Conquistas de ${userData.username} (${sizeOf(userData.conquests)})`);
                    setDisplayShow(userData.conquests);
                    setDisplayRefer('conquests');
                    break;
            }
        }
    }

    return (
        <div className="ranks__container user__profile">
            <Head>
                <title>{userData.username || 'Carregando'} - Radio Brasil</title>
            </Head>
            <header className="user__header">
                <div className="user__information">
                    <div className="user__photo">
                        <div className="__image" style={{backgroundImage: `url("${userData.image}")`}}></div>
                    </div>
                    <div className="user__info">
                        {
                            (!isLoading && (<h1 className="user__name">{userData.username}</h1>))
                            || (<div className="loader__bar name"></div>)
                        }
                        {
                            (!isLoading && (<p className="user__jointime">Logado pela primeira vez em {parseMsToDate(userData.jointime)}</p>))
                            || (<div className="loader__bar time"></div>)
                        }
                        {
                            (!isLoading && 
                                (<h3 className="user__relationship">
                                    {userData.love === 0 ? (<><FaHeart size={16}></FaHeart><p>Sem relacionamento</p></>) : 
                                    (
                                        <a href={`/user/${userLove.loveid}`} target="_blank">
                                            <i className="rks__icon rks-love"></i><p>{userLove.lovename}</p>
                                        </a>
                                    )
                                    }
                                </h3>)
                            ) || (<div className="loader__bar love"></div>)
                        }
                    </div>
                </div>
                <ul className="user__navigator">
                    <IconContext.Provider value={{size: 18, style: { verticalAlign: 'middle' , position: 'relative', top: '-1.6px', marginRight: '4px'}}}>
                        <li onClick={event => handleClickItem(event)} data-row="fans" className="__item active"><FaUserFriends/> Fãs ({userData.allfans || 0})</li>
                        <li onClick={event => handleClickItem(event)} data-row="following" className="__item"><FaUserPlus/> Seguindo ({userData.allfollowed || 0})</li>
                        <li onClick={event => handleClickItem(event)} data-row="conquests" className="__item"><FaTrophy/> Conquistas ({userData.conquests ? sizeOf(userData.conquests) : 0})</li>
                    </IconContext.Provider>
                </ul>
            </header>
            <main className="user__list">
                <h1 className="__title">{displayName}</h1>
                <div className="__list">
                    {
                        (!isLoading && displayShow.map((user, key) => 
                            <UserRows type={displayRefer} key={key} user_id={user.pid} user_name={user.username} user_photo={user.image}/>
                        )) || (
                            <>
                                <div className="loader__card"></div>
                                <div className="loader__card"></div>
                                <div className="loader__card"></div>
                                <div className="loader__card"></div>
                                <div className="loader__card"></div>
                                <div className="loader__card"></div>
                                <div className="loader__card"></div>
                                <div className="loader__card"></div>
                                <div className="loader__card"></div>
                                <div className="loader__card"></div>
                            </>
                        )
                    }
                </div>
            </main>
            <footer>
                <div className="footer__buttons">
                    <Link href="/"><a className="to__room back"><FaLongArrowAltLeft/><p>Início</p></a></Link>
                    <a href="https://plug.dj/electro-brasil-19" target="_blank" className="to__room"><p>Ir para a sala</p><FaLongArrowAltRight></FaLongArrowAltRight></a>
                </div>
                <p className="creator__credits">Made with <i className="rks__icon rks-love"></i> by <a href="https://github.com/eljonathas" target="_blank">TheMars</a></p>
            </footer>
            <style jsx>{`
                .user__profile {
                    justify-content: normal;
                }

                .user__header {
                    padding: 10px;
                    margin-top: 40px;
                    background: rgba(255, 255, 255, .05);
                    width: 50em;
                }

                .user__information {
                    padding: 10px 30px 20px;
                    display: flex;
                    align-items: center;
                }

                .user__photo {
                    width: 6em;
                    height: 6em;
                    max-width: 6em;
                    min-width: 6em;
                    max-height: 6em;
                    min-height: 6em;
                    border-radius: 100%;
                    background: rgba(255, 255, 255, .1);
                    margin-right: 25px;
                }

                .user__photo .__image {
                    width: inherit;
                    height: inherit;
                    border-radius: 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                }

                .user__name {
                    margin-bottom: 3px;
                    font-weight: 600;
                    line-break: anywhere;
                }

                .user__jointime {
                    color: rgba(255, 255, 255, .5);
                    margin-bottom: 15px;
                }

                .user__relationship {
                    display: flex;
                    align-items: center;
                }

                .user__relationship p {
                    margin-left: 6px;
                    font-size: 16px;
                }

                .user__relationship a {
                    text-decoration: none;
                    color: white;
                    display: flex;
                    align-items: center;
                }

                .user__relationship .rks__icon {
                    display: block;
                    width: 18px;
                    height: 18px;
                    position: relative;
                    top: 1px;
                }
                
                .user__navigator {
                    margin-top: 10px;
                    list-style: none;
                    display: flex;
                    padding: 0 10px 5px;
                }

                .user__navigator .__item {
                    padding: 10px 15px;
                    margin-right: 10px;
                    color: rgba(255, 255, 255, .5);
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all .3s ease;
                }

                .user__navigator .__item:hover {
                    background: rgba(255, 255, 255, .05);
                }

                .user__navigator .__item.active {
                    background: rgba(255, 255, 255, .1);
                    color: white;
                }

                .user__list {
                    width: 50em;
                    margin-top: 30px;
                }

                .user__list .__title {
                    text-align: start;
                    font-size: 1.3em;
                    color: rgba(255, 255, 255, .5);
                    margin-bottom: 15px;
                }

                .user__list .__list {
                    display: flex;
                    flex-wrap: wrap;
                    max-width: 50em;
                }

                .loader__bar {
                    border-radius: 5px;
                    width: 20em;
                    height: 2em;
                    background: rgba(255, 255, 255, .1);
                }

                .loader__bar.name {
                    width: 25rem;
                    margin-bottom: 15px;
                }

                .loader__bar.time {
                    height: 1.8em;
                    margin-bottom: 20px;
                }

                .loader__bar.love {
                    height: 1.5em;
                    width: 18em;
                }

                .loader__card {
                    display: flex;
                    border-radius: 6px;
                    background: rgba(0, 0, 0, .2);
                    width: 9.37em;
                    height: 10em;
                    max-width: 9.37em;
                    margin-bottom: 10px;
                    flex-grow: 1;
                    margin-right: 10px;
                }

                footer {
                    margin-bottom: 30px;
                }
            `}</style>
        </div>
    )
}