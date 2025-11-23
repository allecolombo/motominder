/**
 * MotoMinder App
 * Root component with AuthProvider, MotoProvider and Navigation
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, MotoProvider, AlertProvider } from '@store';
import { RootNavigator } from '@navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MotoProvider>
          <AlertProvider>
            <RootNavigator />
            <StatusBar style="light" />
          </AlertProvider>
        </MotoProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
