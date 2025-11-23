/**
 * RootNavigator
 * Top-level navigator with conditional auth routing
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@store';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { LoadingSpinner } from '@components/common';
import { Colors } from '@constants';
import { View, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner visible={true} message="Caricamento..." />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
        {user ? (
          // User is authenticated - show Main app
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          // User is not authenticated - show Auth screens
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
