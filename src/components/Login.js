// import { ipcRenderer } from 'electron';
import React, { useState } from 'react';
// import { ipcRenderer } from 'electron';
// electron.ipcMain.on('test-event', () => console.log('lol'));
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  // ipcRenderer.on('test-event', this.handler);

  async function handleClick() {
    let test = await electron.authApi.sendCredentials({username: username, password: password, kind: 'login'});
    let count = await electron.authApi.getCount(username);
    console.log('test', test)
    if(test === 'login-successful') {
      // Saves the username to session storage
      window.sessionStorage.setItem("username", username)
      window.sessionStorage.setItem("count", count)
      navigate('/templatelanding');
    }
    else if(test === 'wrong-username'){
      console.log('WRONG USERNAME')
    }
    else if(test === 'wrong-password'){
      console.log('WRONG PASSWORD')
    }
  }

  return (
    <div class="outer-box">

      <div className = 'title'><h1 id = "title">PepperMint</h1></div>
      
      <div className="centered-box">
        <div>
          <label>
            Username
            <input type='text' value={username} onChange={(keystroke) => setUsername(keystroke.target.value)}/>
          </label>
        </div>

        <div>
          <label>
            Password 
            <input type='password' value = {password} onChange={(keystroke) => setPassword(keystroke.target.value)}/>
          </label>
        </div>

        <div>
          <button onClick={handleClick}> Submit </button>
        </div>
      </div>
      

    </div>
  )
}

export default Login;