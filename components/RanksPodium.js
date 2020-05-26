import Link from 'next/link';

export default function Podium({ name,  value, link, as, height, step }){
    return (
        <>
            <div className="podium__box">
                <Link href={link} as={as}>
                    <h1 className="podium__name">{name} <i className={`rks__icon rks-${step}`}></i></h1>
                </Link>
                <p className="podium__value">({value})</p>
                <div className="podium__step"><p>{step}</p></div>
            </div>
            <style jsx>{`
                .podium__box {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    max-width: 250px;
                }

                .podium__box:last-child {
                    margin-right: 0;
                }

                .podium__box .podium__name {
                    font-size: 1.5em;
                    font-weight: 500;
                    margin-bottom: 3px;
                    cursor: pointer;
                }

                .podium__box .podium__name .rks__icon {
                    width: 22px;
                    height: 22px;
                    margin-left: 2px;
                    display: inline-block;
                    vertical-align: middle;
                }

                .podium__box .podium__value {
                    font-size: 20px;
                    color: rgba(255, 255, 255, .5);
                    font-weight: 600;
                }

                .podium__box .podium__step {
                    margin-top: 10px;
                    width: 16em;
                    background: rgba(255, 255, 255, .1);
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                }

                .podium__box .podium__step p {
                    font-size: 3em;
                    font-weight: bold;
                    margin-bottom: 5px;
                    color: #2c2f33;
                }

                .podium__box .podium__step {
                    height: ${height}em;
                }
            `}</style>
        </>
    )
}