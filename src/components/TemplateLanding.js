import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TemplateLanding = () => {



    return (
        <>

            <h1>Welcome to PepperMint, *Enter Username here*</h1>
            <div>
            <Link to="/templatehome"><button>Template Home Page</button></Link>
            </div>

            <div>
            <Link to="/createtemplate"><button>Create A New Template!</button></Link>
            </div>
        </>
        
        
    )
}

export default TemplateLanding;