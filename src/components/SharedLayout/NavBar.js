import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const handle = (e) => {

        e.preventDefault();
        navigate("/")
    }

    return (
        <header>
            <nav>
                <ul className="horizontal-links">
                    <li><button onClick={handle}>Peppermint</button></li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
