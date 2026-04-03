const LEVEL_COLORS = {
  RED: 'var(--red)',
  AMBER: 'var(--amber)',
  GREEN: 'var(--green)',
}

export function HistoryPanel({ history, onClear, labels }) {
  if (!history.length) return null

  return (
    <div className="history-section">
      <div className="history-header">
        <div className="history-title">{labels.histTitle}</div>
        <button className="btn btn-sm" onClick={onClear}>
          {labels.clearHistory}
        </button>
      </div>
      {history.map((entry) => (
        <div key={entry.id} className="history-item">
          <div
            className="hist-dot"
            style={{ background: LEVEL_COLORS[entry.level] || 'var(--muted)' }}
            aria-hidden="true"
          />
          <span className="hist-title">{entry.title || entry.symptoms}</span>
          <span className="hist-date">
            {new Date(entry.ts).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  )
}
