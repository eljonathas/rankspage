import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import {FaLongArrowAltRight} from 'react-icons/fa'
import ReactGA from 'react-ga';

export default function Home() {
  
  useEffect(() => {
    ReactGA.initialize('UA-107769128-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="ranks__container">
      <Head>
        <title>Radio Brasil Ranks - Curta com a gente no Plug.dj!</title>
      </Head>
      <header className="ranks__header">
        <h1>Qual rank você deseja visualizar?</h1>
      </header>
      <main className="ranks__guides">
        <Link href="/famous">
          <div className="ranks__box">
            <i className="rks__icon rks-popular"></i>
            <h1 className="box__title">Famosos</h1>
            <p className="box__description">Lista dos usuários com mais seguidores na sala</p>
          </div>
        </Link>
        <Link href="/djs">
          <div className="ranks__box">
            <i className="rks__icon rks-dj"></i>
            <h1 className="box__title">Melhores DJs</h1>
            <p className="box__description">Lista com os DJs que mais receberam super votos na sala</p>
          </div>
        </Link>
        <Link href="/tracks">
          <div className="ranks__box">
            <i className="rks__icon rks-track"></i>
            <h1 className="box__title">Somzera</h1>
            <p className="box__description">Lista com as músicas mais votadas da sala</p>
          </div>
        </Link>
      </main>
      <footer>
        <a href="https://plug.dj/electro-brasil-19" target="_blank" className="to__room"><p>Ir para a sala</p><FaLongArrowAltRight/></a>
        <p className="creator__credits">Made with <i className="rks__icon rks-love"></i> by <a href="https://github.com/eljonathas" target="_blank">TheMars</a></p>
      </footer>
      <style jsx>{`
        .ranks__container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .ranks__guides {
          display: flex;
          align-items: center;
        }

        .ranks__box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 16em;
          height: 18em;
          border-radius: 6px;
          transition: all .3s ease;
          cursor: pointer;
          margin-right: 30px;
          padding: 0 15px;
          background: rgba(255, 255, 255, 0.02);
        }

        .ranks__box:last-child {
          margin-right: 0;
        }

        .ranks__box .box__title {
          font-size: 1.6em;
          font-weight: 600;
          margin-bottom: 3px;
        }


        .ranks__box .box__description {
          font-size: 1em;
          text-align: center;
          color: rgba(255, 255, 255, .5);
        }

        .ranks__box:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.04);
          
        }

        .rks__icon {
          margin-bottom: 15px;
        }

        .footer a {
          margin-right: 0;
        }
      `}</style>
    </div>
  )
}
