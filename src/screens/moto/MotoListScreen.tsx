/**
 * MotoListScreen
 * Displays list of user's motorcycles
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { MotoCard } from '@components/moto';
import { LoadingSpinner, ErrorMessage, BackButton } from '@components/common';
import { useMoto } from '@store';
import { Colors, Typography, Spacing, ScreenPadding, IconSize, BorderRadius } from '@constants';
import { MainStackParamList } from '@navigation/types';
import { Moto } from '@types';

type MotoListScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'MotoList'
>;

export const MotoListScreen: React.FC = () => {
  const navigation = useNavigation<MotoListScreenNavigationProp>();
  const { motos, loading, error, refreshMotos, selectMoto, clearError } = useMoto();

  useEffect(() => {
    refreshMotos();
  }, []);

  const handleMotoPress = (moto: Moto) => {
    selectMoto(moto.id);
    navigation.navigate('MotoDetail', { motoId: moto.id });
  };

  const handleAddMoto = () => {
    navigation.navigate('AddMoto');
  };

  // Empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="bicycle" size={64} color={Colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>Nessuna moto registrata</Text>
      <Text style={styles.emptyText}>
        Inizia aggiungendo la tua prima moto per gestire scadenze e manutenzioni
      </Text>
      <TouchableOpacity style={styles.emptyButton} onPress={handleAddMoto}>
        <Ionicons name="add" size={24} color={Colors.white} />
        <Text style={styles.emptyButtonText}>Aggiungi Prima Moto</Text>
      </TouchableOpacity>
    </View>
  );

  // Render moto item
  const renderMotoItem = ({ item }: { item: Moto }) => (
    <MotoCard moto={item} onPress={() => handleMotoPress(item)} />
  );

  if (loading && motos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner visible={true} message="Caricamento moto..." />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Le Mie Moto</Text>
          {motos.length > 0 && (
            <Text style={styles.subtitle}>
              {motos.length} {motos.length === 1 ? 'moto registrata' : 'moto registrate'}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={handleAddMoto} style={styles.addButton}>
          <Ionicons name="add" size={28} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {error && <ErrorMessage message={error} onDismiss={clearError} />}

      {/* Moto List */}
      <FlatList
        data={motos}
        renderItem={renderMotoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshMotos}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonContainer: {
    paddingHorizontal: ScreenPadding.horizontal,
    paddingTop: ScreenPadding.vertical,
    paddingBottom: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ScreenPadding.horizontal,
    paddingTop: ScreenPadding.vertical,
    paddingBottom: Spacing.lg,
    marginBottom: Spacing.base,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs / 2,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  listContent: {
    paddingHorizontal: ScreenPadding.horizontal,
    paddingTop: Spacing.base,
    paddingBottom: Spacing['2xl'],
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['5xl'],
    paddingHorizontal: ScreenPadding.horizontal,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  emptyTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    marginBottom: Spacing['2xl'],
    maxWidth: 300,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing['2xl'],
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginLeft: Spacing.sm,
  },
});
