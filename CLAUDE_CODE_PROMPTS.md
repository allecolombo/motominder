# 💬 MOTOMINDER - CLAUDE CODE PROMPT TEMPLATES

## Come Usare Questi Templates

1. Copia il template che ti serve
2. Sostituisci i placeholder [IN_MAIUSCOLO]
3. Incolla in Claude Code
4. Claude ti guiderà passo-passo!

---

## 🎯 Template Base (Start Session)

```
Ciao Claude! Sto sviluppando MotoMinder.

Contesto:
- App React Native + Expo + TypeScript per motociclisti italiani
- Stack: Firebase, React Navigation, React Native Reanimated
- Docs: Leggi MOTOMINDER_MASTER_SPEC.md per architettura completa

Oggi voglio lavorare su: [DESCRIZIONE OBIETTIVO]

Prima di iniziare, conferma di aver letto la spec e dimmi:
1. Quali file dovrò creare/modificare
2. Eventuali dipendenze mancanti da installare
3. Possibili problemi da considerare

Procediamo?
```

---

## 📱 FASE 1: AUTENTICAZIONE

### Setup Firebase Auth

```
Implementa Firebase Authentication per MotoMinder.

Stack:
- Firebase v10+
- React Context per state
- TypeScript strict mode

Features richieste:
1. Email/Password auth
2. Google Sign-In (iOS + Android)
3. Apple Sign-In (iOS)
4. Password reset
5. Persistent login

Files da creare:
- src/services/firebase/config.ts (Firebase init)
- src/services/firebase/auth.ts (auth functions)
- src/store/AuthContext.tsx (context + provider)
- src/types/auth.ts (TypeScript interfaces)
- src/screens/auth/LoginScreen.tsx
- src/screens/auth/RegisterScreen.tsx
- src/screens/auth/ForgotPasswordScreen.tsx

Requirements:
- Error handling completo (italiano)
- Loading states
- Form validation con feedback visivo
- Seguire design system da MASTER_SPEC.md

Procediamo passo-passo?
```

### Auth Screens UI

```
Crea UI per schermate auth con design racing theme.

Design specs:
- Dark theme (#121212 background)
- Primary color: #FF6B35 (arancione racing)
- Font: Roboto
- Animazioni smooth con react-native-reanimated

Screens:
1. LoginScreen:
   - Email + Password inputs
   - "Accedi" button
   - "Registrati" link
   - "Password dimenticata?" link
   - Google + Apple buttons

2. RegisterScreen:
   - Nome, Email, Password inputs
   - "Registrati" button
   - Checkbox Terms & Conditions
   - "Hai già un account?" link

3. ForgotPasswordScreen:
   - Email input
   - "Invia link reset" button
   - Success message animation

Requirements:
- Keyboard-avoiding view
- Input validation real-time
- Error messages friendly
- Loading spinners
- Animazioni FadeIn

Crea il primo screen (Login), poi procediamo con gli altri?
```

---

## 🏍️ FASE 2: AGGIUNGI MOTO

### API Integration

```
Implementa integrazione OpenAPI.it per verifica targa.

API: https://api.openapi.it/veicoli/verifica-targa/{targa}
Header: X-API-Key (da .env)

File: src/services/api/vehicleAPI.ts

Functions needed:
1. fetchVehicleData(plate: string): Promise<VehicleData>
   - Normalizza targa (uppercase, no spaces)
   - Call API
   - Parse response
   - Calculate revisione date
   - Calculate bollo amount
   
2. normalizePlateNumber(plate: string): string
   - Remove spaces
   - Uppercase
   - Validate format (2 letters + 3 numbers + 2 letters)
   
3. calculateRevisionDate(lastRevision: Date): Date
   - 4 anni dalla prima immatricolazione
   - Poi ogni 2 anni
   
4. calculateBollo(power: number, region: string): number
   - €1.50/CV fino a 11 CV
   - €3.00/CV oltre 11 CV

Error handling per:
- 404: Targa non trovata
- 429: Rate limit exceeded
- Network errors
- Invalid responses

TypeScript types strict
Tests con Jest

Inizi dal type definitions?
```

### Add Moto Screen

