import { EmergencyBanner } from './EmergencyBanner.jsx'

const LEVEL_CONFIG = {
  RED: { color: 'red', icon: '🚨' },
  AMBER: { color: 'amber', icon: '⚠️' },
  GREEN: { color: 'green', icon: '✓' },
}

export function TriageResult({ result, onReset, labels }) {
  if (!result) return null

  const level = (result.level || 'AMBER').toUpperCase()
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.AMBER
  const levelLabel = labels[`level${level.charAt(0) + level.slice(1).toLowerCase()}`]
    || labels[`level${level}`]
    || level

  return (
    <div className="result-wrapper">
      {result.emergency && <EmergencyBanner label={labels.emergency} />}

      <div className={`result-card level-${config.color}`} role="region" aria-label="Triage result">
        <div className="result-header">
          <span className="level-icon" aria-hidden="true">{config.icon}</span>
          <span className={`level-badge badge-${config.color}`}>
            {levelLabel}
          </span>
        </div>

        <div className="result-title">{result.title}</div>
        <div className="result-body">{result.explanation}</div>

        <div className="action-list" aria-label="Recommended actions">
          {(result.actions || []).map((action, i) => (
            <div key={i} className="action-item">
              <div className={`action-dot dot-${config.color}`} aria-hidden="true" />
              <span>{action}</span>
            </div>
          ))}
        </div>

        <div className="result-footer">{result.disclaimer}</div>
      </div>

      <button className="btn reset-btn" onClick={onReset}>
        {labels.reset}
      </button>
    </div>
  )
}
