export default function InPageComponent({ children }){
    return (
        <section className="inpage__component">
            <div className="__content">
                { children }
            </div>
            <style>{`
                .inpage__component {
                    position: fixed;
                    top: 0;
                    left: 0;
                
                    height: 100%;
                    width: 100%;
                
                    display: flex;
                    align-items: center;
                    justify-content: center;
                
                    background: rgba(0, 0, 0, .6);
                    z-index: 999;
                }
                
                .inpage__component .__content {
                    background: #373a3d;
                    display: flex;
                    flex-direction: column;
                
                    padding: 2em;
                    border-radius: 10px;
                }

                .inpage__component .__content .__header {
                    margin-bottom: 1.5em;
                }

                .inpage__component .__content .__header p {
                    font-weight: 600;
                }

                .inpage__component .__content .__header svg {
                    color: rgba(255, 255, 255, .5);
                    cursor: pointer;
                    margin-left: auto;
                }
            `}</style>
        </section>
    )
}