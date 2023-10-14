import React from 'react';
import { Route, HashRouter, Routes } from 'react-router-dom';
import Login from './Login';
import Footer from './SharedLayout/Footer';
import Navbar from './SharedLayout/Navbar';
import Signup from './Signup';
import TemplateLanding from './TemplateLanding'
import TemplateHome from './TemplateHome'
import CreateTemplate from './CreateTemplate'



const App = () => {
    return (
        <>
        <HashRouter>
            <Navbar/>
            <Routes>
                    <Route path = "/" element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='/templatelanding' element={<TemplateLanding />} />
                    <Route path='/templatehome' element={<TemplateHome />} />
                    <Route path='/createtemplate' element={<CreateTemplate />} />
            </Routes>
            <Footer/>
        </HashRouter>
        </>
    )
};

export default App;