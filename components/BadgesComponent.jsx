import { FaCheckCircle, FaTimesCircle, FaUser } from "react-icons/fa";

export default function BadgesComponent({ username, image, pid, order, ...rest }){
    return (
        <li className="badge__box" {...rest}>
            <img src={image} alt={username}/>

            <div className="__texts">
                <h1>#{ order }</h1>
                <p className="__name"><FaUser size={15}/> { username }</p>
                <p>ID: { pid }</p>
            </div>

            <div className="__buttons">
                <FaCheckCircle className="accept" size={30}/>
                <FaTimesCircle className="delete" size={30}/>
            </div>

            <style>{`
                .badge__box {
                    width: 100%;

                    display: flex;
                    align-items: center;
                    justify-content: start;

                    background: rgba(255, 255, 255, .05);
                    border-radius: 10px;

                    padding: 1em 2em;
                    margin-bottom: 20px;
                }

                .badge__box img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    margin-right: 1em;
                }

                .badge__box .__texts {
                    margin-right: 2em;

                    width: 100%;
                }

                .badge__box .__texts h1 {
                    font-weight: bold;
                    margin-bottom: 10px;

                    text-align: center;

                    background: rgba(255, 255, 255, .1);
                    border-radius: 25px;
                    padding: 4px 10px;

                    width: fit-content;
                }

                .badge__box .__texts p {
                    font-size: 1em;
                    font-weight: 600;
                    color: rgba(255, 255, 255, .5);
                }

                .badge__box .__texts p.__name {
                    margin-bottom: 10px;
                    font-size: 1.2em;
                    font-weight: 500;
                }

                .badge__box .__buttons {
                    display: flex;
                    align-items: center;
                }

                .badge__box .__buttons svg {
                    cursor: pointer;

                    color: rgba(255, 255, 255, .5);

                    transition: all .2s ease;
                }

                .badge__box .__buttons svg:hover {
                    color: white;
                }

                .badge__box .__buttons svg.accept {
                    margin-right: 20px;
                }
            `}</style>
        </li>
    )
}