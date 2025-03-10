import React, { useEffect, useState } from 'react'
import '../styles/TranslationHistory.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import API_URL from "../config";

export default function TranslationHistory({token}) {

    const [texts, setTexts] = useState([])

    const config = {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      }
    
    useEffect(() => {
        axios.get(`${API_URL}/api/translation/history/`, config)
        .then((response) =>{
            setTexts(response.data)
        })
    }, [token, config])

    return (
        <div id="translation-history">
        <h1>Your latest translations</h1>
        {
            texts.map((obj, index) => {
                return (
                    <div key={index} className='container-texts'>
                        <div className='text'>
                                {obj.source_text}
                        </div>
                        <FontAwesomeIcon className='arrow' icon={faArrowRight}/>
                        <div className='text'>
                            {obj.translated_text}
                        </div>
                    </div>
                );
            })
        }        
        </div>
    )
}
