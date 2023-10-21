import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const handle = (e) => {
    navigate("/createtemplate")
  }

  return (
    <div className="outer-box">
      <div className="inner-box">
        <div className='title'><h1 id="title">PepperMint</h1></div>
        //choose file functionality goes here, please reference create template page.
        <button onClick={handle}> Enter the App</button>
      </div>
    </div>
  )
}

export default Login;