/**
 * ForgotPasswordScreen
 * Password reset flow - send reset email
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
import { Ionicons } from '@expo/vector-icons';

import { Input, Button, ErrorMessage, LoadingSpinner } from '@components/common';
import { useAuth, useAlert } from '@store';
import { validateForgotPasswordForm } from '@utils';
import { Colors, Typography, Spacing, ScreenPadding, IconSize } from '@constants';
import { AuthStackParamList } from '@navigation/types';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const { resetPassword, loading, error, clearError } = useAuth();
  const { showSuccess } = useAlert();

  // Form state
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
  }>({});

  /**
   * Handle password reset
   */
  const handleResetPassword = async () => {
    // Clear previous errors
    clearError();
    setValidationErrors({});

    // Validate email
    const errors = validateForgotPasswordForm(email);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Send password reset email
    try {
      await resetPassword(email.trim());
      setEmailSent(true);

      // Show success alert
      showSuccess(
        'Email inviata',
        `Abbiamo inviato un link per reimpostare la password a ${email}. Controlla la tua casella di posta.`,
        () => navigation.goBack()
      );
    } catch (error) {
      // Error is handled by AuthContext
      console.error('Password reset failed:', error);
    }
  };

  /**
   * Navigate back to Login
   */
  const goToLogin = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="lock-open-outline" size={IconSize['2xl']} color={Colors.primary} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Password dimenticata?</Text>
          <Text style={styles.subtitle}>
            Inserisci la tua email e ti invieremo un link per reimpostare la
            password.
          </Text>
        </View>

        {/* Global Error Message */}
        {error && <ErrorMessage message={error} onDismiss={clearError} />}

        {/* Reset Form */}
        {!emailSent ? (
          <View style={styles.form}>
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

            {/* Reset Button */}
            <Button
              title="Invia link di reset"
              onPress={handleResetPassword}
              loading={loading}
              disabled={loading}
              containerStyle={styles.resetButton}
            />

            {/* Back to Login */}
            <TouchableOpacity onPress={goToLogin} style={styles.backButton}>
              <Ionicons
                name="arrow-back"
                size={20}
                color={Colors.primary}
                style={styles.backIcon}
              />
              <Text style={styles.backText}>Torna al login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Success state
          <View style={styles.successContainer}>
            <Ionicons
              name="checkmark-circle"
              size={IconSize['2xl']}
              color={Colors.success}
            />
            <Text style={styles.successTitle}>Email inviata!</Text>
            <Text style={styles.successText}>
              Controlla la tua casella di posta e segui le istruzioni per
              reimpostare la password.
            </Text>

            <Button
              title="Torna al login"
              onPress={goToLogin}
              containerStyle={styles.successButton}
            />
          </View>
        )}
      </ScrollView>

        {/* Full-screen loading overlay */}
        <LoadingSpinner
          visible={loading}
          message="Invio email in corso..."
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
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
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  form: {
    width: '100%',
  },
  resetButton: {
    marginTop: Spacing.lg,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  backIcon: {
    marginRight: Spacing.xs,
  },
  backText: {
    fontSize: Typography.fontSize.base,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
  },
  successTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  successText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    marginBottom: Spacing.xl,
  },
  successButton: {
    marginTop: Spacing.base,
  },
});
