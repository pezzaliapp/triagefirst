import { useVoiceInput } from '../hooks/useVoiceInput.js'

const MicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
)

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

export function SymptomInput({ value, onChange, onAnalyze, loading, lang, labels }) {
  const handleTranscript = (text) => onChange(text)
  const { isRecording, isSupported, toggle } = useVoiceInput(lang, handleTranscript)

  const canAnalyze = value.trim().length >= 5 && !loading

  return (
    <div className="input-card">
      <div className="input-label">{labels.symptomsLabel}</div>
      <textarea
        className="symptom-input"
        placeholder={labels.symptomsPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        rows={4}
      />
      <div className="input-actions">
        {isSupported ? (
          <button
            className={`btn btn-voice${isRecording ? ' recording' : ''}`}
            onClick={toggle}
            title={labels.voice}
          >
            <MicIcon />
            <span>{isRecording ? labels.recording : labels.voice}</span>
          </button>
        ) : (
          <button className="btn" disabled title={labels.voiceNotSupported} style={{ opacity: 0.3 }}>
            <MicIcon />
            <span>{labels.voice}</span>
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={onAnalyze}
          disabled={!canAnalyze}
        >
          {loading ? (
            <>
              <div className="btn-spinner" />
              {labels.loading}
            </>
          ) : (
            <>
              <SearchIcon />
              {labels.analyze}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
