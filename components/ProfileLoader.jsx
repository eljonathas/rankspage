import Head from 'next/head';

export default function ProfileLoader(){
    return (
        <div className="ranks__container user_profile">
            <Head>
                <title>Carregando - Radio Brasil</title>
            </Head>
            <header className="user__header">
                <div className="user__information">
                    <div className="user__photo"></div>
                    <div className="user__info">
                        <div className="loader__bar name"></div>
                        <div className="loader__bar time"></div>
                        <div className="loader__bar love"></div>
                    </div>
                </div>
                <ul className="user__navigator">
                    <div className="load__navigator"></div>
                    <div className="load__navigator"></div>
                    <div className="load__navigator"></div>
                </ul>
            </header>
            <main className="user__list">
                <div className="load__title"></div>
                <div className="__list">
                    <div className="loader__card"></div>
                    <div className="loader__card"></div>
                    <div className="loader__card"></div>
                    <div className="loader__card"></div>
                    <div className="loader__card"></div>
                    <div className="loader__card"></div>
                    <div className="loader__card"></div>
                    <div className="loader__card"></div>
                    <div className="loader__card"></div>
                    <div className="loader__card"></div>
                </div>
            </main>
            <style jsx>{`
                .user__profile {
                    justify-content: normal;
                }

                .user__header {
                    padding: 12px;
                    margin-top: 40px;                    
                    width: 50em;
                    border-radius: 6px;
                    background: rgba(255, 255, 255, .05);
                    position: relative;
                }

                .user__information {
                    padding: 10px 30px 20px;
                    display: flex;
                    align-items: center;
                }

                .user__photo {
                    width: 7em;
                    height: 7em;
                    max-width: 7em;
                    min-width: 7em;
                    max-height: 7em;
                    min-height: 7em;
                    border-radius: 100%;
                    background: rgba(255,255,255,.1);
                    margin-right: 25px;
                    z-index: 5;
                }

                .user__navigator {
                    margin-top: 12px;
                    list-style: none;
                    display: flex;
                    padding: 0 10px 5px;
                }

                .user__navigator .load__navigator {
                    width: 6em;
                    height: 2em;
                    margin-right: 10px;
                    background: rgba(255, 255, 255, .1);
                    border-radius: 4px;
                }

                .user__list {
                    width: 50em;
                    margin-top: 30px;
                    margin-bottom: 30px;
                }

                .user__list .load__title {
                    width: 30em;
                    height: 2em;
                    border-radius: 5px;
                    background: rgba(255,255,255, .1);
                    margin-bottom: 20px;
                    margin-left: 5px;
                }

                .user__list .__list {
                    display: flex;
                    flex-wrap: wrap;
                    max-width: 50em;
                }

                .loader__bar {
                    border-radius: 5px;
                    width: 20em;
                    height: 2em;
                    background: rgba(255, 255, 255, .1);
                }

                .loader__bar.name {
                    width: 25rem;
                    margin-bottom: 15px;
                }

                .loader__bar.time {
                    height: 1.8em;
                    margin-bottom: 20px;
                }

                .loader__bar.love {
                    height: 1.5em;
                    width: 18em;
                }

                .loader__card {
                    display: flex;
                    border-radius: 6px;
                    background: rgba(0, 0, 0, .2);
                    width: 9.37em;
                    height: 10em;
                    max-width: 9.37em;
                    margin-bottom: 10px;
                    margin-left: 5px;
                    margin-right: 5px;
                    flex-grow: 1;
                }
            `}</style>
        </div>
    )
}