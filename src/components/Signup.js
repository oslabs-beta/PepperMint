import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const navigate = useNavigate();

  async function submitButton() {
    if(password === verifyPassword){
      let test = await electron.authApi.submitCredentials({username: username, password: password, kind: 'signup'});
      console.log('test', test)
      if(test === 'signup-successful') {
        navigate('templatelanding');
      }
    }
    else{
      console.log('Password must match verify password')
    }
  }

  return (
    <>

      <div>
        <label>
          Username:
          <input type='text' value={username} onChange={(keystroke) => setUsername(keystroke.target.value)}/>
        </label>
      </div>

      <div>
        <label>
          Password:
          <input type='password' value = {password} onChange={(keystroke) => setPassword(keystroke.target.value)}/>
        </label>
        <br></br>
        <label>
          Verify Password:
          <input type='password' value = {verifyPassword} onChange={(keystroke) => setVerifyPassword(keystroke.target.value)}/>
        </label>
      </div>

      <div>
        <button onClick={submitButton}> Create Account! </button>
      </div>

    </>
  )
}

export default Signup;