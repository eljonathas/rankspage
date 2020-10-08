export default function LoadingLayout(props){
    return (
        <>
            <div className="loading-component">
                <img src={props.iconLink} alt="Icon"/>
                <p>{props.displayText}</p>
            </div>

            { props.children }

            <style>{`
                .loading-component {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .loading-component img {
                    margin-right: 10px;
                    width: 50px;
                }

                .loading-component p {
                    font-size: 2em;
                    font-weight: 600;
                }
            `}</style>
        </>
    )
}