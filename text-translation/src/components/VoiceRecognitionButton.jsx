import React, { useState, useEffect } from 'react'
import '../styles/VoiceRecognitionButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'

export default function VoiceRecognitionButton({setSourceText}){
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert('This web browser does not support voice recognition.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognitionInstance = new SpeechRecognition()
    recognitionInstance.continuous = true
    recognitionInstance.interimResults = true

    recognitionInstance.onresult = (event) => {
      let currentTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript
      }
      setSourceText(currentTranscript)
    }

    recognitionInstance.onerror = (event) => {
      console.error('Error: ', event.error)
    }

    recognitionInstance.onend = () => {
      setIsListening(false)
    }

    setRecognition(recognitionInstance)
  }, [setSourceText])

  const toggleListening = () => {
    if (isListening) {
      recognition.stop()
    } else {
      recognition.start()
    }
    setIsListening(!isListening)
  }

  return (
    <div id='voice-recognition'>
      <div className='mic-circle' onClick={toggleListening}>
        {isListening ? 
          (<FontAwesomeIcon className='mic-icon active' icon={faMicrophone} />) : 
          (<FontAwesomeIcon className='mic-icon inactive' icon={faMicrophoneSlash} />)
        }
      </div>
    </div>
  )
}