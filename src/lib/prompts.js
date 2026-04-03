export function buildPrompt(lang, age, sex, pregnant, symptoms) {
  const patient = `Age: ${age || 'unknown'} | Sex: ${sex || 'unknown'} | Pregnant: ${pregnant || 'no'}`
  const jsonSchema = `{
  "level": "RED" | "AMBER" | "GREEN",
  "title": "short triage summary (max 12 words)",
  "explanation": "plain language explanation (2-3 sentences)",
  "actions": ["action 1", "action 2", "action 3"],
  "emergency": true | false,
  "disclaimer": "brief medical disclaimer"
}`

  const instructions = {
    en: `You are a medical triage assistant helping communities with limited healthcare access.
Patient: ${patient}
Symptoms: ${symptoms}
RED = go to emergency immediately. AMBER = see a doctor today. GREEN = manage at home, monitor closely.
Respond ONLY with valid JSON (no markdown, no preamble, no explanation outside JSON):
${jsonSchema}`,

    fr: `Vous êtes un assistant de triage médical pour les communautés avec accès limité aux soins.
Patient: ${patient}
Symptômes: ${symptoms}
RED = urgence immédiate. AMBER = voir un médecin aujourd'hui. GREEN = gérer à domicile.
Répondez UNIQUEMENT avec du JSON valide (pas de markdown, pas de préambule):
${jsonSchema}`,

    sw: `Wewe ni msaidizi wa utata wa kimatibabu kwa jamii zenye upatikanaji mdogo wa huduma za afya.
Mgonjwa: ${patient}
Dalili: ${symptoms}
RED = dharura ya haraka. AMBER = ona daktari leo. GREEN = dhibiti nyumbani.
Jibu KWA JSON TU (bila markdown, bila utangulizi):
${jsonSchema}`,

    hi: `आप सीमित स्वास्थ्य सेवा वाले समुदायों के लिए चिकित्सा ट्राइएज सहायक हैं।
मरीज़: ${patient}
लक्षण: ${symptoms}
RED = तुरंत आपातकालीन। AMBER = आज डॉक्टर से मिलें। GREEN = घर पर देखभाल।
केवल JSON में जवाब दें (markdown नहीं, कोई प्रस्तावना नहीं):
${jsonSchema}`,

    pt: `Você é um assistente de triagem médica para comunidades com acesso limitado à saúde.
Paciente: ${patient}
Sintomas: ${symptoms}
RED = emergência imediata. AMBER = ver médico hoje. GREEN = gerenciar em casa.
Responda APENAS com JSON válido (sem markdown, sem preâmbulo):
${jsonSchema}`,

    ar: `أنت مساعد فرز طبي للمجتمعات ذات الوصول المحدود للرعاية الصحية.
المريض: ${patient}
الأعراض: ${symptoms}
RED = طارئ فوري. AMBER = زيارة طبيب اليوم. GREEN = رعاية منزلية.
أجب فقط بـ JSON صالح (بدون markdown، بدون مقدمة):
${jsonSchema}`,

    es: `Eres un asistente de triaje médico para comunidades con acceso limitado a la salud.
Paciente: ${patient}
Síntomas: ${symptoms}
RED = emergencia inmediata. AMBER = ver médico hoy. GREEN = manejar en casa.
Responde SOLO con JSON válido (sin markdown, sin preámbulo):
${jsonSchema}`,

    it: `Sei un assistente di triage medico per comunità con accesso limitato alla sanità.
Paziente: ${patient}
Sintomi: ${symptoms}
RED = emergenza immediata. AMBER = visita medica oggi. GREEN = gestire a casa.
Rispondi SOLO con JSON valido (senza markdown, senza preambolo):
${jsonSchema}`,
  }

  return instructions[lang] || instructions.en
}
