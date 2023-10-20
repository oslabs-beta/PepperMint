import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TemplateLanding = () => {

    async function increment(){
        const user = window.sessionStorage.getItem("username");
        const count = await electron.authApi.increment(user);
        window.sessionStorage.setItem("count", count);
        console.log(window.sessionStorage.getItem("count", count))
    }

    return (
        <>

            <h1>{window.sessionStorage.getItem("username")}</h1>
            <div className = "space"></div>
            <div>
            <Link to="/createtemplate"><button>Create A New Template!</button></Link>
            </div>
            <div>
            <Link to="/templatehome"><button>Template X</button></Link>
            </div>
            <div>
            <Link to="/templatehome"><button>Template Y</button></Link>
            </div>
            <div>
                <button onClick={increment}>Increment Count</button>
            </div>
           <h1>{window.sessionStorage.getItem("count")}</h1>
        </>
        
        
    )
}

export default TemplateLanding;