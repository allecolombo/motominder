# 🏍️ MotoMinder - Landing Page

Landing page di validazione per MotoMinder - l'app che gestisce scadenze e manutenzione della tua moto.

## 📁 Struttura File

```
motominder/
├── index.html      # Pagina HTML principale
├── styles.css      # Stili CSS (tema racing dark)
├── script.js       # JavaScript (traduzioni, form, animazioni)
├── README.md       # Questo file
└── MARKETING.md    # Post Facebook e materiali marketing
```

## ✨ Caratteristiche

- 🌐 **Bilingue IT/EN** - Switch lingua nel nav
- 📱 **100% Responsive** - Ottimizzato mobile
- 🎨 **Design Racing** - Tema scuro con accenti arancioni
- 📧 **Formspree Ready** - Raccolta email integrata
- ⚡ **Animazioni** - Scroll animations, hover effects
- 🔍 **SEO Ready** - Meta tags, Open Graph

---

## 🚀 Setup Rapido (5 minuti)

### Step 1: Configura Formspree

1. Vai su [formspree.io](https://formspree.io)
2. Accedi al tuo account (hai già registrato MotoMinder)
3. Copia il **Form ID** (es: `mabcdefg`)
4. Apri `index.html` e cerca `YOUR_FORM_ID` (appare **2 volte**)
5. Sostituisci entrambi con il tuo Form ID:
   ```html
   action="https://formspree.io/f/mabcdefg"
   ```

### Step 2: Testa in locale

1. Metti tutti i file nella stessa cartella
2. Doppio click su `index.html`
3. Verifica che tutto funzioni (switch lingua, animazioni)
4. Il form non funzionerà finché non è online

---

## 🌐 Deploy su GitHub Pages (GRATIS)

### 1. Crea Repository GitHub

```bash
# Vai nella cartella motominder
cd motominder

# Inizializza Git
git init
git add .
git commit -m "Initial MotoMinder landing"
```

### 2. Push su GitHub

1. Vai su [github.com](https://github.com) → New Repository
2. Nome: `motominder`
3. Public ✅
4. NON aggiungere README (lo hai già)
5. Create repository

```bash
git remote add origin https://github.com/TUO_USERNAME/motominder.git
git branch -M main
git push -u origin main
```

### 3. Attiva GitHub Pages

1. Vai in **Settings** → **Pages**
2. Source: `Deploy from a branch`
3. Branch: `main` / `/ (root)`
4. **Save**
5. Aspetta 2-3 minuti
6. Il sito sarà live su: `https://TUO_USERNAME.github.io/motominder/`

---

## 🔗 Collega Dominio Custom (motominder.it)

### Su GitHub:

1. Settings → Pages → Custom domain
2. Inserisci: `motominder.it`
3. Save (vedrai "DNS check in progress")

### Su Aruba/Register (dove hai il dominio):

Aggiungi questi record DNS:

| Tipo | Nome | Valore |
|------|------|--------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | TUO_USERNAME.github.io |

⏳ Aspetta 10-30 minuti per la propagazione DNS.

---

## 🔧 Alternativa: Deploy su Netlify

Ancora più semplice:

1. Vai su [netlify.com](https://netlify.com)
2. Sign up (gratis)
3. Drag & drop la cartella `motominder`
4. Done! Sito live in 30 secondi
5. Collega dominio custom nelle settings

---

## 📧 Test Form Formspree

Dopo il deploy:

1. Vai sulla landing page live
2. Inserisci una email test
3. Submit
4. Controlla su Formspree che sia arrivata
5. ✅ Se funziona, sei pronto!

---

## 📊 Analytics (Opzionale)

Per tracciare le visite, aggiungi Google Analytics:

1. Crea account su [analytics.google.com](https://analytics.google.com)
2. Crea property per motominder.it
3. Copia il codice tracking
4. Incollalo prima di `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎯 Obiettivi Validation

| Metrica | Target | Timeframe |
|---------|--------|-----------|
| Email raccolte | 100+ | 7-14 giorni |
| Visite | 500+ | 7-14 giorni |
| Conversion rate | 15-20% | - |

**Se raggiungi 100 email → procedi con lo sviluppo MVP!**

---

## 📝 Modifiche Comuni

### Cambiare i colori

In `styles.css`, modifica le variabili CSS:

```css
:root {
    --primary: #FF6B00;        /* Arancione principale */
    --primary-glow: rgba(255, 107, 0, 0.4);
    --bg-dark: #0A0A0B;        /* Sfondo scuro */
    --success: #00D26A;        /* Verde successo */
}
```

### Cambiare i testi

In `script.js`, modifica l'oggetto `translations`:

```javascript
const translations = {
    it: {
        hero_title_1: "LA TUA MOTO,",
        // ... altri testi
    },
    en: {
        hero_title_1: "YOUR MOTORCYCLE,",
        // ... altri testi
    }
};
```

### Aggiungere sezioni

Copia la struttura di una sezione esistente e modifica contenuto/stili.

---

## 🆘 Troubleshooting

**Il form non funziona:**
- Verifica che il Form ID sia corretto (2 occorrenze)
- Controlla che il sito sia online (non in locale)
- Verifica su Formspree che il form sia attivo

**Gli stili non si caricano:**
- Verifica che `styles.css` sia nella stessa cartella di `index.html`
- Controlla il nome file (case sensitive)

**Le animazioni non funzionano:**
- Verifica che `script.js` sia nella stessa cartella
- Apri la console del browser (F12) per vedere errori

**Il dominio non funziona:**
- Aspetta 24-48 ore per propagazione DNS
- Verifica i record DNS su [dnschecker.org](https://dnschecker.org)

---

## 📞 Supporto

Per domande o problemi, ricorda:
- `index.html` = struttura pagina
- `styles.css` = aspetto visivo
- `script.js` = funzionalità e traduzioni

Buona fortuna con MotoMinder! 🏍️🚀
