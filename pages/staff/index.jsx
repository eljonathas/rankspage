import { useState, useEffect } from "react";
import { CSSTransition } from 'react-transition-group';
import Router from 'next/router'
import Head from 'next/head'

import api from '../../services/api';

import LoginLanding from "./_layouts/LoginLanding";
import LoadingLayout from "./_layouts/LoadingLayout";
import InfoDisplay from '../../components/InfoDisplay'

export default function Index(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [findAnError, setFindAnError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const [activeComponent, setActiveComponent] = useState('main');

    const [loadingText, setLoadingText] = useState('Aguarde...');
    const [loadingIcon, setLoadingIcon] = useState('/assets/images/rolling.svg');

    useEffect(() => {
        if(localStorage.getItem('enterpass')){
            Router.push('/staff/home')
        }
    }, []);
    
    function handleSendData(e){
        e.preventDefault();

        if(!email || !senha) return;

        setActiveComponent('loading');

        api.post('/staff/login', {email, senha}).then(response => {
            const { token, error } = response.data;

            if(!error){
                localStorage.setItem('enterpass', token)

                setLoadingIcon('/assets/images/check-icon.svg')
                setLoadingText('Pronto!')

                Router.push('/staff/home')
            }else{
                setFindAnError(true)
                setErrorMessage(error)

                setLoadingIcon('/assets/images/exclamation-icon.svg')
                setLoadingText('Erros econtrados:')
            }
        });
    }

    return (
        <div className="staff__container">
            <Head>
                <title>Acessar plataforma da Staff - Radio Brasil</title>
            </Head>

            <CSSTransition
                in={activeComponent === 'main'}
                unmountOnExit
                timeout={500}
                classNames="main"
            >
                <LoginLanding 
                    submitFuncion={handleSendData}
                    setEmail={setEmail}
                    setSenha={setSenha}
                />
            </CSSTransition>

            <CSSTransition
                in={activeComponent === 'loading'}
                unmountOnExit
                timeout={500}
                classNames="loading"
            >
                <LoadingLayout
                    iconLink={loadingIcon}
                    displayText={loadingText}
                >
                    { findAnError && (
                        <>
                            <InfoDisplay
                                text={errorMessage}
                            />

                            <button 
                                onClick={() => {
                                    setFindAnError(false)
                                    setActiveComponent('main')
                                    setLoadingIcon('/assets/images/rolling.svg')
                                    setLoadingText('Aguarde...')
                                }} 
                                className="back-button"
                            >
                                Voltar
                            </button>
                        </>
                    ) }
                </LoadingLayout>
            </CSSTransition>

        <style>{`
        .back-button {
            border: transparent;
            outline: none;
            cursor: pointer;
            background: rgba(255, 255, 255, .1);

            border-radius: 5px;
            color: white;
            font-size: 1.1em;
            font-weight: 500;

            padding: 1em 2em;
        }

        .back-button:hover {
            background: rgba(255, 255, 255, .15);
        }

        .main-enter {
            position: absolute;
            opacity: 0;   
        }

        .main-enter-active {
            opacity: 1;
            transition: all ease .5s;
        }

        .main-exit {
            position: absolute;
            opacity: 0;
        }

        .main-exit-active {
            
        }

        .loading-enter {
            opacity: 0;   
            transform: scale(.5);
        }

        .loading-enter-active {
            opacity: 1;
            transform: scale(1);
            transition: all ease .5s;
        }

        .loading-exit {
            opacity: 0;
            position: absolute;
        }

        .loading-exit-active {
            transform: scale(.5);
        }
        `}</style>
        </div>
    )
}   