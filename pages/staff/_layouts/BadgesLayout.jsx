import { useState, useEffect } from 'react';
import BadgesComponent from '../../../components/BadgesComponent';
import api from '../../../services/api';

export default function BadgesLayout(){
    const [badgesPage, setBadgesPage] = useState(1);
    const [badgesList, setBadgesList] = useState([]);

    useEffect(() => {
        const enterPass = localStorage.getItem('enterpass');

        api.get('/badges?page='+badgesPage, {
            headers: {
                'x-access-token': enterPass
            }
        }).then(response => {
            setBadgesList(response.data);
        })
    }, []);

    return (
        <div className="badges__list">
            <ul>
                {
                    badgesList.length > 0 ? badgesList.map(badge => (
                        <BadgesComponent
                            key={badge.order}
                            order={badge.order}
                            username={badge.username}
                            image={badge.image}
                            pid={badge.pid}
                        />
                    )) : (
                        <>
                            <li className="badges__load"></li>
                            <li className="badges__load"></li>
                            <li className="badges__load"></li>
                            <li className="badges__load"></li>
                            <li className="badges__load"></li>
                        </>
                    )
                }
            </ul>
            <style>{`
                .badges__list ul {
                    display: flex;
                    flex-direction: column;

                    list-style: none;
                }

                .badges__list ul .badges__load {
                    width: 100%;
    
                    display: flex;
                    align-items: center;
                    justify-content: start;

                    background: rgba(255, 255, 255, .05);
                    border-radius: 10px;

                    height: 128px;
                    margin-bottom: 20px;

                    opacity: .5;
                    animation: opacityLoad 1s infinite ease-in-out;
                }

                @keyframes opacityLoad {
                    0% {
                        opacity: .5;
                    }

                    50% {
                        opacity: 1;
                    }

                    100% {
                        opacity: .5;
                    }
                }
            `}</style>
        </div>
    )
}