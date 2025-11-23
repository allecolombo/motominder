# 🏍️ MotoMinder

L'app definitiva per motociclisti italiani - Mai più scadenze dimenticate!

## 📱 Cosa fa MotoMinder

MotoMinder è un'app mobile che aiuta i motociclisti a gestire:
- ✅ Scadenze (bollo, revisione, assicurazione, tagliando)
- ✅ Manutenzioni e storico interventi
- ✅ Tracker costi e analisi €/km
- ✅ Aggiornamento odometro
- ✅ Notifiche push intelligenti

**Feature killer:** Inserisci solo la targa e l'app recupera automaticamente tutti i dati della moto!

## 🚀 Setup Progetto

### Prerequisites

- Node.js 18+ (hai v22.16.0 ✅)
- npm 10+ (hai v10.9.2 ✅)
- Git (hai v2.51.1 ✅)
- Expo Go app sul telefono per testing

### Installazione

1. **Clona il repository:**
   ```bash
   git clone https://github.com/TUO_USERNAME/MotoMinder.git
   cd MotoMinder
   ```

2. **Installa dependencies:**
   ```bash
   npm install
   ```

3. **Configura environment variables:**
   ```bash
   cp .env.example .env
   # Modifica .env con le tue API keys
   ```

4. **Avvia il development server:**
   ```bash
   npm start
   ```

5. **Scansiona QR code con Expo Go**

## 📂 Struttura Progetto

```
MotoMinder/
├── src/
│   ├── components/      # UI components riutilizzabili
│   │   ├── common/      # Button, Card, Input, etc.
│   │   ├── moto/        # MotoCard, MotoList, etc.
│   │   ├── deadlines/   # DeadlineCard, DeadlineList, etc.
│   │   ├── maintenance/ # Manutenzione components
│   │   └── costs/       # Costi components
│   ├── screens/         # Schermate app
│   │   ├── auth/        # Login, Register, ForgotPassword
│   │   ├── home/        # Dashboard principale
│   │   ├── moto/        # Gestione moto
│   │   ├── deadlines/   # Scadenze
│   │   ├── maintenance/ # Diario manutenzioni
│   │   ├── costs/       # Tracker costi
│   │   ├── settings/    # Impostazioni
│   │   └── motogp/      # Contenuti MotoGP
│   ├── services/        # Business logic
│   │   ├── api/         # API calls
│   │   ├── firebase/    # Firebase services
│   │   ├── notifications/ # Push notifications
│   │   └── storage/     # Local storage
│   ├── navigation/      # React Navigation setup
│   ├── store/           # State management (Context API)
│   ├── utils/           # Utility functions
│   ├── constants/       # Costanti, colori, config
│   └── types/           # TypeScript types
├── assets/              # Immagini, fonts, icons
├── __tests__/           # Test files
└── docs/                # Documentazione
```

## 🛠️ Comandi Disponibili

```bash
# Development
npm start              # Avvia Expo dev server
npm run android        # Avvia su Android
npm run ios            # Avvia su iOS
npm run web            # Avvia su web

# Code Quality
npm run lint           # Esegui ESLint
npm run lint:fix       # Fix automatico errori lint
npm run format         # Formatta codice con Prettier
npm run type-check     # Verifica TypeScript

# Maintenance
npm run clean          # Pulisci build artifacts
npm run clean:install  # Reinstalla dependencies
```

## 🔧 Tech Stack

- **Framework:** React Native + Expo
- **Language:** TypeScript (strict mode)
- **Backend:** Firebase (Auth, Firestore, Storage, Cloud Functions)
- **Navigation:** React Navigation v7
- **UI/Animations:** React Native Reanimated, Gesture Handler
- **State:** React Context API
- **API:** OpenAPI.it (verifica targa), MotoGP API
- **Notifications:** Expo Notifications + Firebase Cloud Messaging

## 📚 Documentazione Completa

Questo repository include documentazione esaustiva:

- **[MOTOMINDER_MASTER_SPEC.md](./MOTOMINDER_MASTER_SPEC.md)** - Specifiche complete (30.000 parole, 19 sezioni)
- **[INDEX.md](./INDEX.md)** - Guida ai documenti
- **[QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)** - Setup e workflow quotidiano
- **[CLAUDE_CODE_PROMPTS.md](./CLAUDE_CODE_PROMPTS.md)** - Template prompt per Claude Code
- **[MILESTONES_CHECKLIST.md](./MILESTONES_CHECKLIST.md)** - 9 milestone di sviluppo
- **[GIT_CHEAT_SHEET.md](./GIT_CHEAT_SHEET.md)** - Comandi Git reference

## 🎯 Development Roadmap

### ✅ Milestone 0: Setup Complete
- Progetto Expo inizializzato
- Dependencies installate
- Struttura folder creata
- Git repository configurato

### 🚧 Prossimi Step
1. **Settimana 1:** Autenticazione Firebase
2. **Settimana 2:** Aggiungi Moto + Dashboard Scadenze
3. **Settimana 3:** Odometro + Notifiche Push
4. **Settimana 4:** UI Polish + Beta Launch

Vedi [MILESTONES_CHECKLIST.md](./MILESTONES_CHECKLIST.md) per dettagli completi.

## 🧪 Testing

```bash
# Coming soon - testing tools da configurare
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 🔐 Environment Variables

Crea un file `.env` nella root (mai committare!):

```bash
# OpenAPI.it
OPENAPI_KEY=tua_api_key

# Firebase
FIREBASE_API_KEY=tua_firebase_key
FIREBASE_PROJECT_ID=tuo_project_id
# ... altre config Firebase

# Expo
EXPO_PUBLIC_API_URL=https://api.motominder.it
```

## 🤝 Contributing

Questo è un progetto privato in sviluppo attivo. Contributi benvenuti dopo il lancio MVP.

## 📄 License

Proprietary - All rights reserved

## 🏆 Credits

**Developed by Alessandro**
- Embedded Engineer @ CNH
- Appassionato di moto e MotoGP
- 177 motociclisti hanno validato questa idea! 🏍️

## 🚀 Status

**Current Version:** 1.0.0 (Setup Complete)
**Status:** 🟢 Active Development
**MVP Launch Target:** ~4 settimane
**Beta Testers:** Ready to go!

---

**Per domande o supporto, consulta la documentazione o apri una issue.**

**Let's build the best moto app in Italy! 🏍️🔥**
