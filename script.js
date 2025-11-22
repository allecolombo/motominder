/* ==========================================
   MOTOMINDER - SCRIPT
   Landing page per validazione
   ========================================== */

// ==========================================
// TRANSLATIONS
// ==========================================

const translations = {
    it: {
        badge: "Disponibile a breve",
        hero_title_1: "LA TUA MOTO,",
        hero_title_2: "SEMPRE SOTTO CONTROLLO",
        hero_description: "Non dimenticare mai più bollo, revisione e tagliando. Inserisci la targa, ricevi promemoria intelligenti su WhatsApp. Gratis.",
        email_placeholder: "La tua email",
        cta_button: "Avvisami al lancio",
        form_note: "Niente spam. Solo notifica al lancio.",
        success_message: "Perfetto! Ti avviseremo al lancio di MotoMinder.",
        floating_whatsapp: "Promemoria WhatsApp",
        floating_targa: "Inserisci targa",
        card_bollo: "Bollo",
        card_bollo_date: "Scade: 31 Gen 2025",
        card_revisione: "Revisione",
        card_revisione_date: "Scade: 15 Mar 2025",
        card_insurance: "Assicurazione",
        card_insurance_date: "Scade: 20 Giu 2025",
        badge_urgent: "Urgente",
        badge_soon: "Prossima",
        badge_ok: "OK",
        features_title: "TUTTO SOTTO CONTROLLO",
        features_subtitle: "Una sola app per gestire tutte le scadenze della tua moto. Semplice, veloce, affidabile.",
        feature_1_title: "Inserisci la Targa",
        feature_1_desc: "Digita la targa della tua moto e recuperiamo automaticamente tutti i dati: marca, modello, scadenze e intervalli di manutenzione.",
        feature_2_title: "Promemoria WhatsApp",
        feature_2_desc: "Ricevi notifiche intelligenti direttamente su WhatsApp prima di ogni scadenza. Non perderai mai più una data importante.",
        feature_3_title: "Piano Manutenzione",
        feature_3_desc: "Piani di manutenzione specifici per il tuo modello di moto. Tagliandi, cambio olio, pastiglie freni - tutto tracciato.",
        how_title: "COME FUNZIONA",
        how_subtitle: "Tre semplici passaggi per non dimenticare mai più nulla.",
        step_1_title: "Registrati e inserisci la targa",
        step_1_desc: "Crea il tuo account in 30 secondi e aggiungi la targa della tua moto. Recuperiamo automaticamente tutti i dati del veicolo.",
        step_2_title: "Collega WhatsApp",
        step_2_desc: "Connetti il tuo numero WhatsApp per ricevere promemoria direttamente nell'app che usi ogni giorno.",
        step_3_title: "Rilassati, ci pensiamo noi",
        step_3_desc: "Ricevi notifiche automatiche 30, 15 e 7 giorni prima di ogni scadenza. Bollo, revisione, assicurazione, tagliandi - tutto coperto.",
        stat_1: "Motociclisti in Italia",
        stat_2: "Dimentica il bollo ogni anno",
        stat_3: "Gratis per sempre (base)",
        cta_title: "PRONTO A PARTIRE?",
        cta_description: "Unisciti alla lista d'attesa e sii tra i primi a provare MotoMinder. Accesso prioritario garantito.",
        footer_rights: "Tutti i diritti riservati.",
        footer_privacy: "Privacy",
        footer_terms: "Termini",
        footer_contact: "Contatti"
    },
    en: {
        badge: "Coming soon",
        hero_title_1: "YOUR MOTORCYCLE,",
        hero_title_2: "ALWAYS UNDER CONTROL",
        hero_description: "Never forget road tax, inspection, or service again. Enter your plate, receive smart reminders via WhatsApp. Free.",
        email_placeholder: "Your email",
        cta_button: "Notify me at launch",
        form_note: "No spam. Just launch notification.",
        success_message: "Perfect! We'll notify you when MotoMinder launches.",
        floating_whatsapp: "WhatsApp Reminders",
        floating_targa: "Enter plate",
        card_bollo: "Road Tax",
        card_bollo_date: "Expires: Jan 31, 2025",
        card_revisione: "Inspection",
        card_revisione_date: "Expires: Mar 15, 2025",
        card_insurance: "Insurance",
        card_insurance_date: "Expires: Jun 20, 2025",
        badge_urgent: "Urgent",
        badge_soon: "Soon",
        badge_ok: "OK",
        features_title: "EVERYTHING UNDER CONTROL",
        features_subtitle: "One app to manage all your motorcycle deadlines. Simple, fast, reliable.",
        feature_1_title: "Enter Your Plate",
        feature_1_desc: "Type your motorcycle plate and we automatically retrieve all data: make, model, deadlines, and maintenance intervals.",
        feature_2_title: "WhatsApp Reminders",
        feature_2_desc: "Receive smart notifications directly on WhatsApp before every deadline. You'll never miss an important date again.",
        feature_3_title: "Maintenance Plan",
        feature_3_desc: "Maintenance plans specific to your motorcycle model. Services, oil changes, brake pads - all tracked.",
        how_title: "HOW IT WORKS",
        how_subtitle: "Three simple steps to never forget anything again.",
        step_1_title: "Sign up and enter your plate",
        step_1_desc: "Create your account in 30 seconds and add your motorcycle plate. We automatically retrieve all vehicle data.",
        step_2_title: "Connect WhatsApp",
        step_2_desc: "Connect your WhatsApp number to receive reminders directly in the app you use every day.",
        step_3_title: "Relax, we've got you",
        step_3_desc: "Receive automatic notifications 30, 15, and 7 days before every deadline. Road tax, inspection, insurance, services - all covered.",
        stat_1: "Motorcyclists in Italy",
        stat_2: "Forget road tax every year",
        stat_3: "Free forever (basic)",
        cta_title: "READY TO RIDE?",
        cta_description: "Join the waitlist and be among the first to try MotoMinder. Priority access guaranteed.",
        footer_rights: "All rights reserved.",
        footer_privacy: "Privacy",
        footer_terms: "Terms",
        footer_contact: "Contact"
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

// Initialize language from localStorage or browser
function initLanguage() {
    const savedLang = localStorage.getItem('motominder-lang');
    if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
    } else {
        // Detect browser language
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === 'en') {
            setLanguage('en');
        }
        // Default is already Italian
    }
}

// Event listeners for language buttons
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
        
        const button = form.querySelector('.btn-primary');
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Validate email
        if (!email || !email.includes('@')) {
            emailInput.focus();
            return;
        }
        
        // Add loading state
        button.classList.add('loading');
        
        try {
            // Send to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    email: email,
                    language: currentLang,
                    source: 'motominder-landing',
                    timestamp: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                // Show success
                button.classList.remove('loading');
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Track conversion (if analytics is set up)
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
            
            // Show error message
            alert(currentLang === 'it' 
                ? 'Errore nell\'invio. Riprova tra poco.' 
                : 'Submission error. Please try again.');
        }
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and steps
function initScrollAnimations() {
    document.querySelectorAll('.feature-card, .step').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    handleFormSubmit('signupForm', 'successMessage');
    handleFormSubmit('signupFormBottom', 'successMessageBottom');
    initScrollAnimations();
    
    console.log('🏍️ MotoMinder landing page initialized');
});
