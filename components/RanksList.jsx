import { FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function List({ position, name, value, link, type, data_id }) {
    return (
        <div className="ranks__row">
            <span className="row__position">{position}</span>
            <p className="row__name">{name}</p>
            <div className="to__right">
                <span className="row__display">{type}:</span>
                <span className="row__value">{value}</span>
                <Link href={link+'[id]'} as={`${link}${data_id}`}>
                    <a><FaExternalLinkAlt/></a>
                </Link>
            </div>
            <style jsx>{`
                .ranks__row {
                    display: flex;
                    align-items: center;
                    width: 50rem;
                    height: 4rem;
                    margin-bottom: 10px;
                    background: rgba(0, 0, 0, 0.2);
                    padding: 0 15px;
                    border-radius: 6px;
                }

                .row__position {
                    font-size: 2em;
                    font-weight: bold;
                    color: rgba(255, 255, 255, .3);
                    margin-right: 15px;
                }

                .row__name {
                    font-size: 1.4em;
                    width: 100%;
                }

                .to__right {
                    display: flex;
                    align-items: center;
                }

                .to__right a {
                    color: rgba(255, 255, 255, .3);
                    font-size: 1.5em;
                    border-left: solid 1px rgba(255, 255, 255, .3);
                    padding-left: 15px;
                    transition: all .3s ease;
                }

                .to__right a:hover {
                    color: white;
                }

                .row__display {
                    font-size: 14px;
                    color: rgba(255, 255, 255, .5);
                    margin-right: 5px;
                }

                .row__value {
                    font-size: 1.8em;
                    font-weight: bold;
                    margin-right: 15px;
                }
            `}</style>
        </div>
    )
}