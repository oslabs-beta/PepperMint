import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import TemplateLanding from './TemplateLanding'
import TemplateHome from './TemplateHome'
import CreateTemplate from './CreateTemplate'
import SharedLayout from './SharedLayout'

import Navbar from './SharedLayout/Navbar';
import Footer from './SharedLayout/Footer';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SharedLayout />}>
                    //shared layout needs to have navbar component, and footer component, with Links within it, as well as Outlet
                    <Route index element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='templatelanding' element={<TemplateLanding />} />
                        //will render all child components of this page, talk to nassim
                    <Route path='templatehome' element={<TemplateHome />} />
                        //will render all child components of this page, talk to nassim
                    <Route path='createtemplate' element={<CreateTemplate />} />
                        //will render all child components of this page, talk to nassim
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

//need to add Links to and from pages, at each component level. 
//We would need to develop each component to have childs obviously, we need to talk about each components structure, see Shared Layout for example
//



export default App;