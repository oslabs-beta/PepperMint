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
    console.log('test', test)
    if(test === 'login-successful') {
      navigate('signup');
    }
    else if(test === 'wrong-username'){
      console.log('WRONG USERNAME')
    }
    else if(test === 'wrong-password'){
      console.log('WRONG PASSWORD')
    }
  }

  return (
    <>

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

    </>
  )
}

export default Login;