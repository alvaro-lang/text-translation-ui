import React, { useState, useEffect } from 'react'
import '../styles/VoiceRecognitionButton.css'

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
        <img
          onClick={toggleListening}
          src={isListening ? 'mic_active.png' : 'mic_inactive.png'} 
          alt="Mic" 
        />
    </div>
  )
}