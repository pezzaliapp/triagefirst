import { LANGS } from '../lib/labels.js'

export function LangBar({ currentLang, onLangChange }) {
  return (
    <div className="lang-bar">
      {LANGS.map((l) => (
        <button
          key={l.code}
          className={`lang-btn${currentLang === l.code ? ' active' : ''}`}
          onClick={() => onLangChange(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
