import React, { useState } from 'react';
import '../styles/Register.css';
import axios from 'axios'
import login from '../authLogin'

export default function Register({setIsVisible, setToken}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    setUsernameError('');
    setPasswordError('')
  
    if (!username) errors.username = 'This field is required';
    if (!password) errors.password = 'This field is required';
    if (!confirmPassword) errors.confirmPassword = 'This field is required';
    if (password && confirmPassword && password !== confirmPassword) {
      errors.passwordMatch = 'Passwords do not match';
    }
  
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
  
    setFieldErrors({});
  
    await axios.post('http://localhost:8000/api/auth/register', { username, password }).catch((error) =>{
      if(error.response.data.password[0]){
        setPasswordError('Ensure password has at least 6 characters.')
      }
    })

    const error = await login(username, password);
    if (error.success) {
      setIsVisible(false);
      setToken(localStorage.getItem('access_token'))
    }
  }
  

  return (
    <div id="register">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          className={fieldErrors.username ? 'error' : ''} 
        />
        {fieldErrors.username && <div className="error-message">{fieldErrors.username}</div>}
        {usernameError && <div className="error-message">{usernameError}</div>}

        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className={fieldErrors.password || fieldErrors.passwordMatch ? 'error' : ''}
        />
        {fieldErrors.password && <div className="error-message">{fieldErrors.password}</div>}
        
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={fieldErrors.confirmPassword || fieldErrors.passwordMatch ? 'error' : ''}
        />
        {fieldErrors.confirmPassword && <div className="error-message">{fieldErrors.confirmPassword}</div>}
        {fieldErrors.passwordMatch && <div className="error-message">{fieldErrors.passwordMatch}</div>}
        {passwordError && <div className="error-message">{passwordError}</div>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
