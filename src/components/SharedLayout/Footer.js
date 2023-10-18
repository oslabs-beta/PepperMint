import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if you're using React Router for these links

function Footer() {
    return (
        <footer>
                <nav className="footer-nav-centered">
                    <ul className="footer-links">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li> 
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </nav>
                
                <div className="date-right">
                &copy; {new Date().getFullYear()} PepperMint
                </div>
            
        </footer>
    );
}

export default Footer;
