# 🤖 Claude Session Guide - MotoMinder

**Ultima modifica:** 2024-11-24
**Versione App:** 1.0.0
**Stato:** Milestone 4 completato, Milestone 5 in preparazione

---

## 📌 LEGGI QUESTO FILE ALL'INIZIO DI OGNI SESSIONE

Questo documento contiene **tutto ciò che devi sapere** per continuare lo sviluppo di MotoMinder senza perdere il contesto.

---

## 🎯 Stato Attuale del Progetto

### Milestone Completati ✅

1. **Milestone 1: Autenticazione** ✅
   - Login/Register con Firebase Auth
   - Password reset
   - Custom alert system (no native iOS alerts)
   - Safe area support su tutti gli screen

2. **Milestone 2: Gestione Moto + Dashboard** ✅
   - CRUD completo per moto
   - Sistema "moto principale" (isPrimary flag)
   - Dashboard futuristico per moto principale
   - MotoCard con design moderno
   - Auto-set prima moto come principale

3. **Milestone 3: Dashboard Scadenze** ✅
   - Visualizzazione scadenze con colori urgenza (rosso/giallo/verde)
   - Pull to refresh
   - "Vedi tutte" → navigazione a MotoDetail
   - Calcolo giorni rimanenti automatico

4. **Milestone 4: Odometro** ✅
   - UpdateOdometerScreen per aggiornare km
   - Validazione (km non possono diminuire)
   - Formattazione automatica (22.500 km)
   - Alert tagliando se <1000km al servizio
   - Log automatico in Firestore (`odometerLog` collection)
   - Tastiera con tasto "Fatto" per salvare
   - Bottone presente sia in Dashboard che in MotoDetailScreen

### Milestone In Preparazione 🚧

**Milestone 5: Notifiche Push** (50% completato)
- ✅ Servizio notifiche creato (`src/services/notifications/`)
- ✅ Logica scheduling per scadenze (30, 7, 1, 0 giorni prima)
- ❌ NON ancora integrato nel MotoContext
- ❌ Permessi notifiche non richiesti all'avvio

**Prossimi Step Milestone 5:**
1. Integrare `initializeNotifications()` in App.tsx
2. Chiamare `scheduleAllMotosNotifications()` quando caricano le moto
3. Aggiornare notifiche quando cambiano scadenze
4. Testare notifiche su device reale

### Milestone Rimanenti 📋

- Milestone 6: Costi e Spese
- Milestone 7: Storico Manutenzioni
- Milestone 8: MotoGP Live
- Milestone 9: Community
- Milestone 10: Polish & Release

---

## ⚠️ PROBLEMI CRITICI RICORRENTI

### ❌ PROBLEMA #1: App si rompe e parte da MotoList invece di Dashboard

**Sintomi:**
- Dopo modifiche, app parte da MotoList invece del Dashboard
- BackButton dà errore: "GO_BACK action not handled"
- `primaryMoto` risulta `undefined` anche se esiste

**Causa Root:**
- Errore nei nuovi file che rompe il bundle
- MotoContext non riesce a calcolare `primaryMoto`
- HomeScreen fallback a MotoList quando `primaryMoto === null`

**Logica HomeScreen:**
```typescript
if (!loading) {
  if (primaryMoto) {
    navigation.replace('MotoDashboard');  // ✅ Ha moto principale
  } else {
    navigation.replace('MotoList');       // ❌ Fallback
  }
}
```

**Come Diagnosticare:**
1. Controlla console per errori TypeScript/import
2. Verifica che `primaryMoto = motos.find(m => m.isPrimary) || null` funzioni
3. Controlla che Firestore carichi le moto correttamente

**SOLUZIONE: Workflow Incrementale**
- ✅ Non fare commit giganti
- ✅ Testa con `--clear` dopo ogni modifica
- ✅ Se si rompe, fai `git restore` o `rm` dei nuovi file
- ✅ Analizza con file di test minimi

---

### ❌ PROBLEMA #2: L'utente dice "hai cambiato tutto il layout"

**Cosa è successo:**
- L'utente è stato esplicito: **NON cambiare mai layout/struttura senza richiesta**
- Più volte ho fatto modifiche extra non richieste
- L'utente si è frustrato

**REGOLA D'ORO:**
```
FARE SOLO LE MODIFICHE RICHIESTE
NON aggiungere "miglioramenti" non richiesti
NON fare refactoring spontaneo
NON cambiare design esistente
```

**Esempio Sbagliato:**
```
User: "Aggiungi solo il type OdometerReading"
Claude: *aggiunge type + modifica header + cambia colori + refactoring*
```

**Esempio Corretto:**
```
User: "Aggiungi solo il type OdometerReading"
Claude: *aggiunge SOLO il type, nient'altro*
```

---

## ✅ WORKFLOW DI SVILUPPO CHE FUNZIONA

### Step-by-Step Development Process

Quando implementi una nuova feature:

#### 1. Analizza Richiesta
- Leggi ATTENTAMENTE cosa vuole l'utente
- Se poco chiaro, fai domande PRIMA di codare
- Non assumere nulla

