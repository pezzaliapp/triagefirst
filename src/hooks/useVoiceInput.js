import { useState, useRef, useCallback } from 'react'

const LANG_MAP = {
  en: 'en-US', it: 'it-IT', fr: 'fr-FR', de: 'de-DE',
  es: 'es-ES', pt: 'pt-BR', ro: 'ro-RO', bg: 'bg-BG',
  sq: 'sq-AL', ru: 'ru-RU', sv: 'sv-SE', no: 'nb-NO',
  et: 'et-EE', lv: 'lv-LV', lt: 'lt-LT', tr: 'tr-TR',
  ar: 'ar-SA', sw: 'sw-KE', hi: 'hi-IN', bn: 'bn-BD',
  id: 'id-ID', tl: 'fil-PH',
}

export function useVoiceInput(lang, onTranscript) {
  const [isRecording, setIsRecording] = useState(false)
  const [isSupported] = useState(
    () => !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  )
  const recognitionRef = useRef(null)

  const start = useCallback(() => {
    if (!isSupported) return
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SpeechRec()
    rec.lang = LANG_MAP[lang] || 'en-US'
    rec.continuous = false
    rec.interimResults = true

    rec.onresult = (e) => {
      let transcript = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript
      }
      onTranscript(transcript)
    }

    rec.onend = () => setIsRecording(false)
    rec.onerror = () => setIsRecording(false)

    recognitionRef.current = rec
    rec.start()
    setIsRecording(true)
  }, [isSupported, lang, onTranscript])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setIsRecording(false)
  }, [])

  const toggle = useCallback(() => {
    isRecording ? stop() : start()
  }, [isRecording, start, stop])

  return { isRecording, isSupported, toggle }
}
