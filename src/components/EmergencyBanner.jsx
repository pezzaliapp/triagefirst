export function EmergencyBanner({ label }) {
  return (
    <div className="emergency-banner" role="alert">
      <span className="emergency-icon">🚨</span>
      <span>{label}</span>
    </div>
  )
}
