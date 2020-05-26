import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import RanksPodium from '../../components/RanksPodium';
import RanksList from '../../components/RanksList';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import ReactGA from 'react-ga';

export default function Djs(){
    const [topDjs, setTopDjs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get('/top/djs').then(response => {
            setTopDjs(response.data);
            setIsLoading(false);
        });

        ReactGA.initialize('UA-107769128-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <div className="ranks__container">
            <Head>
                <title>{(!isLoading && 'DJs mais elogiados') || 'Carregando'} - Radio Brasil</title>
            </Head>
            <header className="ranks__header">
                <h1 className="ranks__title">Os melhores DJs da sala atualmente</h1>
                {
                    (() => {
                        if(!isLoading){
                            if(topDjs.length >= 3){
                                return (
                                    <div className="ranks__podium">
                                        <RanksPodium 
                                            name={topDjs[1].username} 
                                            value={topDjs[1].bigwoots}
                                            link={`/user/[id]`}
                                            as={`/user/${topDjs[1].pid}`}
                                            height={6}
                                            step={2}
                                        />
                                        <RanksPodium 
                                            name={topDjs[0].username} 
                                            value={topDjs[0].bigwoots}
                                            link={`/user/[id]`}
                                            as={`/user/${topDjs[0].pid}`}
                                            height={8}
                                            step={1}
                                        />
                                        <RanksPodium 
                                            name={topDjs[2].username} 
                                            value={topDjs[2].bigwoots}
                                            link={`/user/[id]`}
                                            as={`/user/${topDjs[2].pid}`}
                                            height={4}
                                            step={3}
                                        />
                                    </div>
                                )
                            }else{
                                return (
                                    <p className="info__center podium">Não há djs para serem exibidos</p>
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
                <h1 className="main_title">Veja a colocação de outros DJs favoritos</h1>
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
                    )) || (topDjs.length > 3 ? topDjs.map((user, index) => {
                        if(index > 2)
                            return (
                                <RanksList
                                    key={index}
                                    position={index+1} 
                                    name={user.username} 
                                    value={user.bigwoots} 
                                    link={`/user/`}
                                    data_id={user.pid}
                                    type="VOTOS" 
                                />
                            )
                    }) : (
                        <p className="info__center">Não há mais djs para serem exibidos</p>
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