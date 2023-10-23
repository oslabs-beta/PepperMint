import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const handle = (event) => {
    event.preventDefault();
    let compFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(compFile);
    let fileCode = "";
    // reader.onload fires when a file is read successfully
    reader.onload = function (event) {
        // event.target.result holds the file code
        event.preventDefault();
        fileCode = event.target.result;
        // Saves the fileCode to session storage to use later
        window.sessionStorage.setItem('fileCode', fileCode);
        navigate("/createtemplate")
    };
  }


  return (
    <div className="outer-box">
      <div className="inner-box">
        <div className='title'><h1 id="title">PepperMint</h1></div>
        //choose file functionality goes here, please reference create template page.
        <input type="file" id="file-input" onChange={handle}/>
        {/*The 'for' or 'htmlFor' attribute links this label to something with 'id="file-input"'*/}
        <label id="file-input-label" htmlFor="file-input">Select a Component</label>
      </div>
    </div>
  )
}

export default Login;