/**
 * Error Message Utilities
 * Maps Firebase error codes to user-friendly Italian messages
 */

import { FirebaseAuthError } from '@types';

/**
 * Firebase Auth Error Messages (Italian)
 */
export const firebaseErrorMessages: Record<string, string> = {
  // Email/Password errors
  [FirebaseAuthError.EMAIL_EXISTS]:
    'Questa email è già registrata. Prova ad accedere o usa un\'altra email.',
  [FirebaseAuthError.INVALID_EMAIL]:
    'L\'indirizzo email non è valido. Controlla e riprova.',
  [FirebaseAuthError.WEAK_PASSWORD]:
    'La password è troppo debole. Usa almeno 8 caratteri con maiuscole e numeri.',
  [FirebaseAuthError.USER_NOT_FOUND]:
    'Nessun account trovato con questa email. Registrati per creare un account.',
  [FirebaseAuthError.WRONG_PASSWORD]:
    'Password errata. Controlla e riprova o reimposta la password.',
  [FirebaseAuthError.INVALID_CREDENTIAL]:
    'Credenziali non valide. Verifica email e password.',

  // Account errors
  [FirebaseAuthError.USER_DISABLED]:
    'Questo account è stato disabilitato. Contatta il supporto per assistenza.',
  [FirebaseAuthError.TOO_MANY_REQUESTS]:
    'Troppi tentativi falliti. Riprova tra qualche minuto o reimposta la password.',

  // Network errors
  [FirebaseAuthError.NETWORK_ERROR]:
    'Errore di connessione. Verifica la tua connessione internet e riprova.',
};

/**
 * Get user-friendly error message from Firebase error
 */
export const getFirebaseErrorMessage = (errorCode: string): string => {
  return (
    firebaseErrorMessages[errorCode] ||
    'Si è verificato un errore inaspettato. Riprova più tardi.'
  );
};

/**
 * Generic error messages
 */
export const genericErrors = {
  networkError: 'Errore di connessione. Verifica la tua connessione internet.',
  unknownError: 'Si è verificato un errore inaspettato. Riprova più tardi.',
  serverError: 'Errore del server. Riprova tra qualche minuto.',
  timeoutError: 'La richiesta ha impiegato troppo tempo. Riprova.',
} as const;
