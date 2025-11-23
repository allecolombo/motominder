/**
 * MainNavigator
 * Stack navigator for authenticated screens
 * TODO: Replace with BottomTabNavigator in future milestones
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@screens/home';
import { MotoListScreen, AddMotoScreen, MotoDetailScreen, MotoDashboardScreen } from '@screens/moto';
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
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MotoDashboard" component={MotoDashboardScreen} />
      <Stack.Screen name="MotoList" component={MotoListScreen} />
      <Stack.Screen name="AddMoto" component={AddMotoScreen} />
      <Stack.Screen name="MotoDetail" component={MotoDetailScreen} />
      {/* Future screens will be added here */}
    </Stack.Navigator>
  );
};
