import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateTemplate = () => {



    return (
        <>

            <h1>Create Template</h1>
            <div>
            <Link to="/templatehome"><button>Save Your Template!</button></Link>
            </div>
        </>
        
        
    )
}

export default CreateTemplate;