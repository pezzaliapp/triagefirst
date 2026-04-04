import { useEffect } from 'react'

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
  </svg>
)

export function EmergencyFooter({ emergency, location, countryCode, loading, asked, onRequestLocation, getMapsUrl, labels }) {
  return (
    <div className="emergency-footer">
      <div className="emergency-footer-inner">

        <div className="emergency-number-section">
          <div className="emergency-label">
            🚨 {labels?.emergencyNumber || 'Emergency Number'}
          </div>
          <a
            href={`tel:${emergency.general}`}
            className="emergency-call-btn"
          >
            <PhoneIcon />
            <span className="emergency-number">{emergency.general}</span>
            <span className="emergency-country">{emergency.name}</span>
          </a>
          {emergency.ambulance !== emergency.general && (
            <a href={`tel:${emergency.ambulance}`} className="emergency-secondary-btn">
              🚑 {labels?.ambulance || 'Ambulance'}: {emergency.ambulance}
            </a>
          )}
        </div>

        <div className="emergency-location-section">
          {!asked ? (
            <button className="location-btn" onClick={onRequestLocation}>
              <LocationIcon />
              {labels?.shareLocation || 'Share location for local emergency numbers'}
            </button>
          ) : loading ? (
            <div className="location-loading">
              <div className="location-spinner" />
              {labels?.detectingLocation || 'Detecting location...'}
            </div>
          ) : location ? (
            <a
              href={getMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hospital-map-btn"
            >
              <MapIcon />
              {labels?.nearestHospital || 'Find nearest hospital'}
              {countryCode && <span className="country-badge">{countryCode}</span>}
            </a>
          ) : (
            <button className="location-btn" onClick={onRequestLocation}>
              <LocationIcon />
              {labels?.retryLocation || 'Retry location detection'}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
