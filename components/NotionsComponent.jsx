import { FaCalendar, FaTrash, FaUser } from "react-icons/fa";

export default function NotionsComponent({ author, timestamp, fixed, content, updateFunction, removeFunction, ...rest }){
    const createDate = new Date(timestamp);

    return (
        <section className="__notion" {...rest}>
            <header className="centered__between">
                <p className="__date"><FaCalendar />{createDate.getDate()}/{createDate.getMonth()}/{createDate.getFullYear()}</p>
                <p className="__author"><FaUser size={14}/> { author }</p>
            </header>
            <main className="__content">
                { content }
            </main>
            <footer className="__controls">
                <div onClick={updateFunction} className={`check__box ${fixed ? 'checked' : ''}`}>
                    <input type="checkbox" name="set__fixed"/>
                    <p>FIXAR</p>
                </div>

                <p onClick={removeFunction}><FaTrash size={15}/> REMOVER</p>
            </footer>

            <style>{`
                .__notion {
                    display: flex;
                    flex-direction: column;

                    justify-content: center;
                    background: rgba(255, 255, 255, .05);

                    border-radius: 10px;
                    padding: 2em;

                    height: fit-content;
                }

                .__notion header {
                    margin-bottom: 15px;
                }

                .__notion header p {
                    font-weight: 600;
                    color: rgba(255, 255, 255, .5);
                }

                .__notion header .__author,
                .__notion header .__date {
                    display: flex;
                    align-items: center;
                }

                .__notion header .__author svg,
                .__notion header .__date svg {
                    margin-right: 5px;
                }

                .__notion .__content {
                    margin-bottom: 40px;
                    word-break: break-word;
                }

                .__notion footer {
                    display: flex;
                    align-items: center;

                    margin-top: auto;
                }

                .__notion footer .check__box,
                .__notion footer > p {
                    display: flex;
                    align-items: center;

                    cursor: pointer;
                }

                .__notion footer .check__box {
                    margin-right: 30px;
                }

                .__notion footer > p svg {
                    margin-right: 5px;
                }
            `}</style>
        </section>
    )
}