import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TemplateLanding = () => {



    return (
        <>

            <h1>Welcome to PepperMint, *Enter Username here*</h1>
            <div>
            <Link to="/createtemplate"><button>Create A New Template!</button></Link>
            </div>
            <div>
            <Link to="/templatehome"><button>Template X</button></Link>
            </div>
            <div>
            <Link to="/templatehome"><button>Template Y</button></Link>
            </div>

           
        </>
        
        
    )
}

export default TemplateLanding;