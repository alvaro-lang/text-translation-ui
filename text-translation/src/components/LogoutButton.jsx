import React from 'react'
import '../styles/LogoutButton.css'
export default function LogoutButton({text, setToken}) {

  function handleRemove(){
    localStorage.removeItem('access_token')
    setToken('')
  }

  return (
    <div id="logout-button" onClick={handleRemove}>
        <button>
            {text}
        </button>
    </div>
  )
}
