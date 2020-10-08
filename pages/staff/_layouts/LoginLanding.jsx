import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginLanding(props){
    return (
        <div className="main__container">
            <div className="content">
                <div className="information">
                    <h1><img src="/assets/images/logo.jpeg" alt="Radio Brasil"/> Radio Brasil<span>STAFF ONLY</span></h1>
                    <h3>Faça login para acessar a área da administração</h3>
                </div>

                <form className="login__form classic__input-table" onSubmit={props.submitFuncion}>
                    <label htmlFor="email">
                        <FaEnvelope />
                        <input type="email" name="email" placeholder="E-mail" onChange={ e => props.setEmail(e.target.value)}/>
                    </label>

                    <label htmlFor="password">
                        <FaLock />
                        <input type="password" placeholder="Senha" onChange={ e => props.setSenha(e.target.value)}/>
                    </label>

                    <button type="submit">
                        Entrar
                    </button>
                </form>
            </div>

            <style>{`
                .main__container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .main__container .content {
                    display: flex;
                    padding: 2em;
                    align-items: center;
                    justify-content: center;
                }

                .main__container .information {
                    margin-right: 3em;
                }


                .main__container .information h1 {
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    margin-bottom: 2em;
                }

                .main__container .information h1 span {
                    text-transform: uppercase;
                    font-size: .4em;
                    font-weight: bold;
                    align-self: flex-end;
                    position: relative;
                    top: -6px;
                    left: -90px;
                    letter-spacing: 2px;

                    color: rgba(255, 255, 255, .5);
                }

                .main__container .information h3 {
                    font-size: 2em;
                    font-weight: 500;
                    max-width: 11em;
                    line-height: 50px;
                }

                .main__container .information img {
                    width: 80px;
                    height: 80px;
                    border-radius: 100px;
                    margin-right: .5em;
                }

                .main__container .login__form {
                    display: flex;
                    flex-direction: column;
                    align-self: center;
                    background: rgba(255, 255, 255, .1);
                    padding: 3em;
                    border-radius: 5px;
                    box-shadow: 0px 0px 20px 0px rgb(0, 0, 0, 0.15);
                }

                .main__container .login__form button {
                    padding: .8em 0;
                    background: #4caf50;
                    color: white;
                    outline: none;
                    border: transparent;
                    border-radius: 5px;
                    font-size: 1.2em;
                    font-weight: 600;
                    margin-top: 20px;
                    cursor: pointer;
                }

                .main__container .login__form button:hover {
                    background: #52bd56;
                }
            `}</style>
        </div>
    )
}