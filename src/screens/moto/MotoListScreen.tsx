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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { MotoCard } from '@components/moto';
import { LoadingSpinner, ErrorMessage } from '@components/common';
import { useMoto } from '@store';
import { Colors, Typography, Spacing, ScreenPadding, IconSize } from '@constants';
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
      <Ionicons name="bicycle-outline" size={IconSize['2xl']} color={Colors.textTertiary} />
      <Text style={styles.emptyTitle}>Nessuna moto aggiunta</Text>
      <Text style={styles.emptyText}>
        Aggiungi la tua prima moto per iniziare a gestire scadenze e manutenzioni
      </Text>
      <TouchableOpacity style={styles.emptyButton} onPress={handleAddMoto}>
        <Ionicons name="add-circle" size={24} color={Colors.white} />
        <Text style={styles.emptyButtonText}>Aggiungi Moto</Text>
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Le Mie Moto</Text>
        <TouchableOpacity onPress={handleAddMoto} style={styles.addButton}>
          <Ionicons name="add-circle" size={32} color={Colors.primary} />
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
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ScreenPadding.horizontal,
    paddingTop: ScreenPadding.vertical,
    paddingBottom: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  addButton: {
    padding: Spacing.xs,
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
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing['2xl'],
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.white,
    marginLeft: Spacing.sm,
  },
});
