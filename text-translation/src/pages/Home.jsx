import { useEffect, useState } from "react"
import axios from "axios"
import "../styles/Home.css"
import BlueSelect from "../components/BlueSelect"
import BlueButton from "../components/BlueButton"
import VoiceRecognitionButton from "../components/VoiceRecognitionButton"
import TranslationHistory from "../components/TranslationHistory"
import API_URL from "../config";

export default function Home({token}) {
  const [languages, setLanguages] = useState([])
  const [translationData, setTranslationData] = useState({
    source_text: "",
    language: "",
    style: "",
  })
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [loading, setLoading] = useState(false);
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=languages")
      .then((response) => {
        const allLanguages = new Set()
        response.data.forEach((obj) => {
          Object.values(obj.languages).forEach((language) => {
            allLanguages.add(language)
          })
        })
        setLanguages(Array.from(allLanguages).sort())
      })
  }, [])
  
  useEffect(() => {
    setTranslationData((prevState) => ({
      ...prevState,
      source_text: sourceText,
    }));
  }, [sourceText])

  const onChangeText = (event) => {
    const newText = event.target.value;
    setTranslationData((prevState) => ({
      ...prevState,
      source_text: newText,
    }));
    setSourceText(newText);
  }

  const onChangeLanguage = (event) => {
    setTranslationData((prevState) => ({
      ...prevState,
      language: event.target.value,
    }))
  }

  const onChangeStyle = (event) => {
    setTranslationData((prevState) => ({
      ...prevState,
      style: event.target.value,
    }))
  }

  const translateText = (event) => {
    event.preventDefault()
    setSubmited(true)

    if(!translationData.source_text || !translationData.language || !translationData.style){
      return
    }
    
    setLoading(true)

    const config = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      }
    }
    axios
      .post(`${API_URL}/api/translation/translate`, translationData, config)
      .then((response) => {
        setTranslatedText(response.data.text_translated)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() =>{
        setLoading(false)
        setSubmited(false)
      })
  }

  return (
    <div id="home">
      <form onSubmit={translateText}>
        <div className="blue-selects">
          <BlueSelect defaultOption={'Select style'} arrayOptions={['Formally', 'Informally']} submited={submited} translationDataAtribute={translationData.style} onChangeFunction={onChangeStyle} />
          <BlueSelect defaultOption={'Select language'} arrayOptions={languages} submited={submited} translationDataAtribute={translationData.language} onChangeFunction={onChangeLanguage} />
        </div>
        <div className="container-translations">
          <div className="container-textarea-button textarea-width">
            <textarea
              value={sourceText}
              className={submited && !translationData.source_text ? 'blinking' : ""}
              onChange={onChangeText}
              type="text"
              placeholder="Type a text to translate"
            />
            <div className="voice-recognition-translate-button">
              <VoiceRecognitionButton setSourceText={setSourceText}/>
              <BlueButton loading={loading} text='Translate'/>
            </div>
          </div>
          <div className="textarea-width">
            <textarea
              value={translatedText}
              readOnly
              className="text-translated-textarea"
              type="text"
            />
          </div>
        </div>
      </form>
      {token ? <TranslationHistory token={token} /> : <></>}
    </div>
  )
}
