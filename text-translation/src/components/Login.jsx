import React, { useState } from 'react';
import '../styles/Login.css';
import login from '../authLogin'
import BlueButton from './BlueButton';

export default function Login({setIsVisible, setToken}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ username: false, password: false });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    
    let newError = { username: username === '', password: password === '' };
    setError(newError);

    if (!newError.username && !newError.password) {
      const error = await login(username, password)
      if(error.success){
        setIsVisible(false)
        setToken(localStorage.getItem('access_token')
      )
      }
      else{
        setLoginError(error.message)
      }
    }
    setLoading(false)
  };

  return (
    <div id="login">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className={error.username ? 'error' : ''}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className={error.password ? 'error' : ''}
        />
        {loginError && <div className="error-message">{loginError}</div>}

        <BlueButton loading={loading} text={'Submit'}/>
      </form>
    </div>
  );
}
