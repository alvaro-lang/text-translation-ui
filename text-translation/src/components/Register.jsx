import React, { useState } from 'react'
import '../styles/Register.css'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Username:", username)
    console.log("Password:", password)
  }

  return (
    <div id="register">
      <h1>Sign up</h1>
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
