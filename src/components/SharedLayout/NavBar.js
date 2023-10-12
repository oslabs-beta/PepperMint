import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <header>
            <nav>
                <ul>
                    <li>Peppermint</li>
                    <li><Link to="/templatelanding">Template Landing</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
