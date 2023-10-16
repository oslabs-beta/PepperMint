import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if you're using React Router for these links

function Footer() {
    return (
        <footer>
            <div>
                <nav class="footer-nav centered">
                    <ul className="horizontal-links">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li> 
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </nav>
                <div className="date centered">
                &copy; {new Date().getFullYear()} PepperMint
                </div>
            </div>
            
        </footer>
    );
}

export default Footer;
