import React, { useState } from 'react'
import '../styles/AuthButton.css'
import Login from './Login'
import Register from './Register'

export default function AuthButton({ text }) {
    const [isVisible, setIsVisible] = useState(false)
    const [login, setLogin] = useState(true)

    const changeValueVisible = () => {
        setIsVisible(prevIsVisible => !prevIsVisible)
    }

    const changeAuthOption = () =>{
        setLogin(prevLogin => !prevLogin)
    }

    return (
        <div id="auth-button">
            <button className={isVisible ? 'active-button' : ''} onClick={changeValueVisible}>
                {text}
            </button>
            <div className={`box ${isVisible ? 'show' : ''}`}>
                <div className='auth-option'>
                    <div onClick={changeAuthOption} className={`option ${login ? 'active' : ''}`}>
                        Sign in
                    </div>
                    <div onClick={changeAuthOption} className={`option ${login ? '' : 'active'}`}>
                        Sign up
                    </div>
                </div>
                {login ? 
                    (<Login/>) :
                    (<Register/>)
                }
            </div>
        </div>
    )
}
