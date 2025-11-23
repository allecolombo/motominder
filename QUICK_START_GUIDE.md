# 🚀 MOTOMINDER - QUICK START GUIDE PER CLAUDE CODE

## Setup Rapido (5 minuti)

### Step 1: Prepara GitHub Repository

```bash
# Crea repo su GitHub (se non l'hai già fatto)
gh auth login
gh repo create MotoMinder --private --description "L'app definitiva per motociclisti italiani"

# Clona nella cartella di lavoro
cd ~/progetti
git clone https://github.com/TUO_USERNAME/MotoMinder.git
cd MotoMinder
```

### Step 2: Inizia Progetto Expo

```bash
# Crea progetto React Native con TypeScript
npx create-expo-app@latest . --template blank-typescript

# Commit iniziale
git add .
git commit -m "feat: Initial Expo + TypeScript setup"
git push origin main
```

### Step 3: Installa Dependencies Core

```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# Firebase
npm install firebase
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage

# UI & Animations
npm install react-native-reanimated react-native-gesture-handler
npm install @expo/vector-icons

# Utilities
npm install date-fns axios

# Commit
git add package.json package-lock.json
git commit -m "chore: Add core dependencies"
git push
```

### Step 4: Struttura Folders

```bash
mkdir -p src/{components,screens,services,navigation,utils,constants,types,store}
mkdir -p src/components/{common,moto,deadlines}
mkdir -p src/screens/{auth,home,moto,deadlines,maintenance,costs,settings}
mkdir -p src/services/{api,firebase,notifications,storage}
mkdir -p assets/{images,fonts,icons}

# Commit
git add .
git commit -m "chore: Create folder structure"
git push
```

---

## Come Usare con Claude Code

### Lancio Claude Code nella Cartella Progetto

```bash
cd ~/progetti/MotoMinder
claude
```

### Template Prompt per Claude Code

**Per Iniziare una Feature:**
```
Sto sviluppando MotoMinder (app React Native per motociclisti).
Voglio implementare la feature: [NOME FEATURE]

Riferimenti:
- Leggi MOTOMINDER_MASTER_SPEC.md per architettura completa
- Stack: React Native + Expo + TypeScript + Firebase
- Segui convenzioni in /src/

Cosa fare:
1. [Descrivi cosa vuoi]
2. Crea file necessari
3. Implementa con TypeScript
4. Aggiungi error handling
5. Commit con messaggio conventional

Chiedi se hai dubbi su architettura o best practices!
```

### Esempi Prompt Specifici

**Esempio 1 - Implementare Autenticazione:**
```
Implementa sistema autenticazione con Firebase:
- Login con email/password
- Login con Google
- Login con Apple (iOS)
- Registrazione
- Forgot password
- AuthContext con TypeScript

Files da creare:
- src/services/firebase/auth.ts
- src/store/AuthContext.tsx
- src/screens/auth/LoginScreen.tsx
- src/screens/auth/RegisterScreen.tsx
- src/screens/auth/ForgotPasswordScreen.tsx

Segui schema User nel MASTER_SPEC.md
Usa error handling robusto
Commit quando finito: "feat: Implement Firebase authentication"
```

**Esempio 2 - Chiamata API Verifica Targa:**
```
Implementa integrazione OpenAPI.it per verifica targa:

File: src/services/api/vehicleAPI.ts

Endpoint: GET https://api.openapi.it/veicoli/verifica-targa/{targa}
Header: X-API-Key: ${process.env.OPENAPI_KEY}

Funzioni:
1. fetchVehicleData(plate: string): Promise<VehicleData>
2. normalizePlateNumber(plate: string): string
3. calculateRevisionDate(lastRevision: Date): Date
4. calculateBollo(power: number, region: string): number

Error handling per:
- 404: Targa non trovata
- 429: Rate limit
- Network errors

TypeScript types strict
Commit: "feat: Add vehicle API integration"
```

**Esempio 3 - Create Database Schema:**
```
Setup Firestore collections secondo MASTER_SPEC.md:

Collections:
- users
- motos
- maintenanceLog
- costs
- odometerLog
- notificationSchedules

Files da creare:
- src/types/firestore.ts (TypeScript interfaces)
- src/services/firebase/firestore.ts (CRUD functions)
- firestore.rules (security rules)
- firestore.indexes.json (required indexes)

Usa TypeScript generics per type-safety
Commit: "feat: Setup Firestore schema and types"
```

