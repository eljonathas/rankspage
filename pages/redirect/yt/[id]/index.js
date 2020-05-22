import { useEffect, useState } from 'react';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';
import SongRedirect from '../../../../components/SongRedirect';
import ReactGA from 'react-ga';

export default function Youtube(){
    const [songId, setSongId] = useState('');

    useEffect(() => {
        if(window.location.pathname.match(/yt+\/[A-z0-9].*/) == null)
            return document.getElementsByClassName('ranks__container')[0].innerHTML = '<p>Música inválida</p>';

        setSongId(window.location.pathname.match(/yt+\/[A-z0-9].*/)[0].split("yt/")[1]);
        
        ReactGA.initialize('UA-107769128-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <div className="ranks__container">
            <Head>
                <title>Redirecionando para Youtube - Radio Brasil</title>
            </Head>
            {
                songId.length && (<SongRedirect source="https://youtube.com/watch?v=" media_id={songId}></SongRedirect>)
            }
            <footer>
                <div className="footer__buttons">
                    <Link href="/ranks/tracks"><a className="to__room back"><FaLongArrowAltLeft/><p>Voltar</p></a></Link>
                    <a href={`https://youtube.com/watch?v=${songId}`} className="to__room custom"><p>Estou com pressa</p><FaLongArrowAltRight></FaLongArrowAltRight></a>
                </div>
                <p className="creator__credits">Made with <i className="rks__icon rks-love"></i> by <a href="https://github.com/eljonathas" target="_blank">TheMars</a></p>
            </footer>
            <style jsx>{`
                .footer__buttons .custom {
                    border-color: #F44336;
                    background: #F44336;
                    color: white;
                }

                .footer__buttons .custom:hover {
                    border-color: #ff5346;
                    background: #ff5346;
                }
            `}</style>
        </div>
    )
}