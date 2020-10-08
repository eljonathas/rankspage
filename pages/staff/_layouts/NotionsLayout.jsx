import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import InPageComponent from "../../../components/InPageComponent";
import NotionsComponent from "../../../components/NotionsComponent";
import api from "../../../services/api";

export default function NotionsLayout({ updateNote, setUpdateNote, updatePageNote, setUpdatePageNote }){
    const [allNotions, setAllNotions] = useState([]);

    const [notionsSize, setNotionsSize] = useState(0);

    const [showTextArea, setShowTextArea] = useState(false);
    const [textAreaSize, setTextAreaSize] = useState(0);
    const [noteContent, setNoteContent] = useState('');
    const [fixedChecked, setFixedChecked] = useState(false);

    const [onSaveNote, setOnSaveNote] = useState('disabled');

    useEffect(() => {
        api.get('/staff/notes?fixed_notes=0', {
            headers: {
                "x-access-token": localStorage.getItem('enterpass')
            }
        }).then(response => {
            const { error } = response.data;

            if(!error){
                setAllNotions(response.data);
                setNotionsSize(response.data.length);
            }
        })
    }, [updatePageNote]);


    function handleUpdateFixed(e){
        const noteId = e.currentTarget.parentElement.parentElement.getAttribute('note_id');

        let nextValue = false;

        if(!e.currentTarget.classList.contains('checked')){
            nextValue = true;
            e.currentTarget.classList.add('checked');
        }else{
            e.currentTarget.classList.remove('checked');
        }

        api.put('/staff/notes', {
            note_id: noteId,
            target: 'fixed',
            value: nextValue
        }, {
            headers: {
                "x-access-token": localStorage.getItem('enterpass')
            }
        }).then(response => {
            setUpdateNote(!updateNote);
        })
    }

    function handleAddNote(){
        if(noteContent.length <= 4) return;

        setOnSaveNote('loading');

        api.post('/staff/notes', {
            content: noteContent,
            fixed: fixedChecked
        }, {
            headers: {
                "x-access-token": localStorage.getItem('enterpass')
            }
        }).then(() => {
            setOnSaveNote('disabled');
            setNoteContent('');
            setFixedChecked(false);
            setShowTextArea(false);
            setUpdateNote(!updateNote);
            setUpdatePageNote(!updatePageNote)
        })
    }

    function handleRemoveNote(e){
        const noteNumber = e.currentTarget.parentElement.parentElement.getAttribute('note_id');

        api.delete('/staff/notes/'+noteNumber, {
            headers: {
                "x-access-token": localStorage.getItem('enterpass')
            }
        }
        ).then(response => {
            setUpdateNote(!updateNote);
            setUpdatePageNote(!updatePageNote)
        });
    }

    return (
        <div className="notions__container">
            <header className="centered__between classic__header">
                <h1>TODAS AS NOTAS ({ notionsSize })</h1>
                <button className="default__button" onClick={() => setShowTextArea(true)}><FaPlus /> CRIAR NOTA</button>
            </header>

            <CSSTransition 
                in={showTextArea}
                classNames="note__textarea" 
                unmountOnExit 
                timeout={0}
            >
                <InPageComponent>
                    <div className="__header centered__between">
                        <p>CARACTERES {textAreaSize}/250</p>
                        <FaTimes onClick={() => setShowTextArea(false)} size={20} />
                    </div>

                    <textarea 
                        name="notion_create"
                        onChange={e => {
                            setNoteContent(e.target.value);
                            setTextAreaSize(e.target.value.length);

                            e.target.value.length <= 4 ? setOnSaveNote('disabled') : setOnSaveNote('');
                        }}
                        maxLength={250}
                    ></textarea>

                    <div className="__controls">
                        <div onClick={() => setFixedChecked(!fixedChecked)} className={`check__box ${fixedChecked ? 'checked' : ''}`}>
                            <input type="checkbox" name="set__fixed"/>
                            <p>FIXAR NOTA</p>
                        </div>

                        <button onClick={handleAddNote} className={`default__button __save ${onSaveNote}`}>
                            <div className="save__loader"></div>
                            <p>ENVIAR</p>
                        </button>
                    </div>
                </InPageComponent>
            </CSSTransition>

            <main className="notions__grid">
                {
                    allNotions.length ? allNotions.map(notion => 
                        <NotionsComponent 
                            key={notion._id}
                            note_id={notion._id}
                            author={notion.author.name}
                            timestamp={notion.createdAt}
                            content={notion.content}
                            fixed={notion.fixed}
                            updateFunction={handleUpdateFixed}
                            removeFunction={handleRemoveNote}
                        />
                    ) : (
                        <p>Não há notas</p>
                    )
                }

                <style>{`
                    .notions__container header button svg {
                        margin-right: 8px;
                    }

                    .notions__grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-gap: 15px;
                    }

                    .inpage__component .__content textarea {
                        background: rgba(0, 0, 0, .2);
                        border-radius: 5px;
                        border: transparent;
                        resize: none;
                        width: 50vw;
                        height: 20vh;
                        padding: 1em;

                        font-size: 1.2em;
                        color: white;

                        margin: 0 0 1.5em;
                    }

                    .inpage__component .__content .__controls {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;                        
                    }

                    .inpage__component .__content .__controls div {    
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                    }

                    .inpage__component .__content .__controls div p {
                        font-weight: 600;
                    }

                    .inpage__component .__content button.disabled {
                        background: rgba(255, 255, 255, .2);
                        opacity: .5;
                        cursor: not-allowed;
                    }

                    .inpage__component .__content button .save__loader {
                        width: 2em;
                        height: 21px;
                        background-size: cover;
                        margin: auto;
                        display: none;
                    }

                    .inpage__component .__content button p {
                        font-weight: 600;
                    }
    
                    .inpage__component .__content button.loading .save__loader {
                        display: block;
                    }
    
                    .inpage__component .__content button.loading p {
                        display: none;
                    }
                `}</style>
            </main>
        </div>
    )
}