```
Crea screen per aggiungere moto con "magic moment".

File: src/screens/moto/AddMotoScreen.tsx

Flow:
1. Input targa (uppercase keyboard, auto-format)
2. Button "Recupera Dati" → API call
3. Loading animation (spinner + "Sto recuperando i dati...")
4. Success animation → Mostra dati con slide-in effect
5. Form per dettagli extra:
   - Nickname (optional)
   - Km attuali
   - Foto moto (camera/gallery)
6. Button "Salva Moto" → Firestore

UI:
- Card animata per dati recuperati
- Icons per ogni info (brand, model, year, CV)
- Progress bar durante API call
- Success checkmark animation
- Error state friendly

Validations:
- Targa required
- Km number >= 0
- Foto optional

Error handling:
- Targa non trovata → Mostra form manuale
- Network error → Retry button
- API error → Support contact

Usa API da vehicleAPI.ts
Segui design system
Animazioni smooth

Partiamo?
```

---

## 📅 FASE 3: DASHBOARD SCADENZE

### Firestore Schema

```
Setup Firestore per MotoMinder.

Files da creare:
1. src/types/firestore.ts - TypeScript interfaces
2. src/services/firebase/firestore.ts - CRUD functions
3. firestore.rules - Security rules
4. firestore.indexes.json - Required indexes

Collections secondo MASTER_SPEC.md:
- users
- motos (con nested deadlines object)
- maintenanceLog
- costs
- odometerLog
- notificationSchedules

Per ogni collection crea:
- TypeScript interface
- Add function
- Update function
- Delete function
- Get function
- List function (con pagination)

Security rules:
- Users can only access their own data
- Write only with valid auth
- Server timestamp validation

Iniziamo con types e User collection?
```

### Dashboard UI

```
Crea Dashboard (HomeScreen) che mostra scadenze.

File: src/screens/home/HomeScreen.tsx

Layout:
1. Header:
   - Moto selector (dropdown se multiple)
   - User avatar + greeting
   
2. Hero section:
   - Prossima scadenza in big
   - Countdown giorni con colore urgenza
   - Quick action button
   
3. Lista scadenze:
   - Ordinate per urgenza
   - Card per ogni scadenza
   - Colori: rosso (<7d), arancione (<30d), verde (>30d)
   
4. Quick actions bar:
   - "Aggiungi KM"
   - "Log Manutenzione"
   - "Aggiungi Costo"

Components needed:
- MotoSelector
- DeadlineCard (priority!)
- QuickActionButton

DeadlineCard props:
- type: 'bollo' | 'revisione' | 'assicurazione' | 'tagliando'
- expiryDate: Date
- amount?: number
- isPaid?: boolean
- onMarkComplete: () => void

DeadlineCard UI:
- Icon dinamica (receipt, build, shield, settings)
- Titolo
- Data scadenza
- Countdown
- Button "Completato"
- Border colorato a sinistra

Animazioni:
- Cards fade in con stagger
- Tap feedback
- Swipe for actions?

Inizio con DeadlineCard component?
```

---

## 🛠️ FASE 4: FEATURES AVANZATE

### Notifications

```
Implementa sistema notifiche push con Expo.

Files:
- src/services/notifications/notificationService.ts
- Cloud Function: functions/src/sendScheduledNotifications.ts

Features:
1. Request permissions (iOS + Android)
2. Get Expo push token
3. Save token to Firestore
4. Schedule local notifications
5. Schedule cloud notifications
6. Handle notification tap (deep linking)

Local notifications:
- Test immediati durante development
- Scheduled per testing

Cloud notifications:
- Cloud Function runs daily (cron)
- Query notificationSchedules collection
- Send via Expo push API
- Mark as sent

Notification types:
- Scadenza imminente (30d, 15d, 7d)
- Tagliando vicino (1000km before)
- Odometro reminder (every 2 weeks)
- Update app (se nuova versione)

Deep linking:
- notification tap → specific screen
- Data payload con type + motoId

Iniziamo con local notifications per test?
```

### Tracker Costi + Grafici

