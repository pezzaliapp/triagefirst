import { useState } from 'react'

export function ApiKeyInput({ value, onChange, labels }) {
  const [show, setShow] = useState(false)

  return (
    <div className="api-card">
      <label>{labels.apiLabel}</label>
      <div className="api-input-row">
        <input
          className="api-input"
          type={show ? 'text' : 'password'}
          placeholder="AIza..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
        <button
          className="btn api-toggle"
          onClick={() => setShow((s) => !s)}
          title={show ? 'Hide' : 'Show'}
        >
          {show ? '🙈' : '👁'}
        </button>
      </div>
      <div className="api-hint">
        {labels.apiHint.split('aistudio.google.com').map((part, i) =>
          i === 0 ? (
            <span key={i}>{part}</span>
          ) : (
            <span key={i}>
              <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">
                aistudio.google.com
              </a>
              {part}
            </span>
          )
        )}
      </div>
    </div>
  )
}
