import { useEffect, useState } from "react"
import axios from "axios"
import '../styles/Home.css'

export default function Home() {

  const [languages, setLanguages] = useState([])
  const [translationData, setTranslationData] = useState({
    source_text: '',
    language: '',
    style: ''
  })
  const [textTranslated, setTextTranslated] = useState('')

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all?fields=languages")
      .then((response) => {
        const allLanguages = new Set();
        response.data.forEach(obj => {
          Object.values(obj.languages).forEach(language => {
            allLanguages.add(language);
          });
        });
        setLanguages(Array.from(allLanguages).sort());
      })
  }, [])

  const onChangeText = (event) => {
    setTranslationData(prevState => ({
      ...prevState,
      source_text: event.target.value
    })) 
  }
  const onChangeLanguage = (event) => {
    setTranslationData(prevState => ({
      ...prevState,
      language: event.target.value
    }))
  }
  const onChangeStyle = (event) => {
    setTranslationData(prevState => ({
      ...prevState,
      style: event.target.value
    })) 
  }

  const translateText = (event) => {
    event.preventDefault()

    axios.post('http://localhost:8000/api/translation/translate', translationData)
    .then((response) =>{
      setTextTranslated(response.data.text_translated)
    })
    .catch((error) => {
      console.error(error);
    })
  };
  
  return (
    <div id='home'>
        <form className='translation-form' onSubmit={translateText}>
          <div className='container-select-language-style'>
            <select onChange={onChangeLanguage} defaultValue="">
              <option value="" disabled>
                Select language
              </option>
              {
                languages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))
              }
            </select>
            <select onChange={onChangeStyle} defaultValue="">
                <option value="" disabled>
                  Select translate style
                </option>
                <option value="formally">
                  Formally
                </option>
                <option value="informally">
                  Informally
                </option>
            </select>
          </div>
          <div className='container-translations'>
            <div className='container-textarea-button width-row'>
              <textarea onChange={onChangeText} className='source-text-textarea' type="text" placeholder='Type a text to translate'/>
              <div className='translate-button'>
                <button type='submit'>Translate</button>
              </div>
            </div>

            <div className='container-textarea width-row'>
              <textarea value={textTranslated} readOnly className='text-translated-textarea' type="text"/>
            </div>
          </div>
            
            
        </form> 
    </div>
  )
}
