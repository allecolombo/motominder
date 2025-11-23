/**
 * HomeScreen
 * Main dashboard - redirects to MotoList
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { LoadingSpinner } from '@components/common';
import { Colors } from '@constants';
import { MainStackParamList } from '@navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Home'
>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    // Redirect to MotoList immediately
    navigation.replace('MotoList');
  }, []);

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
