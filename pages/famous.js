import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RanksPodium from '../components/RanksPodium';
import RanksList from '../components/RanksList';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import api from '../services/api';
import ReactGA from 'react-ga';

export default function Famous(){
    const [topUsers, setTopUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get('/top/users').then(response => {
            setTopUsers(response.data);
            setIsLoading(false);
        });

        ReactGA.initialize('UA-107769128-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <div className="ranks__container">
            <Head>
                <title>{(!isLoading && 'Usuários mais famosos') || 'Carregando'} - Radio Brasil</title>
            </Head>
            <header className="ranks__header">
                <h1 className="ranks__title">Usuários com mais seguidores atualmente</h1>
                {
                    (() => {
                        if(!isLoading){    
                            if(topUsers.length >= 3){
                                return (
                                    <RanksPodium 
                                        first={topUsers[0].username} 
                                        first_id={topUsers[0].pid}
                                        first_value={topUsers[0].allfans} 

                                        second={topUsers[1].username } 
                                        second_id={topUsers[1].pid}
                                        second_value={topUsers[1].allfans}  

                                        third={topUsers[2].username } 
                                        third_id={topUsers[2].pid}
                                        third_value={topUsers[2].allfans}  

                                        link="/user/"
                                    />
                                )
                            }else{
                                return (
                                    <p className="info__center podium">Não há usuários para serem exibidos</p>
                                )
                            }
                        }else{
                            return (
                                <div className="podium__loaders">
                                    <div className="podium__loader"></div>
                                    <div className="podium__loader"></div>
                                    <div className="podium__loader"></div>
                                </div>
                            )
                        }
                    })()
                }
            </header>
            <main className="ranks__main">
                <h1 className="main_title">Veja a posição de outros usuários</h1>
                {
                    (isLoading && (
                        <>
                            <div className="row__loader"></div>
                            <div className="row__loader"></div>
                            <div className="row__loader"></div>
                            <div className="row__loader"></div>
                            <div className="row__loader"></div>
                            <div className="row__loader"></div>
                            <div className="row__loader"></div>
                            <div className="row__loader"></div>
                        </>
                    )) || (topUsers.length > 3 ? topUsers.map((user, index) => {
                        if(index > 2)
                            return (
                                <RanksList
                                    key={index}
                                    position={index+1} 
                                    name={user.username} 
                                    value={user.allfans} 
                                    link={`/user/`}
                                    data_id={user.pid}
                                    type="FÃS"
                                />
                            )
                    }) : (
                        <p className="info__center">Não há mais usuário para serem exibidos</p>
                    ))
                }
            </main>
            <footer>
                <div className="footer__buttons">
                    <Link href="/"><a className="to__room back"><FaLongArrowAltLeft/><p>Voltar</p></a></Link>
                    <a href="https://plug.dj/electro-brasil-19" target="_blank" className="to__room"><p>Ir para a sala</p><FaLongArrowAltRight></FaLongArrowAltRight></a>
                </div>
                <p className="creator__credits">Made with <i className="rks__icon rks-love"></i> by <a href="https://github.com/eljonathas" target="_blank">TheMars</a></p>
            </footer>
            <style jsx>{`
                .ranks__container {
                    justify-content: normal;     
                    padding: 40px 0;
                }

                .ranks__header {
                    width: 50em;
                }

                .ranks__title, .main_title {
                    font-size: 1.5em;
                    font-weight: 600;
                    text-align: center;
                }

                .main_title {
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
}