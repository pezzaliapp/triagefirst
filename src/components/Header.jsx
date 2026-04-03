export function Header({ tagline, isDark, onToggleTheme }) {
  return (
    <header className="header">
      <div>
        <div className="logo">
          Triage<span className="logo-accent">First</span>
        </div>
        <div className="tagline">{tagline}</div>
      </div>
      <div className="header-right">
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <div className="header-badge">
          <span className="badge-dot" />
          Gemma 4
        </div>
      </div>
    </header>
  )
}
