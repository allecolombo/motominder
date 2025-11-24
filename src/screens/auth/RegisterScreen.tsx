/**
 * RegisterScreen
 * User registration with email/password and validation
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Input, Button, ErrorMessage, LoadingSpinner } from '@components/common';
import { useAuth } from '@store';
import { validateRegisterForm } from '@utils';
import { Colors, Typography, Spacing, ScreenPadding } from '@constants';
import { AuthStackParamList } from '@navigation/types';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Register'
>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { register, loading, error, clearError } = useAuth();

  // Form state
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<{
    displayName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  /**
   * Handle registration
   */
  const handleRegister = async () => {
    // Clear previous errors
    clearError();
    setValidationErrors({});

    // Validate form
    const errors = validateRegisterForm(
      email,
      password,
      confirmPassword,
      displayName
    );
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Attempt registration
    try {
      await register(email.trim(), password, displayName.trim());
      // Navigation is handled by App.tsx based on auth state
    } catch (error) {
      // Error is handled by AuthContext
      console.error('Registration failed:', error);
    }
  };

  /**
   * Navigate back to Login screen
   */
  const goToLogin = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Crea il tuo account</Text>
          <Text style={styles.subtitle}>
            Inizia a gestire la tua moto con MotoMinder
          </Text>
        </View>

        {/* Global Error Message */}
        {error && <ErrorMessage message={error} onDismiss={clearError} />}

        {/* Registration Form */}
        <View style={styles.form}>
          {/* Display Name Input */}
          <Input
            label="Nome"
            placeholder="Come ti chiami?"
            value={displayName}
            onChangeText={setDisplayName}
            error={validationErrors.displayName}
            leftIcon="person-outline"
            autoCapitalize="words"
            autoCorrect={false}
            textContentType="name"
            autoComplete="name"
          />

          {/* Email Input */}
          <Input
            label="Email"
            placeholder="nome@esempio.it"
            value={email}
            onChangeText={setEmail}
            error={validationErrors.email}
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            autoComplete="email"
          />

          {/* Password Input */}
          <Input
            label="Password"
            placeholder="Min 8 caratteri, 1 maiuscola, 1 numero"
            value={password}
            onChangeText={setPassword}
            error={validationErrors.password}
            leftIcon="lock-closed-outline"
            rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShowPassword(!showPassword)}
            secureTextEntry={!showPassword}
            textContentType="newPassword"
            autoComplete="password-new"
          />

          {/* Confirm Password Input */}
          <Input
            label="Conferma Password"
            placeholder="Ripeti la password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={validationErrors.confirmPassword}
            leftIcon="lock-closed-outline"
            rightIcon={
              showConfirmPassword ? 'eye-off-outline' : 'eye-outline'
            }
            onRightIconPress={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            secureTextEntry={!showConfirmPassword}
            textContentType="none"
            autoComplete="off"
          />

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>
              La password deve contenere:
            </Text>
            <Text style={styles.requirementText}>
              • Almeno 8 caratteri
            </Text>
            <Text style={styles.requirementText}>
              • Almeno una lettera maiuscola
            </Text>
            <Text style={styles.requirementText}>• Almeno un numero</Text>
          </View>

          {/* Register Button */}
          <Button
            title="Registrati"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            containerStyle={styles.registerButton}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>oppure</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Hai già un account? </Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text style={styles.loginLink}>Accedi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

        {/* Full-screen loading overlay */}
        <LoadingSpinner
          visible={loading}
          message="Creazione account in corso..."
          fullScreen
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ScreenPadding.horizontal,
    paddingVertical: ScreenPadding.vertical,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing['2xl'],
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  requirementsContainer: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  requirementsTitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
  },
  requirementText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    marginTop: Spacing.xs,
  },
  registerButton: {
    marginTop: Spacing.base,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginHorizontal: Spacing.base,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: Typography.fontSize.base,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});
