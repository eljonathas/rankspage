import { useState, useEffect, useRef } from 'react';
import api from '../services/api';

export default function SongRedirect({media_id, source}){
    const [songData, setSongData] = useState([]);
    const [timing, setTiming] = useState(12);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get(`/song/${media_id}`).then(response => {
            if(!response.data.error){
                setSongData(response.data[0]); 
                setIsLoading(false);
            }
        });
    }, []);

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

    useInterval(() => {
        if(!isLoading){
            if(timing === 0){
                window.location.replace(`${source}${media_id}`);
            }else{
                setTiming(timing-1);
            }
        }
    }, 1000);

    return (
        <div className="render__info">
            {(() => {
                if(isLoading){
                    return (
                        <>
                            <div className="render__loader display"></div>
                            <div className="render__loader photo"></div>
                            <div className="render__loader display"></div>
                        </>
                    )
                } else {
                    return (
                        <>
                            <h3 className="__display">REDIRECIONANDO VOCÊ PARA:</h3>
                            <div className="__info" style={{backgroundImage:`url(https://img.youtube.com/vi/${songData.mid}/0.jpg)`}}>
                                <div className="__dark"></div>
                                <p>{songData.author} - {songData.name}</p>
                            </div>
                            <h3 className="__display">EM {timing} SEGUNDOS...</h3>
                        </>
                    )
                }
            })()}
            <style jsx>{`
                .render__info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .render__info .__info {
                    background-repeat: no-repeat;
                    background-position: center;
                    height: 22em;
                    width: 30em;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    border-radius: 6px;
                    margin: 18px 0;
                }

                .render__info .__info .__dark {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: rgba(0, 0, 0, .9);
                    z-index: 1;
                    border-radius: 6px;
                }

                .render__info .__info p {
                    z-index: 2;
                    text-align: center;
                    padding: 0 30px;
                    font-size: 1.5em;
                    font-weight: 600;
                }

                .render__loader {
                    border-radius: 4px;
                    background: rgba(255, 255, 255, .1);
                }

                .render__loader.display {
                    width: 20em;
                    height: 2em;
                }

                .render__loader.photo {
                    height: 22em;
                    width: 30em;
                    margin: 18px 0;
                }
            `}</style>
        </div>
    )
}