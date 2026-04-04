// Emergency numbers by country code
// Sources: WHO, national health ministries
export const EMERGENCY_NUMBERS = {
  // Europe
  IT: { police: '112', ambulance: '118', fire: '115', general: '112', name: 'Italia' },
  FR: { police: '17', ambulance: '15', fire: '18', general: '112', name: 'France' },
  DE: { police: '110', ambulance: '112', fire: '112', general: '112', name: 'Deutschland' },
  ES: { police: '091', ambulance: '112', fire: '080', general: '112', name: 'España' },
  PT: { police: '112', ambulance: '112', fire: '112', general: '112', name: 'Portugal' },
  RO: { police: '112', ambulance: '112', fire: '112', general: '112', name: 'România' },
  BG: { police: '112', ambulance: '112', fire: '112', general: '112', name: 'България' },
  AL: { police: '129', ambulance: '127', fire: '128', general: '112', name: 'Shqipëri' },
  RU: { police: '102', ambulance: '103', fire: '101', general: '112', name: 'Россия' },
  SE: { police: '112', ambulance: '112', fire: '112', general: '112', name: 'Sverige' },
  NO: { police: '112', ambulance: '113', fire: '110', general: '112', name: 'Norge' },
  EE: { police: '112', ambulance: '112', fire: '112', general: '112', name: 'Eesti' },
  LV: { police: '110', ambulance: '113', fire: '112', general: '112', name: 'Latvija' },
  LT: { police: '112', ambulance: '112', fire: '112', general: '112', name: 'Lietuva' },
  TR: { police: '155', ambulance: '112', fire: '110', general: '112', name: 'Türkiye' },
  GB: { police: '999', ambulance: '999', fire: '999', general: '999', name: 'United Kingdom' },
  // Middle East & Africa
  MA: { police: '19', ambulance: '15', fire: '15', general: '15', name: 'المغرب' },
  SA: { police: '999', ambulance: '911', fire: '998', general: '911', name: 'السعودية' },
  AE: { police: '999', ambulance: '998', fire: '997', general: '999', name: 'الإمارات' },
  EG: { police: '122', ambulance: '123', fire: '180', general: '123', name: 'مصر' },
  KE: { police: '999', ambulance: '999', fire: '999', general: '999', name: 'Kenya' },
  TZ: { police: '112', ambulance: '112', fire: '112', general: '112', name: 'Tanzania' },
  NG: { police: '112', ambulance: '112', fire: '112', general: '112', name: 'Nigeria' },
  ET: { police: '911', ambulance: '907', fire: '939', general: '911', name: 'Ethiopia' },
  // South & Southeast Asia
  IN: { police: '100', ambulance: '102', fire: '101', general: '112', name: 'भारत' },
  BD: { police: '999', ambulance: '199', fire: '199', general: '999', name: 'বাংলাদেশ' },
  ID: { police: '110', ambulance: '118', fire: '113', general: '112', name: 'Indonesia' },
  PH: { police: '117', ambulance: '161', fire: '160', general: '911', name: 'Pilipinas' },
  // Americas
  US: { police: '911', ambulance: '911', fire: '911', general: '911', name: 'United States' },
  BR: { police: '190', ambulance: '192', fire: '193', general: '190', name: 'Brasil' },
  BO: { police: '110', ambulance: '118', fire: '119', general: '110', name: 'Bolivia' },
  // Default fallback
  DEFAULT: { police: '112', ambulance: '112', fire: '112', general: '112', name: 'International' },
}

export function getEmergencyByCountry(countryCode) {
  return EMERGENCY_NUMBERS[countryCode?.toUpperCase()] || EMERGENCY_NUMBERS.DEFAULT
}

export async function detectCountryFromCoords(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    return data.address?.country_code?.toUpperCase() || 'DEFAULT'
  } catch {
    return 'DEFAULT'
  }
}
