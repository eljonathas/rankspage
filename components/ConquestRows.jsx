import { useState, useEffect } from 'react'

import Conquests from '../utils/conquests.json';

export default function ({ conquest_id }){
    const [conquest, setConquest] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Conquests.map(item => {
            if(item.id == conquest_id){
                setConquest(item);
                setIsLoading(false);
            }
        });
    }, []);

    return (
        !isLoading && (
            <>
                <div className={`conquest__card ${conquest.setup.bg.length ? 'have__bg' : ''}`} style={{backgroundColor: conquest.setup.bg || ''}}>
                    <div className="conquest__image">
                        <div className="__image" style={{backgroundImage: `url("${conquest.setup.image}")`}}></div>
                    </div>
                    <h1 className="conquest__name">{conquest.setup.title}</h1>
                    <p className="conquest__info">{conquest.setup.info}</p>
                </div>

                <style jsx>{`
                    .conquest__card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-radius: 6px;
                        background: rgba(0, 0, 0, .2);
                        width: 11.87em;
                        height: 12em;
                        max-width: 11.87em;
                        padding: 10px 15px;
                        margin-bottom: 10px;
                        flex-grow: 1;
                        margin-right: 5px;
                        margin-left: 5px;
                    }
    
                    .conquest__image {
                        display: block;
                        width: 5em;
                        height: 5em;
                        margin-bottom: 10px;
                    }

                    .conquest__image .__image {
                        width: inherit;
                        height: inherit;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                    }
    
                    .conquest__name {
                        font-size: 1em;
                        text-align: center;
                    }

                    .conquest__info {
                        text-align: center;
                        font-size: 15px;
                        color: rgba(255, 255, 255, .6);
                    }
                `}</style>
            </>
        )
    )
};