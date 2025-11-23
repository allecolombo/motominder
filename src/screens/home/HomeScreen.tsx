/**
 * HomeScreen
 * Main dashboard - redirects to MotoList
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { LoadingSpinner } from '@components/common';
import { useMoto } from '@store';
import { Colors } from '@constants';
import { MainStackParamList } from '@navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Home'
>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { primaryMoto, motos, loading } = useMoto();

  useEffect(() => {
    // Wait for motos to load
    if (!loading) {
      // If there's a primary moto, go to dashboard
      if (primaryMoto) {
        navigation.replace('MotoDashboard');
      }
      // Otherwise, go to list
      else {
        navigation.replace('MotoList');
      }
    }
  }, [primaryMoto, motos, loading]);

  return (
    <View style={styles.container}>
      <LoadingSpinner visible={true} message="Caricamento..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
