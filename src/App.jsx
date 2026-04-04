import { useState, useCallback, useEffect } from 'react'
import { Header } from './components/Header.jsx'
import { LangBar } from './components/LangBar.jsx'
import { PatientMeta } from './components/PatientMeta.jsx'
import { SymptomInput } from './components/SymptomInput.jsx'
import { ApiKeyInput } from './components/ApiKeyInput.jsx'
import { TriageResult } from './components/TriageResult.jsx'
import { HistoryPanel } from './components/HistoryPanel.jsx'
import { EmergencyFooter } from './components/EmergencyFooter.jsx'
import { callGemma } from './lib/gemmaClient.js'
import { buildPrompt } from './lib/prompts.js'
import { LABELS, TAGLINES } from './lib/labels.js'
import { useTriageHistory } from './hooks/useTriageHistory.js'
import { useLocation } from './hooks/useLocation.js'

const STORAGE_KEY_LANG = 'tf_lang'
const STORAGE_KEY_APIKEY = 'tf_apikey'
const STORAGE_KEY_THEME = 'tf_theme'

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem(STORAGE_KEY_LANG) || 'en')
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY_APIKEY) || '')
  const [symptoms, setSymptoms] = useState('')
  const [meta, setMeta] = useState({ age: '', sex: '', pregnant: 'no' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME)
    return saved ? saved === 'dark' : false
  })
  const { history, addEntry, clearHistory } = useTriageHistory()
  const { location, countryCode, emergency, loading: locLoading, asked, requestLocation, getMapsUrl } = useLocation()

  const labels = LABELS[lang] || LABELS.en

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem(STORAGE_KEY_THEME, isDark ? 'dark' : 'light')
  }, [isDark])

  const handleToggleTheme = () => setIsDark((d) => !d)

  const handleLangChange = (code) => {
    setLang(code)
    localStorage.setItem(STORAGE_KEY_LANG, code)
  }

  const handleApiKeyChange = (key) => {
    setApiKey(key)
    localStorage.setItem(STORAGE_KEY_APIKEY, key)
  }

  const handleMetaChange = (field, value) => {
    setMeta((prev) => ({ ...prev, [field]: value }))
  }

  const handleAnalyze = useCallback(async () => {
    setError(null)
    if (!apiKey.trim()) { setError(labels.noKey); return }
    if (symptoms.trim().length < 5) { setError(labels.noSymptoms); return }
    setLoading(true)
    try {
      const prompt = buildPrompt(lang, meta.age, meta.sex, meta.pregnant, symptoms)
      const triageResult = await callGemma(apiKey, prompt)
      setResult(triageResult)
      addEntry(triageResult, symptoms)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [apiKey, lang, meta, symptoms, labels, addEntry])

  const handleReset = () => {
    setResult(null)
    setError(null)
    setSymptoms('')
    setMeta({ age: '', sex: '', pregnant: 'no' })
  }

  return (
    <>
      <Header
        tagline={TAGLINES[lang] || TAGLINES.en}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />
      <LangBar currentLang={lang} onLangChange={handleLangChange} />

      <main className="main">
        <div className="disclaimer" role="note">
          <strong>⚠ </strong>{labels.disclaimer}
        </div>

        {!result && (
          <>
            <PatientMeta
              age={meta.age}
              sex={meta.sex}
              pregnant={meta.pregnant}
              onChange={handleMetaChange}
              labels={labels}
            />
            <SymptomInput
              value={symptoms}
              onChange={setSymptoms}
              onAnalyze={handleAnalyze}
              loading={loading}
              lang={lang}
              labels={labels}
            />
            <ApiKeyInput
              value={apiKey}
              onChange={handleApiKeyChange}
              labels={labels}
            />
          </>
        )}

        {error && <div className="error-msg" role="alert">{error}</div>}

        {result && (
          <TriageResult
            result={result}
            onReset={handleReset}
            labels={labels}
          />
        )}

        <HistoryPanel
          history={history}
          onClear={clearHistory}
          labels={labels}
        />
      </main>

      <EmergencyFooter
        emergency={emergency}
        location={location}
        countryCode={countryCode}
        loading={locLoading}
        asked={asked}
        onRequestLocation={requestLocation}
        getMapsUrl={getMapsUrl}
        labels={labels}
      />
    </>
  )
}
