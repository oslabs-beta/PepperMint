import React from 'react';
import { Route, HashRouter, Routes } from 'react-router-dom';
import Login from './Login';
import Footer from './SharedLayout/Footer';
import NavBar from './SharedLayout/NavBar';
import CodeWindow from './CodeWindow';
import CreateTemplate from './CreateTemplate'
import FinalDraft from './FinalDraft'
import '../styles.css'

const App = () => {

    return (
        <>
            <HashRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path='/createtemplate' element={<CreateTemplate />} />
                    <Route path='/finaldraft' element={<FinalDraft />} />
                </Routes>
                <Footer />
            </HashRouter>
        </>
    )
};


export default App;