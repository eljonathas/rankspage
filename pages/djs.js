import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../services/api';
import RanksPodium from '../components/RanksPodium';
import RanksList from '../components/RanksList';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

export default function Djs(){
    const [topDjs, setTopDjs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get('/top/djs').then(response => {
            setTopDjs(response.data);
            setIsLoading(false);
        });
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
                                    <RanksPodium 
                                        first={topDjs[0].username} 
                                        first_id={topDjs[0].pid}
                                        first_value={topDjs[0].bigwoots} 

                                        second={topDjs[1].username } 
                                        second_id={topDjs[1].pid}
                                        second_value={topDjs[1].bigwoots}  

                                        third={topDjs[2].username } 
                                        third_id={topDjs[2].pid}
                                        third_value={topDjs[2].bigwoots}  

                                        link="/user/"
                                    />
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