```
Implementa analytics costi con Victory Native.

File: src/screens/costs/CostAnalyticsScreen.tsx

Metriche da calcolare:
1. Costo totale possesso
2. Costo/km
3. Costo/mese
4. Breakdown per categoria

Grafici:
1. Pie Chart: Distribuzione per categoria
   - Fuel, Maintenance, Insurance, Tax, Other
   - Colori distintivi
   - Percentuali
   
2. Line Chart: Trend nel tempo
   - Asse X: mesi
   - Asse Y: € spesi
   - Multiple lines per categoria
   
3. Bar Chart: Confronto mensile
   - Ultimo 6 mesi
   - Stacked bars per categoria

UI Components:
- StatCard (costo totale, €/km, €/mese)
- ChartCard container
- Filter buttons (1M, 3M, 6M, 1Y, All)
- Export button (CSV, PDF)

Data source:
- costs collection (Firestore)
- Aggregate in real-time or cache?

Performance:
- Use useMemo per calcoli
- Virtualized list se tanti costi
- Skeleton loading

Install:
npm install victory-native

Partiamo da calcoli e StatCards?
```

---

## 🐛 DEBUG & FIX

### Debug Template

```
Ho un problema con [FEATURE/SCREEN].

Errore:
[COPIA ERROR MESSAGE O DESCRIZIONE]

File coinvolto:
[PERCORSO FILE]

Cosa stavo facendo:
[STEPS TO REPRODUCE]

Comportamento atteso:
[COSA DOVREBBE SUCCEDERE]

Comportamento attuale:
[COSA SUCCEDE INVECE]

Codice rilevante:
[PASTE CODE SNIPPET]

Logs:
[PASTE CONSOLE LOGS SE CI SONO]

Hai idea di cosa possa essere?
```

### Performance Issues

```
La mia app è lenta quando [DESCRIZIONE AZIONE].

Screen/Feature: [NOME]
Device: [iOS/Android, versione]

Profiling info:
- FPS drops a: [X fps]
- Render time: [X ms]
- Memory usage: [X MB]

Sospetto che il problema sia:
[TUA TEORIA SE CE L'HAI]

Codice della parte lenta:
[PASTE CODE]

Puoi aiutarmi a ottimizzare?
```

---

## 🧪 TESTING

### Unit Tests

```
Scrivi test per [FILE/FUNCTION].

File to test: [PERCORSO]
Framework: Jest + React Native Testing Library

Test cases necessari:
1. [TEST CASE 1]
2. [TEST CASE 2]
3. [TEST CASE 3]

Requirements:
- Mock API calls
- Mock Firebase
- Test error cases
- Test edge cases
- Coverage > 80%

File test: __tests__/[PERCORSO_SPECCHIATO].test.ts

Segui pattern di test esistenti
Commit con: "test: Add tests for [FEATURE]"

Iniziamo?
```

### Integration Tests

```
Scrivi integration test per [FLOW].

Flow: [DESCRIZIONE FLOW, es. "User registration to first moto added"]

Steps:
1. [STEP 1]
2. [STEP 2]
3. [STEP 3]

Test con Firebase Emulator per:
- Firestore
- Auth
- Storage

File: __tests__/integration/[FLOW_NAME].test.ts

Setup:
- beforeAll: Start emulator, seed data
- afterAll: Stop emulator, cleanup
- beforeEach: Reset state

Asserzioni per ogni step
Timeout appropriati
Error scenarios

Vuoi che ti aiuto con setup emulator?
```

---

## 🚀 DEPLOYMENT

### Build Preparation

```
Prepara app per build production.

Checklist:
1. Version bump in app.json
2. Update release notes
3. Check all .env vars are in EAS secrets
4. Test su device fisici (iOS + Android)
5. Run full test suite
6. Performance audit
7. Security audit

Files da aggiornare:
- app.json (version, buildNumber, versionCode)
- CHANGELOG.md
- Store listings (descrizioni, screenshots)

EAS Build:
- Profile: production
- Platform: all
- Submit to stores: yes

Procediamo con checklist?
```

### Store Submission

```
Prepara submission agli store.

App Store (iOS):
- Screenshots: 6.7" (1290x2796), 6.5" (1242x2688)
- App Icon: 1024x1024
- Preview video (optional)
- Description in italiano
- Keywords
- Privacy policy URL
- Support URL

Play Store (Android):
- Screenshots: Phone (1080x1920), Tablet (2048x1536)
- Feature graphic: 1024x500
- App icon: 512x512
- Description
- Privacy policy

Ho bisogno di:
1. Generare screenshots automaticamente?
2. Scrivere description ottimizzata?
3. Creare privacy policy?

Cosa facciamo per primo?
```

