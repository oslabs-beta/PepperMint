import React from 'react';
import { Route, HashRouter, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
// import TemplateLanding from './TemplateLanding'
// import TemplateHome from './TemplateHome'
// import CreateTemplate from './CreateTemplate'
// import SharedLayout from './SharedLayout/SharedLayout'



const App = () => {
    return (
        <HashRouter>
            <Routes>
                {/* <Route path='/' element={<SharedLayout />}> */}
                    //shared layout needs to have navbar component, and footer component, with Links within it, as well as Outlet
                    <Route path = "/" element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                    {/* <Route path='templatelanding' element={<TemplateLanding />} />
                        //will render all child components of this page, talk to nassim
                    <Route path='templatehome' element={<TemplateHome />} />
                        //will render all child components of this page, talk to nassim
                    <Route path='createtemplate' element={<CreateTemplate />} />
                        //will render all child components of this page, talk to nassim */}
                {/* </Route> */}
            </Routes>
        </HashRouter>
    )
};

//need to add Links to and from pages, at each component level. 
//We would need to develop each component to have childs obviously, we need to talk about each components structure, see Shared Layout for example
//

// const App = () => {
    
//   return (
//       <>
//       <h1>PepperMint</h1>
//       <Login/>
//       <Signup/>
//       </>
//     );

// }

export default App;