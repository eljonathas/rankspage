import { useEffect, useState } from "react";

import { FaThumbtack, FaUserAlt } from "react-icons/fa";
import RightColumnComponent from "../../../components/RightColumnComponent";
import api from "../../../services/api";

export default function RightColumnLayout({ updateNote }){
    const [fixedNotes, setFixedNotes] = useState([]);

    useEffect(() => {
        api.get('/staff/notes?fixed_notes=1', {
            headers: {
                "x-access-token": localStorage.getItem('enterpass')
            }
        }).then(response => {
            const { error } = response.data;

            if(!error){
                setFixedNotes(response.data);
            }
        })
    }, [updateNote]);

    return (
        <div className="column__content">
            <RightColumnComponent 
                id="fixed__notes" 
                title="Notas fixadas"
                title_icon={<FaThumbtack size={15}/>}
            >
                <ul className="__notes">
                    {
                        fixedNotes.length ? fixedNotes.map(note => (
                            <li key={note._id}>
                                <p>{note.content}</p>
                                <span><FaUserAlt size={15} /> {note.author.name}</span>
                            </li>
                        )) : (
                            <span>Nenhuma nota fixada</span>
                        )
                    }
                </ul>
            </RightColumnComponent>

            <style>{`
                .column__content {
                    width: 28em;
                    max-width: 28em;
                }

                #fixed__notes ul li {
                    margin-bottom: 20px;

                    background: rgba(255, 255, 255, .1);
                    padding: .8em;
                    border-radius: 10px;
                    width: 100%;
                }

                #fixed__notes ul li:last-child {
                    margin-bottom: 0;
                }

                #fixed__notes ul li p {
                    margin-bottom: 12px;
                }

                #fixed__notes ul li span {
                    font-weight: 600;
                    color: rgba(255, 255, 255, .5);

                    display: flex;
                    align-items: center;
                }

                #fixed__notes ul li span svg {
                    margin-right: 5px;
                }
            `}</style>
        </div>
    )
}