/**
 * Form Validation Utilities
 * Validation functions for authentication forms
 */

import { ValidationErrors } from '@types';

/**
 * Email Validation
 * Validates email format using regex
 */
export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'L\'email è obbligatoria';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Inserisci un\'email valida';
  }

  return null;
};

/**
 * Password Validation
 * Requirements:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 number
 */
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'La password è obbligatoria';
  }

  if (password.length < 8) {
    return 'La password deve contenere almeno 8 caratteri';
  }

  const hasUppercase = /[A-Z]/.test(password);
  if (!hasUppercase) {
    return 'La password deve contenere almeno una lettera maiuscola';
  }

  const hasNumber = /[0-9]/.test(password);
  if (!hasNumber) {
    return 'La password deve contenere almeno un numero';
  }

  return null;
};

/**
 * Confirm Password Validation
 * Checks if passwords match
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return 'Conferma la password';
  }

  if (password !== confirmPassword) {
    return 'Le password non coincidono';
  }

  return null;
};

/**
 * Display Name Validation
 * Requirements:
 * - Minimum 2 characters
 * - Maximum 50 characters
 */
export const validateDisplayName = (displayName: string): string | null => {
  if (!displayName) {
    return 'Il nome è obbligatorio';
  }

  const trimmed = displayName.trim();

  if (trimmed.length < 2) {
    return 'Il nome deve contenere almeno 2 caratteri';
  }

  if (trimmed.length > 50) {
    return 'Il nome non può superare i 50 caratteri';
  }

  return null;
};

/**
 * Login Form Validation
 */
export const validateLoginForm = (
  email: string,
  password: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  if (!password) {
    errors.password = 'La password è obbligatoria';
  }

  return errors;
};

/**
 * Register Form Validation
 */
export const validateRegisterForm = (
  email: string,
  password: string,
  confirmPassword: string,
  displayName: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError;
  }

  const displayNameError = validateDisplayName(displayName);
  if (displayNameError) {
    errors.displayName = displayNameError;
  }

  return errors;
};

/**
 * Forgot Password Form Validation
 */
export const validateForgotPasswordForm = (email: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  return errors;
};