#### 2. Pianifica in Mini-Step
```
Esempio Milestone 4:
- Step 1: Types only → test → commit
- Step 2: Firestore functions → test → commit
- Step 3: Screen (senza navigation) → test → commit
- Step 4: Navigation + button → test → commit
```

#### 3. Codifica UN Step alla Volta
- **NO COMMIT** prima del test
- Modifiche minime e isolate
- Nessun extra non richiesto

#### 4. User Testa con --clear
```bash
npx expo start --tunnel --clear
```
- ✅ Funziona → commit e prossimo step
- ❌ Si rompe → rollback e diagnosi

#### 5. Commit con Messaggio Dettagliato
```bash
git commit -m "feat: Description (Milestone X - Step Y/Z)

What was done:
- Change 1
- Change 2

TESTED with --clear, works perfectly.
"
```

### Comandi Utili

```bash
# Start con clear cache
npx expo start --tunnel --clear

# Check git status
git status --short

# Show recent commits
git log --oneline -10

# Revert uncommitted changes
git restore <file>
git restore .

# Remove untracked files
rm -rf src/path/to/new/folder

# Hard reset to previous commit
git reset --hard HEAD~1

# Show diff
git diff
git diff <file>
```

---

## 🏗️ ARCHITETTURA APP

### Struttura Directory

```
src/
├── components/
│   ├── common/          # BackButton, Button, Input, CustomAlert, etc.
│   └── moto/            # MotoCard
├── constants/           # Colors, Typography, Spacing, etc.
├── navigation/
│   ├── types.ts         # Navigation types
│   ├── MainNavigator.tsx
│   └── AuthNavigator.tsx
├── screens/
│   ├── auth/            # Login, Register, ForgotPassword
│   ├── home/            # HomeScreen (redirect logic)
│   ├── moto/            # MotoList, MotoDetail, MotoDashboard, AddMoto
│   └── odometer/        # UpdateOdometerScreen
├── services/
│   ├── firebase/
│   │   ├── config.ts
│   │   ├── auth.ts
│   │   ├── firestore.ts
│   │   └── firestoreUtils.ts
│   └── notifications/   # notificationService, deadlineNotifications
├── store/               # Context API
│   ├── AuthContext.tsx
│   ├── MotoContext.tsx
│   └── AlertContext.tsx
├── types/
│   ├── auth.ts
│   └── moto.ts          # Moto, OdometerReading, Deadlines, etc.
└── utils/               # Validation, helpers
```

### Navigation Flow

```
App Start
  ↓
AuthContext loads
  ↓
User logged in?
  ├─ NO → AuthNavigator (Login/Register)
  └─ YES → MainNavigator
             ↓
           HomeScreen (redirect logic)
             ↓
           Has primaryMoto?
             ├─ YES → MotoDashboard
             └─ NO  → MotoList
```

### Key Concepts

**1. Primary Moto System**
- Solo una moto può essere `isPrimary: true`
- Prima moto aggiunta è auto-set come principale
- `primaryMoto` calcolato in MotoContext: `motos.find(m => m.isPrimary) || null`

**2. Custom Alert System**
- NO native `Alert.alert()`
- Custom `CustomAlert` component in `AlertContext`
- `showSuccess()`, `showError()`, `showConfirm()`
- Alert chiude PRIMA, callback esegue DOPO 350ms

**3. Safe Area**
- Tutti gli screen usano `SafeAreaView` da `react-native-safe-area-context`
- `edges={['top']}` per rispettare notch/status bar

**4. Firestore Collections**
```
motos/                # Motorcycles
  {motoId}/
    - userId
    - plateNumber
    - brand, model, year
    - currentKm
    - isPrimary
    - deadlines {}
    - addedAt, updatedAt

odometerLog/          # KM readings history
  {readingId}/
    - motoId
    - userId
    - km
    - date
```

**5. Type System**
- `Moto` - motorcycle document
- `MotoCreationData` - data to create new moto
- `MotoUpdateData` - partial update data
- `OdometerReading` - km log entry
- `Deadlines` - revisione, assicurazione, tagliando

---

## 🚀 PROSSIMI STEP DETTAGLIATI

### Immediate: Completare Milestone 5 (Notifiche)

**Step 1: Integrare initializeNotifications in App.tsx**
```typescript
// In App.tsx, dopo AuthContext
import { initializeNotifications } from '@services/notifications';

useEffect(() => {
  if (user) {
    initializeNotifications();
  }
}, [user]);
```

**Step 2: Schedulare notifiche quando caricano le moto**
```typescript
// In MotoContext.tsx, dopo refreshMotos()
import { scheduleAllMotosNotifications } from '@services/notifications';

// In refreshMotos(), dopo setMotos(userMotos)
await scheduleAllMotosNotifications(userMotos);
```

**Step 3: Aggiornare notifiche quando cambiano scadenze**
- In `updateMoto()` dopo update
- In `addMoto()` dopo creazione
- In `deleteMoto()` cancellare notifiche

**Step 4: Test su device reale**
- Notifiche locali non funzionano su Expo Go web
- Serve device fisico o emulatore

### Future: Milestone 6 (Costi e Spese)

