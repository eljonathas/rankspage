import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Link from 'next/link';
import Head from 'next/head';


import { 
    FaUserAlt, 
    FaEnvelope, 
    FaFileUpload, 
    FaIdCard, 
    FaTrash, 
    FaRegCheckCircle, 
    FaInfoCircle,
    FaLongArrowAltLeft,
    FaLongArrowAltRight
} from 'react-icons/fa';

import sendImageToImgur from '../utils/sendToImgur';
import api from '../services/api';

export default function Badge () {
    const [selectedFile, setSelectedFile] = useState({});
    const [selectedFileUrl, setSelectedFileUrl] = useState("");
    const [isAccepted, setIsAccepted] = useState(false);
    const [inLoading, setInLoading] = useState("");

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");

    const [orderValue, setOrderValue] = useState("");

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileURL = URL.createObjectURL(file);

        setSelectedFile(file);
        setSelectedFileUrl(fileURL);
    }, []);

    const { 
        getInputProps, 
        getRootProps, 
        isDragActive 
    } = useDropzone({ onDrop, accept: 'image/*', multiple: false });

    function handleSubmitForm(e){
        e.preventDefault();

        if(selectedFileUrl && name && id && email){
            setInLoading("loading");

            sendImageToImgur(selectedFile).then(image => {
                api.post('/badges', {
                    username: name,
                    email,
                    pid: id,
                    image: image.data.data.link
                }).then(response => {
                    if(response.data.status){
                        setOrderValue(response.data.order);
                        setIsAccepted(true);
                    }
                })
            });
        }
    }

    return (
        <div className="ranks__container">
            <Head>
                <title>Formulário para emblema personalizado - Radio Brasil Ranks</title>
            </Head>
            {
                !isAccepted ? (
                    <>
                        <h1 className="form__title">Formulário para emblema personalizado</h1>
                        <form onSubmit={handleSubmitForm} className="subject__form">
                            <div className="inline__inputs">
                                <label htmlFor="name">
                                    <h1><FaUserAlt style={{marginRight: 5}}/> Nick no Plug</h1>
                                    <input type="text" name="nickname" id="nickname" onChange={e => setName(e.target.value)} />
                                </label>
                                <label htmlFor="id">
                                    <h1><FaIdCard style={{marginRight: 5}}/> ID no Plug</h1>
                                    <input type="text" name="id" id="id" onChange={e => setId(e.target.value)} />
                                </label>
                            </div>
                            <label htmlFor="email">
                                <h1><FaEnvelope style={{marginRight: 5}}/> E-mail</h1>
                                <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
                            </label>
                            <label htmlFor="dropzone">
                                <h1><FaFileUpload style={{marginRight: 5}}/> Envie uma imagem</h1>
                                {
                                    selectedFileUrl ? (
                                        <div className="image__box">
                                            <img src={selectedFileUrl} alt="Badge"/> 
                                            <button onClick={e => setSelectedFileUrl("")}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="dropzone" {...getRootProps()}>
                                            <input {...getInputProps()}/>

                                            {   !isDragActive ? 
                                                <p>Arraste a imagem até aqui ou clique para selecionar</p> :
                                                <p>Solte para começar o envio</p>
                                            } 
                                        </div>
                                    )
                                }
                            </label>
                            <button type="submit" className={inLoading}>
                                <div className="save__loader"></div>
                                <p>Enviar</p>
                            </button>
                        </form>
                    </>
                ) : (
                    <main className="submit__send">
                        <div className="check__submit">
                            <FaRegCheckCircle style={{fontSize: '10em', color: '#4CAF50', marginBottom: 30}}/>
                            <h1>
                                Seus dados foram enviados! 
                                <br/> 
                                A ordem da sua requisição é <span>{orderValue}</span>
                            </h1>
                        </div>
                        <div className="submit__info">
                            <p><FaInfoCircle style={{marginRight: 10, fontSize: 35}} /> Aguarde até que seu pedido seja consultado pela staff ou faça novas solicitações. Entretanto, saiba que, ao enviar novos pedidos, os anteriores serão desconsiderados.</p>
                        </div>
                    </main>
                )
            }

            <footer>
                <div className="footer__buttons">
                    <Link href="/"><a className="to__room back"><FaLongArrowAltLeft/><p>Voltar</p></a></Link>
                    <a href="https://plug.dj/electro-brasil-19" target="_blank" className="to__room"><p>Ir para a sala</p><FaLongArrowAltRight></FaLongArrowAltRight></a>
                </div>
                <p className="creator__credits">Made with <i className="rks__icon rks-love"></i> by <a href="https://github.com/eljonathas" target="_blank">TheMars</a></p>
            </footer>

            <style jsx>{`
                .form__title  {
                    margin: 40px; 0 30px;
                }

                .subject__form {
                    width: 40em;
                }

                .inline__inputs {
                    display: flex;
                    align-items: center;
                }

                .inline__inputs label {
                    width: 50%;
                }

                .inline__inputs label:first-child {
                    margin-right: 10px;
                }

                .subject__form label {
                    display: block;
                    margin-bottom: 20px;
                }

                .subject__form label img {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }

                .subject__form label .image__box {
                    position: relative;
                    max-width: 200px;
                    max-height: 200px;
                }

                .subject__form label .image__box button {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    position: absolute;
                    top: -10px;
                    right: -10px;
                    border: none;
                    border-radius: 50px;
                    padding: 10px;

                    background: #F44336;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                }

                .subject__form label h1 {
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    color: rgba(255, 255, 255, .6)
                }

                .subject__form label input {
                    width: 100%;
                    font-size: 18px;
                    padding: 12px 15px;
                    border: transparent;
                    border-radius: 4px;
                    background: rgba(255, 255, 255, .1);
                    color: white;
                }

                .subject__form label .dropzone {
                    height: 10em;
                    background: rgba(255, 255, 255, .1);
                    border-radius: 4px;
                  
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    outline: 0;
                    cursor: pointer;
                }

                .subject__form label .dropzone p {
                    color: rgba(255, 255, 255, .5);
                }

                .subject__form > button {
                    width: 100%;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    font-size: 18px;
                    border: transparent;
                    margin-top: 30px;

                    background: #4CAF50;
                    color: white;
                    font-weight: 600;

                    cursor: pointer;
                }

                .subject__form > button .save__loader {
                    width: 2em;
                    height: 21px;
                    background-size: cover;
                    margin: auto;
                    display: none;
                }

                .subject__form > button.loading .save__loader {
                    display: block;
                }

                .subject__form > button.loading p {
                    display: none;
                }

                .submit__send {
                    max-width: 40em;
                    text-align: center;
                }

                .check__submit h1 {
                    line-height: 1.5em;
                    font-size: 1.8em;
                    color: rgba(255, 255, 255, .6)
                }

                .check__submit h1 span {
                    background: rgba(255, 255, 255, .1);
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-weight: 600;
                    color: white;
                }

                .submit__info {
                    margin-top: 30px;
                    background: rgba(255, 255, 255, .1);
                    padding: 10px 15px;
                    border-radius: 4px;
                }

                .submit__info p {
                    display: flex; 
                    align-items: center;
                    text-align: justify;
                    color: rgba(255, 255, 255, .8);
                }

                footer {
                    margin-bottom: 40px;
                }
                  
            `}</style>
        </div>
    )
}