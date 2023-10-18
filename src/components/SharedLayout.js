import React from 'react';
import Navbar from './SharedLayout/Navbar';
import Footer from './SharedLayout/Footer';
import { Outlet } from 'react-router-dom';

function SharedLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default SharedLayout;
