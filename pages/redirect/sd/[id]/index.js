import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import ReactGA from 'react-ga';

export default function Soundcloud(){
    useEffect(() => {
        ReactGA.initialize('UA-107769128-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <div className="ranks__container">
            <Head>
                <title>Redirecionando para Soundcloud - Radio Brasil</title>
            </Head>
            <h3>Opa! Infelizmente não podemos redirecionar você para esta música por aqui.<br/>Mesmo assim, você pode tentar procurar pelo seu nome no site de origem.</h3>
            <footer>
                <div className="footer__buttons">
                    <Link href="/ranks/tracks"><a className="to__room back"><FaLongArrowAltLeft/><p>Voltar</p></a></Link>
                    <a href={`https://soundcloud.com}`} className="to__room custom"><p>Ir para o Soundcloud</p><FaLongArrowAltRight></FaLongArrowAltRight></a>
                </div>
                <p className="creator__credits">Made with <i className="rks__icon rks-love"></i> by <a href="https://github.com/eljonathas" target="_blank">TheMars</a></p>
            </footer>
            <style jsx>{`
                h3 {
                    text-align: center;
                }

                .footer__buttons .custom {
                    border-color: #ff7400;
                    background: #ff7400;
                    color: white;
                }

                .footer__buttons .custom:hover {
                    border-color: #ff7400;
                }
            `}</style>
        </div>
    )
}