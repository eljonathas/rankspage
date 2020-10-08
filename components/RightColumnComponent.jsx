export default function RightColumnComponent({ title, title_icon, children, ...rest }){
    return (
        <div className="column__row" { ...rest }>
            <h1 className="__title">{ title_icon } { title }</h1>

            <div className="__content">
                { children }
            </div>

            <style>{`
            .column__row {
                padding: 1.2em;

                display: flex;
                flex-direction: column;
                align-items: flex-start;


                border-radius: 10px;

                background: rgba(255, 255, 255, .05);
            }

            .column__row .__title {
                font-size: 1em;
                font-weight: 600;

                text-transform: uppercase;

                margin-bottom: 10px;

                color: rgba(255, 255, 255, .5);
                
                display: flex;
                align-items: center;
            }

            .column__row .__title svg {
                margin-right: 5px;
            }

            .column__row .__content {
                width: 100%;
            }
            `}</style>
        </div>
    )
}