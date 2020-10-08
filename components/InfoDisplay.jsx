import { FaLongArrowAltRight } from "react-icons/fa";

export default function InfoDisplay (props){
    return (
        <div className="info-container">
            <p><FaLongArrowAltRight size={25}/> {props.text}</p>

            <style>{`
                .info-container {
                    max-width: 480px;
                    display: flex;
                    align-items: center;
                    margin: 2em 0 4em;
                }

                .info-container p {
                    color: white;
                    font-weight: 600;
                    font-size: 1.4em;

                    display: flex;
                    align-items: center;
                }

                .info-container p svg {
                    color: #F44336;
                    margin-right: 10px;
                }

            `}</style>
        </div>
    )
}