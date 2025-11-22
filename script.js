/* ==========================================
   MOTOMINDER V2 - SCRIPT
   Premium landing page interactions
   ========================================== */

// ==========================================
// TRANSLATIONS
// ==========================================

const translations = {
    it: {
        // Nav
        nav_features: "Funzionalità",
        nav_how: "Come funziona",
        
        // Hero
        badge: "Early Access - Posti Limitati",
        hero_line1: "L'APP DEFINITIVA PER",
        hero_line2: "OGNI MOTOCICLISTA",
        hero_subtitle: "Scadenze, manutenzioni, costi e MotoGP. Tutto quello che ti serve per la tua moto, in un'unica app. Inserisci la targa e il resto è magia.",
        hero_feat_1: "Promemoria WhatsApp",
        hero_feat_2: "Scheda tecnica completa",
        hero_feat_3: "Diario manutenzioni",
        hero_feat_4: "100% Gratuita",
        email_placeholder: "La tua email",
        cta_btn: "Unisciti alla Waitlist",
        form_note: "Zero spam. Solo accesso anticipato.",
        early_count: "Già",
        early_count_2: "motociclisti in lista",
        success_msg: "Perfetto! Sei nella lista. Ti contatteremo presto.",
        
        // Floating cards
        float_whatsapp: "Promemoria inviato!",
        float_motogp: "GP Valencia - Dom 14:00",
        float_cost: "€0.12/km questo mese",
        
        // App preview
        app_deadlines: "Prossime scadenze",
        app_see_all: "Vedi tutte",
        app_bollo: "Bollo",
        app_tagliando: "Tagliando",
        app_insurance: "Assicurazione",
        app_days_5: "5 giorni",
        app_km_left: "2.600 km",
        app_months_5: "5 mesi",
        
        // Features
        features_label: "Funzionalità",
        features_title: "TUTTO IN UN'UNICA APP",
        features_subtitle: "Non solo promemoria. MotoMinder è il compagno digitale che ogni motociclista merita.",
        
        feat_1_title: "Scadenze & Promemoria",
        feat_1_desc: "Bollo, revisione, assicurazione, tagliandi. Inserisci la targa e recuperiamo tutto automaticamente. Ricevi promemoria su WhatsApp 30, 15 e 7 giorni prima.",
        feat_1_tag_1: "Auto-sync dalla targa",
        feat_1_tag_2: "WhatsApp",
        feat_1_tag_3: "Multi-moto",
        
        feat_2_title: "Scheda Tecnica Completa",
        feat_2_desc: "Tutti i dati della tua moto a portata di mano. Potenza, cilindrata, peso, omologazione, anno. Perfetto da mostrare agli amici o per la rivendita.",
        feat_2_tag_1: "Dati ufficiali",
        feat_2_tag_2: "Export PDF",
        feat_2_tag_3: "Storico proprietà",
        
        feat_3_title: "Diario Manutenzioni",
        feat_3_desc: "Tieni traccia di ogni intervento: cambio olio, gomme, pastiglie, tagliandi. Con date, km e costi. Prezioso per te e per chi comprerà la tua moto.",
        feat_3_tag_1: "Storico completo",
        feat_3_tag_2: "Allega ricevute",
        feat_3_tag_3: "Valore rivendita",
        
        feat_4_title: "Tracker Costi",
        feat_4_desc: "Quanto ti costa davvero la tua moto? Benzina, assicurazione, manutenzioni, bollo. Scopri il costo al km e quanto spendi ogni mese.",
        feat_4_tag_1: "Costo/km",
        feat_4_tag_2: "Grafici",
        feat_4_tag_3: "Report annuale",
        
        feat_5_title: "MotoGP & News",
        feat_5_desc: "Resta connesso con il mondo delle corse. Calendario gare, orari, classifiche piloti e costruttori. Tutto aggiornato in tempo reale per non perderti nemmeno una gara.",
        feat_5_tag_1: "Calendario GP",
        feat_5_tag_2: "Classifiche live",
        feat_5_tag_3: "Notifiche gara",
        feat_5_tag_4: "News",
        
        motogp_next: "Prossimo GP",
        
        // Stats
        stat_1: "Motociclisti in Italia",
        stat_2: "Dimentica una scadenza/anno",
        stat_3: "Multa media revisione",
        stat_4: "Costo MotoMinder Base",
        
        // How it works
        how_label: "Come Funziona",
        how_title: "PRONTO IN 30 SECONDI",
        how_subtitle: "Niente registrazioni complicate. Inserisci la targa e sei operativo.",
        step_1_title: "Inserisci la Targa",
        step_1_desc: "Digita la targa della tua moto. Recuperiamo automaticamente marca, modello, anno e tutte le scadenze.",
        step_2_title: "Collega WhatsApp",
        step_2_desc: "Un click per connettere il tuo numero. Riceverai promemoria dove li leggi sicuramente.",
        step_3_title: "Goditi la Strada",
        step_3_desc: "Ci pensiamo noi al resto. Promemoria, manutenzioni, costi. Tu concentrati solo sul piacere di guidare.",
        
        // CTA
        cta_title: "UNISCITI AGLI EARLY ADOPTERS",
        cta_subtitle: "Sii tra i primi a provare MotoMinder. Accesso prioritario e feature esclusive per chi si iscrive ora.",
        
        // Footer
        footer_privacy: "Privacy",
        footer_terms: "Termini",
        footer_contact: "Contatti",
        footer_rights: "Tutti i diritti riservati."
    },
    en: {
        // Nav
        nav_features: "Features",
        nav_how: "How it works",
        
        // Hero
        badge: "Early Access - Limited Spots",
        hero_line1: "THE ULTIMATE APP FOR",
        hero_line2: "EVERY MOTORCYCLIST",
        hero_subtitle: "Deadlines, maintenance, costs and MotoGP. Everything you need for your bike, in one app. Enter your plate and the rest is magic.",
        hero_feat_1: "WhatsApp Reminders",
        hero_feat_2: "Complete specs",
        hero_feat_3: "Maintenance log",
        hero_feat_4: "100% Free",
        email_placeholder: "Your email",
        cta_btn: "Join the Waitlist",
        form_note: "Zero spam. Early access only.",
        early_count: "Already",
        early_count_2: "bikers on the list",
        success_msg: "Perfect! You're on the list. We'll contact you soon.",
        
        // Floating cards
        float_whatsapp: "Reminder sent!",
        float_motogp: "Valencia GP - Sun 2PM",
        float_cost: "€0.12/km this month",
        
        // App preview
        app_deadlines: "Upcoming deadlines",
        app_see_all: "See all",
        app_bollo: "Road Tax",
        app_tagliando: "Service",
        app_insurance: "Insurance",
        app_days_5: "5 days",
        app_km_left: "2,600 km",
        app_months_5: "5 months",
        
        // Features
        features_label: "Features",
        features_title: "ALL IN ONE APP",
        features_subtitle: "Not just reminders. MotoMinder is the digital companion every motorcyclist deserves.",
        
        feat_1_title: "Deadlines & Reminders",
        feat_1_desc: "Road tax, inspection, insurance, services. Enter your plate and we fetch everything automatically. Get WhatsApp reminders 30, 15 and 7 days before.",
        feat_1_tag_1: "Auto-sync from plate",
        feat_1_tag_2: "WhatsApp",
        feat_1_tag_3: "Multi-bike",
        
        feat_2_title: "Complete Tech Specs",
        feat_2_desc: "All your bike's data at your fingertips. Power, displacement, weight, emissions class, year. Perfect to show friends or for resale.",
        feat_2_tag_1: "Official data",
        feat_2_tag_2: "PDF Export",
        feat_2_tag_3: "Ownership history",
        
        feat_3_title: "Maintenance Log",
        feat_3_desc: "Track every service: oil changes, tires, brake pads, tune-ups. With dates, km and costs. Valuable for you and future buyers.",
        feat_3_tag_1: "Complete history",
        feat_3_tag_2: "Attach receipts",
        feat_3_tag_3: "Resale value",
        
        feat_4_title: "Cost Tracker",
        feat_4_desc: "How much does your bike really cost? Fuel, insurance, maintenance, taxes. Discover your cost per km and monthly spending.",
        feat_4_tag_1: "Cost/km",
        feat_4_tag_2: "Charts",
        feat_4_tag_3: "Annual report",
        
        feat_5_title: "MotoGP & News",
        feat_5_desc: "Stay connected with racing. Race calendar, times, rider and constructor standings. All updated in real-time so you never miss a race.",
        feat_5_tag_1: "GP Calendar",
        feat_5_tag_2: "Live standings",
        feat_5_tag_3: "Race alerts",
        feat_5_tag_4: "News",
        
        motogp_next: "Next GP",
        
        // Stats
        stat_1: "Motorcyclists in Italy",
        stat_2: "Forget a deadline/year",
        stat_3: "Average inspection fine",
        stat_4: "MotoMinder Basic cost",
        
        // How it works
        how_label: "How It Works",
        how_title: "READY IN 30 SECONDS",
        how_subtitle: "No complicated signups. Enter your plate and you're good to go.",
        step_1_title: "Enter Your Plate",
        step_1_desc: "Type your bike's plate. We automatically fetch make, model, year and all deadlines.",
        step_2_title: "Connect WhatsApp",
        step_2_desc: "One click to connect your number. Get reminders where you'll actually see them.",
        step_3_title: "Enjoy the Ride",
        step_3_desc: "We handle the rest. Reminders, maintenance, costs. You just focus on the joy of riding.",
        
        // CTA
        cta_title: "JOIN THE EARLY ADOPTERS",
        cta_subtitle: "Be among the first to try MotoMinder. Priority access and exclusive features for early signups.",
        
        // Footer
        footer_privacy: "Privacy",
        footer_terms: "Terms",
        footer_contact: "Contact",
        footer_rights: "All rights reserved."
    }
};

