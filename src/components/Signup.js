import React, { useState } from 'react';


const Signup = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        <button onClick={ () => { electron.authApi.sendCredentials({username: username, password: password, kind: 'signup'}) } }> Create Account </button>
      </div>

    </>
  )
}

export default Signup;