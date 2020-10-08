export default function StaffInlineMenu({ onDisplay, children }){
    return (
        <nav className="inline__navbar">
            <ul>
                { children }
            </ul>

            <style>{`
                .inline__navbar {
                    width: 100%;
                    margin-bottom: 35px;
                }

                .inline__navbar ul {
                    list-style: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .inline__navbar ul li {
                    border-right: solid 2px rgba(255, 255, 255, .2);
                    font-size: 1em;
                    color: rgba(255, 255, 255, .5);
                    font-weight: 600;
                    text-transform: uppercase;
                    cursor: pointer;
                    padding-right: 15px;
                    margin-right: 15px;
                    transition: all ease .2s;
                }

                .inline__navbar ul li.active,
                .inline__navbar ul li:hover {
                    color: white;
                }

                .inline__navbar ul li:last-child {
                    border-right: none;
                }
            `}</style>
        </nav>
    )
}