---

## 💡 FEATURE IDEATION

### New Feature

```
Voglio aggiungere una nuova feature: [NOME FEATURE]

Descrizione:
[COSA FA LA FEATURE]

User stories:
- Come utente, voglio [AZIONE] per [BENEFICIO]
- ...

Domande:
1. È fattibile tecnicamente?
2. Quali dependencies servono?
3. Quanto tempo richiede?
4. Impatta altre features?
5. Vale la pena per MVP o post-launch?

Discutiamone prima di implementare?
```

### Refactoring

```
Voglio refactorare [FEATURE/FILE].

Problema attuale:
[COSA NON VA]

File coinvolto:
[PERCORSO]

Obiettivo refactoring:
[COSA VOGLIO OTTENERE]

Vincoli:
- Non rompere features esistenti
- Mantenere tests green
- Migliorare performance
- Code più maintainable

Proposta:
[TUA IDEA SE CE L'HAI]

Hai suggerimenti?
```

---

## 🎓 LEARNING

### Learn New Concept

```
Voglio imparare [CONCETTO/TECNOLOGIA] per usarlo in MotoMinder.

Contesto:
[PERCHÉ TI SERVE]

Cosa voglio fare:
[USE CASE SPECIFICO]

Livello attuale:
[BEGINNER/INTERMEDIATE/ADVANCED]

Puoi spiegarmi:
1. Cos'è e come funziona
2. Esempio semplice
3. Best practices
4. Come applicarlo al mio caso
5. Risorse per approfondire

Iniziamo?
```

### Code Review

```
Puoi revieware questo codice?

File: [PERCORSO]

[PASTE CODE]

Review per:
1. Bug potenziali
2. Performance issues
3. Security concerns
4. Best practices React Native/TypeScript
5. Code style
6. Possibili miglioramenti

Sii brutalmente onesto! 😅
```

---

## 📦 DEPENDENCY MANAGEMENT

### Add New Dependency

```
Voglio aggiungere [LIBRARY].

Use case:
[PERCHÉ TI SERVE]

Alternative considerate:
1. [ALTERNATIVE 1]
2. [ALTERNATIVE 2]

Domande:
1. È la scelta migliore per il mio caso?
2. Compatibile con Expo?
3. Supporta TypeScript?
4. Bundle size impact?
5. Maintained actively?
6. Breaking changes recenti?

Se ok, installazione e setup.
Vuoi aiutarmi a decidere?
```

---

## 🎨 UI/UX IMPROVEMENTS

### Design Feedback

```
Ho creato questo screen ma non mi convince.

Screen: [NOME]
File: [PERCORSO]

[SCREENSHOT SE POSSIBILE]

Cosa non mi piace:
[TUE PERPLESSITÀ]

Design goals:
- Racing theme (dark + orange)
- Smooth animations
- Intuitive UX
- Accessible

Puoi suggerire miglioramenti su:
1. Layout
2. Colori
3. Typography
4. Spacing
5. Animations
6. User flow

Idee?
```

---

## 🔧 MAINTENANCE

### Update Dependencies

```
Voglio aggiornare le dependencies.

Command: npm outdated

[PASTE OUTPUT]

Major updates:
[LISTA]

Concerns:
1. Breaking changes?
2. Migration effort?
3. Test coverage sufficiente?

Strategy:
1. Update patch versions (safe)
2. Update minor versions (review changelogs)
3. Update major versions (test thoroughly)

Possiamo fare update strategy per risk-free process?
```

---

## 💬 Nota Finale

**Come usare questi templates:**

1. **Non copiare ciecamente** - Adatta al tuo caso
2. **Sii specifico** - Più dettagli = risposta migliore
3. **Condividi codice** - Claude non può vedere il tuo schermo
4. **Chiedi chiarimenti** - Se non capisci, chiedi
5. **Iterazione** - Va bene fare domande di followup

**Pro tip:** Salva i tuoi prompt migliori in un file `MY_PROMPTS.md` nel progetto!

---

**Happy prompting! 🚀**
