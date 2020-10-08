export default function StaffMainNavbar(props){
    return (
        <nav className="main-navbar">
            { props.children }

            <style>{`
                .main-navbar {
                    width: 100%;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    background: rgba(255, 255, 255, .05);

                    padding: .6em 3em;
                }
            `}</style>
        </nav>
    )
}