import React, { useState } from 'react'
import '../styles/AuthButton.css'
import Login from './Login'
import Register from './Register'

export default function AuthButton({text, setToken}) {
    const [isVisible, setIsVisible] = useState(false)
    const [login, setLogin] = useState(true)

    const changeValueVisible = () => {
        setIsVisible(prevIsVisible => !prevIsVisible)
    }

    return (
        <div id="auth-button">
            <button className={isVisible ? 'active-button' : ''} onClick={changeValueVisible}>
                {text}
            </button>
            <div className={`box ${isVisible ? 'show' : ''}`}>
                <div className='auth-option'>
                    <div onClick={() => setLogin(true)} className={`option ${login ? 'active' : ''}`}>
                        Sign in
                    </div>
                    <div onClick={() => setLogin(false)} className={`option ${login ? '' : 'active'}`}>
                        Sign up
                    </div>
                </div>
                {login ? 
                    (<Login setIsVisible={setIsVisible} setToken={setToken}/>) :
                    (<Register setIsVisible={setIsVisible} setToken={setToken}/>)
                }
            </div>
        </div>
    )
}
