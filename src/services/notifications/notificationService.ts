/**
 * Notification Service
 * Handles local notifications for deadline reminders
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * Configure notification behavior
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Initialize notification service (call this on app start)
 */
export const initializeNotifications = async (): Promise<boolean> => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('❌ Notification permission denied');
      return false;
    }

    console.log('✅ Notification permission granted');

    // Configure Android notification channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('deadlines', {
        name: 'Scadenze',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        sound: 'default',
        enableVibrate: true,
      });
    }

    return true;
  } catch (error) {
    console.error('Initialize notifications error:', error);
    return false;
  }
};

/**
 * Schedule a notification
 */
export const scheduleNotification = async (params: {
  id: string;
  title: string;
  body: string;
  triggerDate: Date;
  data?: Record<string, any>;
}): Promise<string | null> => {
  try {
    const { id, title, body, triggerDate, data = {} } = params;

    // Don't schedule if date is in the past
    if (triggerDate.getTime() <= Date.now()) {
      return null;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      identifier: id,
      content: {
        title,
        body,
        sound: 'default',
        data,
        ...(Platform.OS === 'android' && { channelId: 'deadlines' }),
      },
      trigger: triggerDate,
    });

    return notificationId;
  } catch (error) {
    console.error('Schedule notification error:', error);
    return null;
  }
};

/**
 * Cancel notification by ID
 */
export const cancelNotification = async (id: string): Promise<void> => {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch (error) {
    console.error('Cancel notification error:', error);
  }
};

/**
 * Cancel all notifications with ID prefix
 */
export const cancelNotificationsWithPrefix = async (prefix: string): Promise<void> => {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const toCancel = scheduled.filter((n) => n.identifier.startsWith(prefix));

    for (const notification of toCancel) {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  } catch (error) {
    console.error('Cancel notifications with prefix error:', error);
  }
};
