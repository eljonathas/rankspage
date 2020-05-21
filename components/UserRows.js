import Link from 'next/link';

export default function Row({type, user_photo, user_name, user_id}){
    return (
        <Link href={`/user/${user_id}`}>
            <div className="friend__card" data-id={user_id}>
                <div className="friend__photo">
                    <div className="__image" style={{backgroundImage: `url("${user_photo}")`}}></div>
                </div>
                <h1 className="friend__name">{user_name}</h1>
                <style jsx>{`
                    .friend__card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-radius: 6px;
                        background: rgba(0, 0, 0, .2);
                        width: 9.37em;
                        height: 10em;
                        max-width: 9.37em;
                        margin-bottom: 10px;
                        flex-grow: 1;
                        margin-right: 10px;
                        cursor: pointer;
                        transition: all .3s ease;
                    }
                    
                    .friend__card:hover {
                        background: rgba(0, 0, 0, .3);
                    }

                    .friend__photo {
                        display: block;
                        width: 5em;
                        height: 5em;
                        border-radius: 100%;
                        background: rgba(255, 255, 255, .1);
                        margin-bottom: 10px;
                    }

                    .friend__photo .__image {
                        width: inherit;
                        height: inherit;
                        border-radius: 100%;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                    }

                    .friend__name {
                        font-size: 1em;
                        text-align: center;
                    }
                `}</style>
            </div>
        </Link>
    )
}