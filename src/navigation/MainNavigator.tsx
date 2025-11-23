/**
 * MainNavigator
 * Stack navigator for authenticated screens
 * TODO: Replace with BottomTabNavigator in future milestones
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@screens/home';
import { MainStackParamList } from './types';
import { Colors } from '@constants';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* Future screens will be added here */}
    </Stack.Navigator>
  );
};
