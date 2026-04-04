import { useState, useCallback } from 'react'
import { detectCountryFromCoords, getEmergencyByCountry } from '../lib/emergencyNumbers.js'

export function useLocation() {
  const [location, setLocation] = useState(null)
  const [countryCode, setCountryCode] = useState(null)
  const [emergency, setEmergency] = useState(getEmergencyByCountry('DEFAULT'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [asked, setAsked] = useState(false)

  const requestLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported')
      return
    }
    setLoading(true)
    setAsked(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        setLocation({ lat: latitude, lng: longitude })
        const code = await detectCountryFromCoords(latitude, longitude)
        setCountryCode(code)
        setEmergency(getEmergencyByCountry(code))
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      },
      { timeout: 10000 }
    )
  }, [])

  const getMapsUrl = useCallback(() => {
    if (!location) return 'https://www.google.com/maps/search/emergency+hospital+near+me'
    return `https://www.google.com/maps/search/emergency+hospital/@${location.lat},${location.lng},14z`
  }, [location])

  return { location, countryCode, emergency, loading, error, asked, requestLocation, getMapsUrl }
}
