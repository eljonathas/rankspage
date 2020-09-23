import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { 
    FaHeart, 
    FaTrophy,
    FaUserFriends,
    FaUserPlus,
    FaLongArrowAltRight,
    FaLongArrowAltLeft,
    FaCircle
} from 'react-icons/fa';
import api from '../../../services/api';
import UserRows from '../../../components/UserRows';
import ConquestRows from '../../../components/ConquestRows';
import ProfileLoader from '../../../components/ProfileLoader';
import ReactGA from 'react-ga';


export default function User(){
    const [isLoading, setIsLoading]         = useState(true);
    const [userData, setUserData]           = useState([]);
    const [userLove, setUserLove]           = useState([]);
    const [displayName, setDisplayName]     = useState('');
    const [displayRefer, setDisplayRefer]   = useState('friends');
    const [displayShow, setDisplayShow]     = useState([]);

    useEffect(() => {
        if(window.location.pathname.match(/[0-9].*/) == null){
            document.getElementsByClassName('ranks__container')[0].classList.remove('user__profile');
            document.getElementsByClassName('ranks__container')[0].innerHTML = '<p>Usuário inválido</p>';
            return;
        }

        api.get("/user/"+window.location.pathname.match(/[0-9].*/)[0]).then(response => {
            if(response.data && !response.data.error){
                setUserData(response.data);
                setDisplayName(`Seguidores de ${response.data.username} (${response.data.allfans})`);

                // get user love data
                if(response.data.love)
                    api.get(`/get/love/${response.data.pid}`).then(resp => setUserLove(resp.data));
            }
        });

        ReactGA.initialize('UA-107769128-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    useEffect(() => {
        setIsLoading(true);

        if(displayRefer === 'friends'){
            // get user fans
            api.get(`/get/fans/${window.location.pathname.match(/[0-9].*/)[0]}`).then(resp => {
                setDisplayShow(resp.data);
                setIsLoading(false);
            });
        }else
        if(displayRefer === 'followers'){
            // get user followed
            api.get(`/get/followed/${window.location.pathname.match(/[0-9].*/)[0]}`).then(resp => {
                setDisplayShow(resp.data);
                setIsLoading(false);
            });
        }else{
            api.get(`/get/conquests/${window.location.pathname.match(/[0-9].*/)[0]}`).then(resp => {
                const reverseData = resp.data.slice(0).reverse();

                setDisplayShow(reverseData);
                setIsLoading(false);
            });
        }
    }, [displayRefer]);

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

            setDisplayShow([]);

            switch(dataTarget){
                case 'fans':
                    setDisplayRefer('friends');
                    setDisplayName(`Seguidores de ${userData.username} (${userData.allfans})`);
                    break;
                case 'following':
                    setDisplayRefer('followers');
                    setDisplayName(`Usuários que ${userData.username} segue (${userData.allfollowed})`);
                    break;
                case 'conquests':
                    setDisplayRefer('conquests');
                    setDisplayName(`Conquistas de ${userData.username} (${sizeOf(userData.conquests)})`);
                    break;
            }
        }
    }

    if(!userData.pid){
        return <ProfileLoader/>;
    }

    return (
        <div className="ranks__container user__profile">
            <Head>
                <title>Perfil de {userData.username} - Radio Brasil</title>
            </Head>
            <header className={`user__header ${userData.bg ? 'have__bg': ''}`}>
                {
                    userData.bg && ( <div className="__bg" style={{backgroundImage: `url(${userData.bg})`}}></div>)
                }
                <div className="user__information">
                    <div className="user__photo">
                        <div className="__image" style={{backgroundImage: `url("${userData.image}")`}}></div>
                    </div>
                    <div className="user__info">
                        <h1 className="user__name">{userData.username} 
                            <span className={`user__status ${userData.inRoom ? 'online':'offline'}`}>
                                <FaCircle 
                                    size={9}
                                    style={{color: 'inherit', marginRight: '5px'}}
                                /> 
                                {userData.inRoom ? "Na sala":"Offline"}
                            </span>
                        </h1>
                        <p className="user__jointime">Logado pela primeira vez em {parseMsToDate(userData.jointime)}</p>
                        <h3 className="user__relationship">
                            {userData.love === 0 ? (<><FaHeart size={16}></FaHeart><p>Sem relacionamento</p></>) 
                            : (
                                <a href={`/user/${userLove.loveid}`} target="_blank">
                                    <i className="rks__icon rks-love"></i><p>{userLove.lovename}</p>
                                </a>
                            )
                            }
                        </h3>
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
                        !isLoading ? displayShow.map((item, key) => {
                                if(displayRefer === "conquests") {
                                    console.log(item);

                                    return (
                                        <ConquestRows 
                                            key={key}
                                            conquest_id={item}
                                        />
                                    )
                                }else{
                                    return (
                                        <UserRows 
                                            key={key} 
                                            user_name={item.username} 
                                            user_photo={item.image}
                                            link={`/user/${item.pid}`}
                                        />
                                    )
                                }
                            }
                        ) : (
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
                    padding: 12px;
                    margin-top: 40px;                    
                    width: 50em;
                    border-radius: 6px;
                    background: rgba(255, 255, 255, .05);
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    position: relative;
                }

                .user__header.have__bg .__bg {
                    position: absolute;
                    border-radius: 6px;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    z-index: 2;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                }

                .user__information {
                    padding: 10px 30px 20px;
                    display: flex;
                    align-items: center;
                }

                .user__header.have__bg .user__information {
                    text-shadow: 0 2px 4px rgba(0,0,0,.2);
                }

                .user__photo {
                    width: 7em;
                    height: 7em;
                    max-width: 7em;
                    min-width: 7em;
                    max-height: 7em;
                    min-height: 7em;
                    border-radius: 100%;
                    background: rgba(255,255,255,.1);
                    margin-right: 25px;
                    z-index: 5;
                }

                .user__photo .__image {
                    width: inherit;
                    height: inherit;
                    border-radius: 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                }

                .user__info {
                    z-index: 5;
                }

                .user__name {
                    margin-bottom: 3px;
                    font-weight: 600;
                    line-break: anywhere;
                    display: flex;
                    align-items: center;
                }

                .user__status {
                    font-size: 13px;
                    text-transform: uppercase;
                    background: #2c2f33;
                    padding: 3px 8px;
                    border-radius: 4px;
                    text-shadow: none;
                    margin-left: 10px;
                }

                .user__status.online {
                    color: #2aca30;
                }

                .user__status.offline {
                    color: rgba(255, 255, 255, .5);
                }

                .user__jointime {
                    color: rgba(255, 255, 255, .5);
                    margin-bottom: 18px;
                }

                .user__header.have__bg .user__jointime {
                    color: #eee;   
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
                    margin-top: 12px;
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
                    z-index: 5;
                }

                .user__header.have__bg .user__navigator .__item {
                    color: #ddd;
                }

                .user__navigator .__item:hover {
                    background: rgba(255, 255, 255, .05);
                }

                .user__header.have__bg .user__navigator .__item:hover{
                    background: rgba(0, 0, 0, .5);
                }

                .user__navigator .__item.active {
                    background: rgba(255, 255, 255, .1);
                    color: white !important;
                }

                .user__header.have__bg .user__navigator .__item.active{
                    background: #2c2f33;
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
                    margin-left: 5px;
                }

                .user__list .__list {
                    display: flex;
                    flex-wrap: wrap;
                    max-width: 50em;
                }

                .loader__card {
                    display: flex;
                    border-radius: 6px;
                    background: rgba(0, 0, 0, .2);
                    width: 9.37em;
                    height: 10em;
                    max-width: 9.37em;
                    margin-bottom: 10px;
                    margin-left: 5px;
                    margin-right: 5px;
                    flex-grow: 1;
                }

                footer {
                    margin-bottom: 30px;
                }
            `}</style>
        </div>
    )
}