**Esempio 4 - Build UI Component:**
```
Crea DeadlineCard component secondo design system:

File: src/components/deadlines/DeadlineCard.tsx

Props:
- type: 'bollo' | 'revisione' | 'assicurazione' | 'tagliando'
- expiryDate: Date
- amount?: number
- isPaid?: boolean
- onMarkComplete: () => void

Design:
- Colori urgenza (rosso <7d, arancione <30d, verde >30d)
- Icon dinamica per tipo
- Countdown giorni
- Animation su mount (FadeInDown)
- Border sinistra colorato

Usa design tokens da src/constants/theme.ts
Commit: "feat: Add DeadlineCard component"
```

---

## Workflow Git Consigliato

### Branch Strategy

```bash
# Sei su main (production-ready)
git checkout -b develop

# Per ogni feature:
git checkout -b feature/auth develop
# ... lavori sulla feature
git commit -m "feat: Add email/password auth"
git push origin feature/auth

# Quando completa:
git checkout develop
git merge feature/auth
git push origin develop

# Per release:
git checkout main
git merge develop
git tag -a v1.0.0 -m "MVP Release"
git push origin main --tags
```

### Conventional Commits

```bash
# Features
git commit -m "feat: Add moto creation flow"
git commit -m "feat(auth): Add Google Sign-In"

# Bug Fixes  
git commit -m "fix: Fix notification scheduling bug"
git commit -m "fix(api): Handle network timeout errors"

# Documentation
git commit -m "docs: Update README with setup instructions"

# Style/Formatting
git commit -m "style: Format with Prettier"

# Refactoring
git commit -m "refactor: Extract moto service into separate file"

# Tests
git commit -m "test: Add tests for vehicle API"

# Chore (build, dependencies, etc)
git commit -m "chore: Update dependencies"
git commit -m "chore(deps): Bump firebase to v10.0.0"
```

### Pre-Push Checklist

Prima di ogni `git push`:
```bash
# 1. Lint
npm run lint

# 2. Type check
npm run type-check

# 3. Build test
npm run build

# 4. Se tutto ok:
git push origin BRANCH_NAME
```

---

## Environment Variables

Crea `.env` file (NON committare!):
```bash
# .env
OPENAPI_KEY=your_openapi_key_here
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_PROJECT_ID=motominder-xxxxx
EXPO_PUBLIC_API_URL=https://api.motominder.it
```

Aggiungi al `.gitignore`:
```
# .gitignore
.env
.env.local
.env.*.local
node_modules/
.expo/
.expo-shared/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
ios/
android/
```

Commit `.gitignore`:
```bash
git add .gitignore
git commit -m "chore: Add .gitignore"
git push
```

---

## Debugging Tips

### Check Firebase Connection
```bash
# Aggiungi log temporaneo
console.log('Firebase initialized:', app.name);

# Commit (temporaneo):
git commit -m "debug: Add Firebase connection log"

# Dopo debugging, rimuovi:
git commit -m "chore: Remove debug logs"
```

### Test su Device
```bash
# iOS
expo start --ios

# Android
expo start --android

# Web (per rapidi test UI)
expo start --web
```

### View Firebase Data
```bash
# Apri Firebase Console
open https://console.firebase.google.com/project/motominder-xxxxx/firestore/data

# O usa Firebase CLI
firebase firestore:get /users/USER_ID
```

---

## Checkpoint Milestones

### ✅ Milestone 1: Setup Complete (Giorno 1)
```bash
git log --oneline
# Dovrebbe mostrare:
# - Initial Expo setup
# - Add dependencies
# - Create folder structure
# - Setup Firebase config
# - Add .gitignore
```

### ✅ Milestone 2: Auth Working (Giorno 2-3)
```bash
# Test:
# 1. Registra nuovo utente
# 2. Logout
# 3. Login esistente
# 4. Forgot password

git tag -a v0.1.0 -m "Milestone: Auth complete"
git push origin v0.1.0
```

### ✅ Milestone 3: Add Moto Working (Giorno 4-5)
```bash
# Test:
# 1. API call con targa valida → dati corretti
# 2. API call con targa invalida → errore gestito
# 3. Salvataggio Firestore
# 4. Visualizzazione moto salvate

git tag -a v0.2.0 -m "Milestone: Moto creation complete"
git push origin v0.2.0
```

