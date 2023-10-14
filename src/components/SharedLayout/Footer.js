import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if you're using React Router for these links

function Footer() {
    return (
        <footer>
            <div>
                &copy; {new Date().getFullYear()} Your App Name
            </div>
            <nav>
                <ul>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/terms">Terms & Conditions</Link></li> 
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;
