import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TemplateHome = () => {



    return (
        //reference setCurrentTemplate state, and render 
        <>
        <h1>Template Home</h1>
        <div>
        <Link to="/createtemplate"><button>Edit Template</button></Link>
        </div>

        <div>
            <button> Deploy Template</button>
        </div>
        </>
        
    )

}


export default TemplateHome;
