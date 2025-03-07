import React from 'react'
import '../styles/Home.css'

export default function Home() {
  return (
    <div id='home'>
        <form className='translation-form'>
            <div className='container-textarea-button width-row'>
              <textarea className='source-text-textarea' type="text" placeholder='Type a text to translate'/>
              <div className='translate-button'>
                <button type='submit'>Translate</button>
              </div>
            </div>

            <div className='width-row'>
              <textarea readOnly className='text-translated-textarea' type="text"/>
            </div>
            
        </form> 
    </div>
  )
}
