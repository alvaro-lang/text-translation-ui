import React, { useState } from 'react'
import '../styles/Login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Username:", username)
    console.log("Password:", password)
  }

  return (
    <div id="login">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="username" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
