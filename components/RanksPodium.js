import Link from 'next/link';

export default function Podium({ first, first_id, first_value, second, second_id, second_value, third, third_id, third_value, link, format = '' }){
    return (
        <div className="ranks__podium">
            <div className="podium__box second">
                <Link href={`${link}${format}[id]`} as={`${link}${second_id}`}>
                    <h1 className="podium__name">{second} <i className="rks__icon rks-second"></i></h1>
                </Link>
                <p className="podium__value">({second_value})</p>
                <div className="podium__step"><p>2</p></div>
            </div>
            <div className="podium__box first">
                <Link href={`${link}${format}[id]`} as={`${link}${first_id}`}>
                    <h1 className="podium__name">{first} <i className="rks__icon rks-first"></i></h1>
                </Link>
                <p className="podium__value">({first_value})</p>
                <div className="podium__step"><p>1</p></div>
            </div>
            <div className="podium__box third">
                <Link href={`${link}${format}[id]`} as={`${link}${third_id}`}>
                    <h1 className="podium__name">{third} <i className="rks__icon rks-third"></i></h1>
                </Link>
                <p className="podium__value">({third_value})</p>
                <div className="podium__step"><p>3</p></div>
            </div>
            <style jsx>{`
                .ranks__podium {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-top: 40px;
                }

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

                .podium__box.second .podium__step {
                    height: 6em;
                }

                .podium__box.first .podium__step {
                    height: 8em;
                }

                .podium__box.third .podium__step {
                    height: 4em;
                }
            `}</style>
        </div>
    )
}