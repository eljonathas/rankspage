import { useState } from "react";
import Router from 'next/router';
import { FaCog, FaSignOutAlt } from "react-icons/fa";

import { CSSTransition } from 'react-transition-group';

import StaffMainNavbar from "../../../components/StaffMainNavbar";
import StaffInlineMenu from "../../../components/StaffInlineMenu";
import BadgesLayout from "./BadgesLayout";
import NotionsLayout from "./NotionsLayout";
import RightColumnLayout from "./RightColumnLayout";
import UsersLayout from "./UsersLayout";


export default function MainLayout({ userInfo }){
    const [onDisplay, setOnDisplay] = useState('badges')

    const [updateNote, setUpdateNote] = useState(false);
    const [updatePageNote, setUpdatePageNote] = useState(false);

    const [updateUsersPage, setUpdateUsersPage] = useState(false);


    function handleNavigatorClick(e){
        const targetItem = e.target;
        const inlineNavigatorItems = document.querySelectorAll('.inline__navbar li');

        inlineNavigatorItems.forEach(element => {
            element.classList.remove('active')
        });

        targetItem.classList.add('active');
        setOnDisplay(targetItem.getAttribute('ref_item'));
    }
    
    return (
        <div className="main-container">
            <StaffMainNavbar>
                <div className="__logo">
                    <img src="/assets/images/logo.jpeg" width={50} alt="Logo"/>
                    <p>Radio Brasil <span>Dashboard <span>v1.0</span></span></p>
                </div>
                <div className="user__info">
                    <FaCog size={25}/>
                    <FaSignOutAlt className="__exit" size={25} onClick={() => {
                        localStorage.removeItem('enterpass');

                        Router.push('/staff');
                    }}/>

                    <p>{ userInfo.name }</p>

                    <span>
                        { userInfo.name.substring(0, 1) }
                    </span>
                </div>

                <style>{`
                    .main-navbar .__logo,
                    .main-navbar .user__info,
                    .main-navbar .user__info span {
                        display: flex;
                        align-items: center;
                    }

                    .main-navbar .__logo img {
                        border-radius: 50%;
                        margin-right: 15px;
                    }

                    .main-navbar .__logo p {
                        font-size: 1.4em;
                        font-weight: 600;

                        display: flex;
                        align-items: center;
                        align-self: center;
                    }

                    .main-navbar .__logo p > span {
                        border-left: solid 2px rgba(255, 255, 255, .2);
                        padding-left: 10px;
                        margin-left: 10px;
                        color: rgba(255, 255, 255, .5);

                        font-size: .8em;
                        font-weight: 600;
                    }
                    
                    .main-navbar .__logo p > span > span {
                        font-size: .7em;
                    }

                    .main-navbar .user__info svg {
                        margin-right: 30px;
                        cursor: pointer;
                        color: rgba(255, 255, 255, .5);

                        transition: all ease .2s;
                    }

                    .main-navbar .user__info svg:hover {
                        color: white;
                    }

                    .main-navbar .user__info p {
                        font-size: 1.2em;
                        margin-right: 20px;
                    }

                    .main-navbar .user__info span {
                        background: #4CAF50;
                        border-radius: 50%;
                        font-weight: bold;
                        font-size: 1.7em;
                        width: 50px;
                        height: 50px;
                        justify-content: center;
                    }
                `}</style>
            </StaffMainNavbar>

            <section className="group__items">
                <StaffInlineMenu>
                    <li onClick={handleNavigatorClick} ref_item="badges" className="active">Pedidos de Emblemas</li>
                    <li onClick={handleNavigatorClick} ref_item="notions">Quadro de Notas</li>
                    <li onClick={handleNavigatorClick} ref_item="users">Usuários</li>
                    <li onClick={handleNavigatorClick} ref_item="system_notifications">Eventos</li>
                </StaffInlineMenu>

                <div className="in__columns">
                    <div className="main__column">
                        <CSSTransition in={onDisplay === 'badges'} unmountOnExit timeout={0}>
                            <BadgesLayout />
                        </CSSTransition>

                        <CSSTransition in={onDisplay === 'notions'} unmountOnExit timeout={0}>
                            <NotionsLayout 
                                updateNote={updateNote} 
                                setUpdateNote={setUpdateNote}
                                updatePageNote={updatePageNote}
                                setUpdatePageNote={setUpdatePageNote}
                            />
                        </CSSTransition>

                        <CSSTransition in={onDisplay === 'users'} unmountOnExit timeout={0}>
                            <UsersLayout
                                updateUsersPage={updateUsersPage}
                                setUpdateUsersPage={setUpdateUsersPage}
                            />
                        </CSSTransition>
                    </div>
                    <div className="right__column">
                        <RightColumnLayout updateNote={updateNote} />
                    </div>
                </div>

                <style>{`
                    .group__items {
                        margin-top: 2em;
                        padding: 0 4em;
                        margin-bottom: 2em;
                    }

                    .group__items .in__columns {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        column-gap: 30px;
                    }

                    .main__column {
                        width: 100%;
                    }
                `}</style>
            </section>
        </div>
    )
}