import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateTemplate = (props) => {

    return (
        <>
            <h1>Create Template</h1>
            <form>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Insert template" />
                <Link to="/templatehome"><button type='submit'>Save Your Template!</button></Link>
            </form>
        </>

    )
}

export default CreateTemplate;