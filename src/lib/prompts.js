export function buildPrompt(lang, age, sex, pregnant, symptoms) {
  const patient = `Age: ${age || 'unknown'} | Sex: ${sex || 'unknown'} | Pregnant: ${pregnant || 'no'}`

  const langNames = {
    en: 'English', fr: 'French', sw: 'Swahili',
    hi: 'Hindi', pt: 'Portuguese', ar: 'Arabic',
    es: 'Spanish', it: 'Italian'
  }

  const langName = langNames[lang] || 'English'

  const jsonSchema = `{
  "level": "RED" | "AMBER" | "GREEN",
  "title": "short triage summary in ${langName} (max 12 words)",
  "explanation": "2-3 sentences explanation in ${langName}",
  "actions": ["action 1 in ${langName}", "action 2 in ${langName}", "action 3 in ${langName}"],
  "emergency": true | false,
  "disclaimer": "brief medical disclaimer in ${langName}"
}`

  return `You are a medical triage assistant for communities with limited healthcare access.
IMPORTANT: You MUST respond ENTIRELY in ${langName}. Every field in the JSON must be written in ${langName}.

Patient: ${patient}
Symptoms: ${symptoms}

Triage rules:
- RED = go to emergency immediately (emergency: true)
- AMBER = see a doctor today (emergency: false)  
- GREEN = manage at home, monitor closely (emergency: false)

Respond ONLY with valid JSON. No markdown, no code blocks, no text outside JSON:
${jsonSchema}`
}