**Features:**
- Tracciare rifornimenti carburante
- Costi manutenzione
- Altri costi (assicurazione, bollo, tagliando)
- Grafici spesa mensile/annuale
- Calcolo costo al km

**Architettura:**
- Collection `costs` in Firestore
- CostType: fuel, maintenance, insurance, tax, service, other
- Link a moto tramite `motoId`

### Future: Milestone 7 (Storico Manutenzioni)

**Features:**
- Log interventi manutenzione
- Note dettagliate per ogni intervento
- Photo upload (optional)
- Timeline visuale
- Reminder prossimo tagliando

---

## 📝 CHECKLIST PER OGNI SESSIONE

### All'Inizio della Sessione

- [ ] Leggi questo file completamente
- [ ] Esegui `git log --oneline -10` per vedere ultimi commit
- [ ] Esegui `git status` per vedere se ci sono modifiche uncommitted
- [ ] Verifica che l'app parta: `npx expo start --tunnel --clear`
- [ ] Controlla MotoList e Dashboard funzionino
- [ ] Chiedi all'utente cosa vuole implementare

### Durante lo Sviluppo

- [ ] Fai SOLO le modifiche richieste
- [ ] Lavora in mini-step testabili
- [ ] NO commit prima del test utente
- [ ] Test con `--clear` dopo ogni modifica
- [ ] Se si rompe, rollback immediato

### Prima di Chiudere Sessione

- [ ] Tutti i test passano
- [ ] Commit con messaggi descrittivi
- [ ] Aggiorna questo file se necessario
- [ ] Documenta eventuali nuovi problemi scoperti

---

## 🔒 REGOLE IMMUTABILI

1. **NON modificare layout/struttura senza esplicita richiesta**
2. **SEMPRE testare con `--clear` dopo modifiche**
3. **NO commit giganti** - lavorare in step incrementali
4. **Rollback immediato** se qualcosa si rompe
5. **Fare SOLO ciò che l'utente chiede** - niente extra
6. **HomeScreen e navigation sono CRITICI** - non toccare senza necessità
7. **CustomAlert al posto di Alert.alert()** - sempre
8. **SafeAreaView su tutti gli screen** - sempre `edges={['top']}`

---

## 💡 Tips & Tricks

### Debugging "App si rompe"

1. Controlla console per errori
2. Verifica import corretti
3. Testa con file vuoto/minimo
4. Aggiungi funzionalità gradualmente
5. Se importi librerie esterne, verifica configurazione

### TypeScript Errors

- Controllare `tsconfig.json` path aliases
- Verificare export/import corretti
- Usare `any` SOLO se necessario (con commento esplicativo)

### Firestore Timestamp

Sempre gestire sia Timestamp che Date:
```typescript
const toDate = (dateValue: any): Date => {
  if (dateValue?.toDate) return dateValue.toDate();
  if (dateValue instanceof Date) return dateValue;
  return new Date(dateValue);
};
```

### Performance

- Client-side sorting per evitare composite indexes
- Limit query results quando possibile
- Cache dei dati nel Context

---

## 📚 RISORSE UTILI

**Documentazione:**
- Expo: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
- Firebase: https://firebase.google.com/docs
- Expo Notifications: https://docs.expo.dev/versions/latest/sdk/notifications/

**File Chiave da Conoscere:**
- `src/store/MotoContext.tsx` - Gestione stato moto
- `src/navigation/MainNavigator.tsx` - Stack navigation
- `src/screens/home/HomeScreen.tsx` - Logica redirect
- `src/services/firebase/firestore.ts` - CRUD Firestore
- `package.json` - Dipendenze (Expo ~54.0)

---

## 📞 COMUNICAZIONE CON L'UTENTE

**Tono:**
- Professionale ma amichevole
- Conciso - non dilungarsi
- NO emoji eccessivi (solo quando appropriato)
- Italiano (l'utente è italiano)

**Quando proporre feature:**
- Solo se strettamente correlato a task corrente
- Chiedere PRIMA di implementare
- Non assumere nulla

**Se incerto:**
- Meglio chiedere che assumere
- L'utente preferisce precisione a velocità
- Va bene ammettere "non so, analizziamo insieme"

---

## 🎓 LEZIONI APPRESE

1. **Workflow incrementale funziona** - 4 step testati per Milestone 4, zero problemi
2. **`--clear` è critico** - cache può nascondere problemi
3. **Non toccare HomeScreen/navigation senza necessità** - fonte di bug ricorrenti
4. **L'utente sa cosa vuole** - rispettare le sue decisioni
5. **Testing diagnostico funziona** - file test.ts per isolare problemi
6. **Commit frequenti > commit giganti** - più facile rollback

---

## ✅ SUCCESS CRITERIA

**Una sessione è di successo se:**
- [ ] Implementato ciò che l'utente ha chiesto
- [ ] SOLO ciò che l'utente ha chiesto (niente extra)
- [ ] App funziona con `--clear`
- [ ] Commit fatto con messaggio chiaro
- [ ] L'utente è soddisfatto
- [ ] Questo file è aggiornato

---

**Fine del documento. Buona fortuna Claude del futuro! 🚀**
