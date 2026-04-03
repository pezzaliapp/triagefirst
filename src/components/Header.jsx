export function Header() {
  return (
    <header className="header">
      <div>
        <div className="logo">
          Triage<span className="logo-accent">First</span>
        </div>
        <div className="tagline">
          Offline-ready medical triage · Powered by Gemma 4
        </div>
      </div>
      <div className="header-badge">
        <span className="badge-dot" />
        Gemma 4
      </div>
    </header>
  )
}
