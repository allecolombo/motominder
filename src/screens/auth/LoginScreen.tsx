/**
 * LoginScreen
 * User login with email/password and validation
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
import { validateLoginForm } from '@utils';
import { Colors, Typography, Spacing, ScreenPadding } from '@constants';
import { AuthStackParamList } from '@navigation/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, loading, error, clearError } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  /**
   * Handle login
   */
  const handleLogin = async () => {
    // Clear previous errors
    clearError();
    setValidationErrors({});

    // Validate form
    const errors = validateLoginForm(email, password);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Attempt login
    try {
      await login(email.trim(), password);
      // Navigation is handled by App.tsx based on auth state
    } catch (error) {
      // Error is handled by AuthContext
      console.error('Login failed:', error);
    }
  };

  /**
   * Navigate to Register screen
   */
  const goToRegister = () => {
    navigation.navigate('Register');
  };

  /**
   * Navigate to ForgotPassword screen
   */
  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Benvenuto</Text>
          <Text style={styles.subtitle}>
            Accedi al tuo account MotoMinder
          </Text>
        </View>

        {/* Global Error Message */}
        {error && (
          <ErrorMessage message={error} onDismiss={clearError} />
        )}

        {/* Login Form */}
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

          {/* Password Input */}
          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            error={validationErrors.password}
            leftIcon="lock-closed-outline"
            rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShowPassword(!showPassword)}
            secureTextEntry={!showPassword}
            textContentType="password"
            autoComplete="password"
          />

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={goToForgotPassword}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>
              Hai dimenticato la password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            title="Accedi"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            containerStyle={styles.loginButton}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>oppure</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Non hai un account? </Text>
            <TouchableOpacity onPress={goToRegister}>
              <Text style={styles.registerLink}>Registrati</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>

        {/* Full-screen loading overlay */}
        <LoadingSpinner visible={loading} message="Accesso in corso..." fullScreen />
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: -Spacing.sm,
    marginBottom: Spacing.lg,
  },
  forgotPasswordText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  loginButton: {
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },
  registerLink: {
    fontSize: Typography.fontSize.base,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});