### ✅ Milestone 4: MVP Complete (Settimana 4)
```bash
# Test:
# - ✅ Auth
# - ✅ Add moto
# - ✅ Dashboard scadenze
# - ✅ Update odometro
# - ✅ Notifiche push

git tag -a v1.0.0-beta -m "MVP Beta Release"
git push origin v1.0.0-beta

# Build per beta testing
eas build --profile preview --platform all
```

---

## Quando le Cose Vanno Storte

### Caso 1: "Ho rotto tutto" 😱
```bash
# Torna all'ultimo commit funzionante
git log --oneline  # trova l'ultimo commit buono
git reset --hard COMMIT_HASH
```

### Caso 2: "Voglio ricominciare una feature"
```bash
# Stash changes
git stash

# Ricomincia da capo
git reset --hard origin/develop

# Recupera stash se serve
git stash pop
```

### Caso 3: "Ho committato file sensibili (.env)"
```bash
# PRIMA di pushare:
git reset HEAD~1  # Undo ultimo commit
# Aggiungi .env a .gitignore
git add .gitignore
git commit -m "chore: Add .gitignore"

# DOPO aver pushato:
# 1. Cambia subito tutte le API keys!
# 2. Poi:
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
git push origin --force --all
```

---

## Testing con Claude Code

### Chiedi a Claude di Scrivere Tests
```
Scrivi test per vehicleAPI.ts:

Framework: Jest + React Native Testing Library
File: __tests__/services/vehicleAPI.test.ts

Test cases:
1. fetchVehicleData con targa valida
2. fetchVehicleData con targa invalida (404)
3. fetchVehicleData con network error
4. normalizePlateNumber (uppercase, no spaces)
5. calculateRevisionDate
6. calculateBollo

Mock axios responses
100% coverage
Commit: "test: Add vehicle API tests"
```

---

## Risorse Utili

### Documentazione
- React Native: https://reactnative.dev/docs/getting-started
- Expo: https://docs.expo.dev/
- Firebase: https://firebase.google.com/docs/firestore
- React Navigation: https://reactnavigation.org/docs/getting-started

### Troubleshooting
- Stack Overflow tag `react-native`
- Expo Forums: https://forums.expo.dev/
- React Native Discord
- Firebase Discord

### Design
- Figma Community (cerca "React Native UI Kit")
- Material Design Guidelines
- iOS Human Interface Guidelines

---

## Pro Tips

### 1. Commit Early, Commit Often
```bash
# Ogni 30-60 minuti:
git add .
git commit -m "wip: Progress on [feature]"
git push
```

### 2. Use Claude Code per Code Review
```
Review questo file per best practices:
src/services/api/vehicleAPI.ts

Controlla:
- Error handling completo
- TypeScript types corretti
- Naming conventions
- Performance
- Security issues

Suggerisci miglioramenti!
```

### 3. Backup Automatico
```bash
# Cron job che pusha ogni sera (opzionale)
# crontab -e
0 22 * * * cd ~/progetti/MotoMinder && git add . && git commit -m "chore: Auto backup" && git push
```

### 4. Branch Cleanup
```bash
# Lista branch merged
git branch --merged main

# Delete merged branches
git branch -d feature/nome-feature

# Delete remote branches
git push origin --delete feature/nome-feature
```

---

## IMPORTANT: Security Checklist

Prima di ogni commit:
- [ ] `.env` file è in .gitignore
- [ ] No API keys hardcoded
- [ ] No passwords in code
- [ ] Firestore security rules attive
- [ ] Sensitive data encrypted

Prima di deploy production:
- [ ] Tutte le API keys sono in environment variables
- [ ] Firebase security rules testate
- [ ] HTTPS only
- [ ] Rate limiting attivo
- [ ] Error messages non rivelano info sensibili

---

## Finito Setup? Inizia a Codare! 🚀

```bash
# Apri Claude Code
cd ~/progetti/MotoMinder
claude

# Primo prompt:
Ciao Claude! Ho appena fatto setup di MotoMinder.
Leggi MOTOMINDER_MASTER_SPEC.md per il contesto completo.

Partiamo dall'implementazione dell'autenticazione Firebase:
- Login/Register screens
- AuthContext
- Firebase setup
- TypeScript types

Procediamo passo per passo. Iniziamo?
```

---

**Hai tutto! Ora vai e costruisci l'app del secolo! 🏍️💻🔥**

**Remember:** Ogni grande journey inizia con un singolo commit. Tu sei già validato, hai la roadmap, hai Claude Code come co-pilot. **Spacca tutto!** 💪