let currentLang = 'it';

// ==========================================
// LANGUAGE SWITCHER
// ==========================================

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // Update buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Store preference
    localStorage.setItem('motominder-lang', lang);
}

function initLanguage() {
    const savedLang = localStorage.getItem('motominder-lang');
    if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
    } else {
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === 'en') {
            setLanguage('en');
        }
    }
}

// Language button listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// ==========================================
// FORM HANDLING
// ==========================================

function handleFormSubmit(formId, successId) {
    const form = document.getElementById(formId);
    const successMessage = document.getElementById(successId);
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('.btn-cta');
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (!email || !email.includes('@')) {
            emailInput.focus();
            return;
        }
        
        button.classList.add('loading');
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    email: email,
                    language: currentLang,
                    source: form.querySelector('input[name="source"]')?.value || 'unknown',
                    timestamp: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                button.classList.remove('loading');
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Update counter
                const counter = document.getElementById('counter');
                if (counter) {
                    const currentCount = parseInt(counter.textContent);
                    counter.textContent = currentCount + 1;
                }
                
                // Track conversion
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'signup', {
                        'event_category': 'engagement',
                        'event_label': 'waitlist'
                    });
                }
                
                console.log('✅ Email collected:', email);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('❌ Error:', error);
            button.classList.remove('loading');
            
            alert(currentLang === 'it' 
                ? 'Errore nell\'invio. Riprova tra poco.' 
                : 'Submission error. Please try again.');
        }
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function initScrollAnimations() {
    // Feature cards
    document.querySelectorAll('.feature-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Step cards
    document.querySelectorAll('.step-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(el);
    });

    // Stats
    document.querySelectorAll('.stat-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .feature-card.visible,
    .step-card.visible,
    .stat-item.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ==========================================
// COUNTER ANIMATION
// ==========================================

function initCounter() {
    const counter = document.getElementById('counter');
    if (!counter) return;
    
    // Random starting number between 100-200 for social proof
    const startNum = Math.floor(Math.random() * 100) + 100;
    counter.textContent = startNum;
    
    // Occasionally increment to show activity
    setInterval(() => {
        if (Math.random() > 0.7) {
            const current = parseInt(counter.textContent);
            counter.textContent = current + 1;
        }
    }, 30000);
}

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    handleFormSubmit('heroForm', 'successMessage');
    handleFormSubmit('ctaForm', 'successMessageCta');
    initScrollAnimations();
    initCounter();
    
    console.log('🏍️ MotoMinder V2 initialized');
});
