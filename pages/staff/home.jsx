import { useState, useEffect } from "react"
import Head from 'next/head'
import Router from 'next/router'

import api from "../../services/api"
import LoadingLayout from "./_layouts/LoadingLayout";
import MainLayout from "./_layouts/MainLayout";

export default function Home(){
    const [staffInfo, setStaffInfo] = useState([]);

    const [checkingInfo, setCheckingInfo] = useState(true);

    useEffect(() => {
        const enterPass = localStorage.getItem('enterpass');


        api.get('/staff', {
            headers: {
                "x-access-token": enterPass
            }
        }).then(response => {
            const { error, data } = response.data;

            if(error){
                if(localStorage.getItem('enterpass')){
                    localStorage.removeItem('enterpass');
                }

                Router.push('/staff');
            }else{
                setStaffInfo(response.data);
                setCheckingInfo(false);
            }
        });
    }, []);

    if(checkingInfo){
        return (
            <>
                <Head>
                    <title>Verificando os dados...</title>
                </Head>
                <LoadingLayout
                    iconLink="/assets/images/rolling.svg"
                    displayText="Verificando..."
                />
                <style>{`
                .loading-component {
                    height: 100vh;
                    align-self: center;
                }
                `}</style>
            </>
        )
    }else{
        return (
            <>
                <Head>
                    <title>Dashboard - Rádio Brasil</title>
                </Head>
                <MainLayout userInfo={staffInfo}/>
            </>
        )
    }
}