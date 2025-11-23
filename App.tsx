/**
 * MotoMinder App
 * Root component with AuthProvider, MotoProvider and Navigation
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, MotoProvider } from '@store';
import { RootNavigator } from '@navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MotoProvider>
          <RootNavigator />
          <StatusBar style="light" />
        </MotoProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
