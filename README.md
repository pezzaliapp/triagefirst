# TriageFirst 🏥

> Offline-ready medical triage powered by Gemma 4 — for communities with limited healthcare access.

[![Live Demo](https://img.shields.io/badge/demo-live-00b894?style=flat-square)](https://YOUR_USERNAME.github.io/triagefirst/)
[![Gemma 4](https://img.shields.io/badge/model-Gemma%204-4285F4?style=flat-square)](https://ai.google.dev/gemma)
[![PWA](https://img.shields.io/badge/PWA-ready-0a0e13?style=flat-square)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

## The Problem

In rural and underserved areas worldwide, the question **"Do I need to go to the hospital?"** is answered without information — with potentially fatal consequences in both directions. A wrong decision means either a preventable death from delay, or a family bankrupted by an unnecessary emergency visit.

There is no triage nurse in a village in rural Kenya. No duty doctor available at 2am in a remote area of Bangladesh. No one to ask.

**TriageFirst changes that.**

---

## What It Does

TriageFirst is a progressive web app that acts as a **first-line triage assistant** — like a trained nurse at a hospital entrance. It does not diagnose. It helps people make the single most important decision: **how urgently do they need professional care.**

### Triage Levels

| Level | Meaning | Action |
|-------|---------|--------|
| 🚨 RED | Emergency | Go to hospital immediately |
| ⚠️ AMBER | Urgent | See a doctor today |
| ✅ GREEN | Non-urgent | Monitor at home, follow guidance |

### Key Features

- **Voice + text input** — accessible to users with low literacy via Web Speech API
- **8 languages** — English, Français, Kiswahili, हिन्दी, Português, عربي, Español, Italiano
- **Patient context** — age, sex, pregnancy status for more accurate triage
- **Offline-ready PWA** — installable, works with poor connectivity
- **No account, no subscription** — zero barrier to access
- **Assessment history** — stored locally, private, no server
- **Powered by Gemma 4** — Google's open model via AI Studio free tier

---

## Architecture

```
User (voice or text)
        │
        ▼
  SymptomInput + PatientMeta
        │
        ▼
  buildPrompt() — multilingual prompt construction
        │
        ▼
  Google AI Studio API
  model: gemma-3-27b-it (→ gemma-4 when available)
        │
        ▼
  JSON response { level, title, explanation, actions, emergency, disclaimer }
        │
        ▼
  TriageResult — RED / AMBER / GREEN with recommended actions
        │
        ▼
  localStorage history (device-local, never transmitted)
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| PWA | vite-plugin-pwa + Workbox |
| AI Model | Gemma 4 via Google AI Studio API |
| Voice Input | Web Speech API (native browser) |
| i18n | Custom labels + prompt system (8 languages) |
| Storage | localStorage (no backend, no database) |
| Deploy | GitHub Pages |

---

## Gemma 4 Integration

TriageFirst uses **Gemma 4** (`gemma-3-27b-it` / `gemma-4` when available via API) through Google AI Studio.

The model receives a structured prompt that includes:
- Patient demographics (age, sex, pregnancy)
- Symptom description in the user's chosen language
- Role definition: medical triage assistant for underserved communities
- Strict JSON output schema (level, title, explanation, actions, emergency flag, disclaimer)

Generation config: `temperature: 0.2` for consistent, conservative triage outputs.

Safety settings are set to allow medical symptom descriptions without false positives from content filters.

The prompt system is designed so that **Gemma 4 responds in the same language the user selects** — enabling true multilingual triage without separate model fine-tuning.

---

## Impact

### Who benefits
- Rural families in sub-Saharan Africa, South Asia, Latin America
- Community health workers with no specialist access
- Disaster relief coordinators in offline environments
- Anyone who cannot afford or access a doctor at the moment of need

### Why it matters
- ~1 billion people lack access to basic healthcare (WHO)
- ~46% of the world's population lacks essential health services
- Mobile smartphone penetration in emerging markets: 45-65% and growing
- Gemma 4 runs on mid-range Android devices — barrier to entry is near zero

---

## Getting Started

### Prerequisites
- Node.js 18+
- A free Google AI Studio API key → [aistudio.google.com](https://aistudio.google.com)

### Install & Run

```bash
git clone https://github.com/YOUR_USERNAME/triagefirst.git
cd triagefirst
npm install
npm run dev
```

Open `http://localhost:5173/triagefirst/`

### Build for Production

```bash
npm run build
```

Output in `dist/` — ready for GitHub Pages or any static host.

---

## Deploy to GitHub Pages

### Automatic (recommended)

Push to `main` branch. The included GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys to GitHub Pages.

**Setup once:**
1. Go to repo Settings → Pages
2. Set Source to "GitHub Actions"
3. Push any commit to `main`

### Manual

```bash
npm run build
# Upload contents of dist/ to your static host
```

---

## Project Structure

```
triagefirst/
├── src/
│   ├── App.jsx                 # Main application state
│   ├── main.jsx                # React entry point
│   ├── components/
│   │   ├── Header.jsx          # App header with branding
│   │   ├── LangBar.jsx         # Language selector (8 languages)
│   │   ├── PatientMeta.jsx     # Age / sex / pregnancy inputs
│   │   ├── SymptomInput.jsx    # Text + voice symptom entry
│   │   ├── ApiKeyInput.jsx     # Google AI key input (local storage)
│   │   ├── TriageResult.jsx    # Result display (RED/AMBER/GREEN)
│   │   ├── EmergencyBanner.jsx # Emergency alert banner
│   │   └── HistoryPanel.jsx    # Assessment history
│   ├── hooks/
│   │   ├── useVoiceInput.js    # Web Speech API hook
│   │   └── useTriageHistory.js # localStorage history hook
│   ├── lib/
│   │   ├── gemmaClient.js      # Google AI API client
│   │   ├── prompts.js          # Multilingual prompt builder
│   │   └── labels.js           # i18n UI strings
│   └── styles/
│       └── main.css            # Dark medical theme
├── public/
│   └── icons/                  # PWA icons 192x192 + 512x512
├── vite.config.js              # Vite + PWA plugin config
├── package.json
└── README.md
```

---

## Medical Disclaimer

TriageFirst is **not a medical device** and does not provide medical diagnoses. It offers triage guidance similar to what a trained nurse might provide at a hospital entrance — helping users decide how urgently to seek professional care.

**Always consult a qualified healthcare professional for medical decisions.**

The AI model (Gemma 4) may make errors. In emergencies, always call local emergency services.

---

## Contributing

Contributions welcome — especially:
- Additional language support
- Offline/local model integration (Ollama + Gemma 4)
- Accessibility improvements
- Clinical review of triage prompts

---

## License

MIT — free to use, modify, and deploy. See [LICENSE](LICENSE).

---

*Built for the Gemma 4 Impact Challenge — Kaggle 2026*
*Track: Health & Science / Digital Equity*
*By Alessandro Pezzali — [PezzaliApp](https://pezzaliapp.com)*
