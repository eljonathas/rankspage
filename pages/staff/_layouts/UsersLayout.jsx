import { useEffect, useState } from "react";

import { FaPlus, FaTimes, FaEnvelope, FaUser, FaIdCard } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import InPageComponent from "../../../components/InPageComponent";

export default function UsersLayout({ updateUsersPage, setUpdateUsersPage }){
    const [openRegisterPage, setOpenRegisterPage] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userRole, setUserRole] = useState(0);

    return (
        <div className="users__container">
            <header className="centered__between classic__header">
                <h1>TODOS OS USUÁRIOS (0)</h1>
                <button onClick={() => setOpenRegisterPage(true)} className="default__button"><FaPlus style={{marginRight: 8}} /> CRIAR USUÁRIO</button>
            </header>

            <CSSTransition 
                in={openRegisterPage === true}  
                unmountOnExit 
                timeout={0}
            >
                <InPageComponent>
                    <div className="__header centered__between">
                        <p>CADASTRAR NOVO USUÁRIO</p>
                        <FaTimes onClick={() => setOpenRegisterPage(false)} size={20} />
                    </div>

                    <div className="__inputs classic__input-table">
                        <label htmlFor="name">
                            <FaUser />
                            <input type="name" name="name" placeholder="Nome e sobrenome" onChange={ e => setUserEmail(e.target.value)}/>
                        </label>
                        <label htmlFor="email">
                            <FaEnvelope />
                            <input type="email" name="email" placeholder="E-mail" onChange={ e => setUserName(e.target.value)}/>
                        </label>
                        <label htmlFor="id">
                            <FaIdCard />
                            <input type="id" name="id" placeholder="Plug ID" onChange={ e => setUserId(e.target.value)}/>
                        </label>
                        {/* <label htmlFor="role">
                            <input type="checkbox" name="role">
                                <option value="1000">Coordenador(a)</option>
                                <option value="2000">Administrador(a)</option>
                                <option value="3000">Desenvolvedor(a)</option>
                            </input>
                        </label> */}
                    </div>
                </InPageComponent>
            </CSSTransition>

            <style>{`
                .classic__input-table label input {
                    width: 400px;
                }
            `}</style>
        </div>
    )
}