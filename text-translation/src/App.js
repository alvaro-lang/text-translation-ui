import './App.css';
import React, { useState } from 'react'
import AuthButton from './components/AuthButton';
import LogoutButton from './components/LogoutButton';
import Home from './pages/Home';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token') || '');
  
  return (
    <div id="App">
      <header className='header'>
        <img className='page-logo' src='page_logo.png' alt='Page logo'></img>
        {token ? (<LogoutButton text='Log Out' setToken={setToken}/>) : (<AuthButton text='Authentication' setToken={setToken}/>)}
      </header>
      <Home token={token}/>
      
    </div>
  );
}

export default App;
