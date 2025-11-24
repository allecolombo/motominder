/**
 * Deadline Notifications
 * Schedule notifications for motorcycle deadlines
 */

import { Moto } from '@types';
import { scheduleNotification, cancelNotificationsWithPrefix } from './notificationService';

/**
 * Convert Firestore Timestamp or Date to Date object
 */
const toDate = (dateValue: any): Date => {
  if (!dateValue) return new Date();
  if (dateValue.toDate && typeof dateValue.toDate === 'function') {
    return dateValue.toDate();
  }
  if (dateValue instanceof Date) {
    return dateValue;
  }
  return new Date(dateValue);
};

/**
 * Schedule notifications for a moto's deadlines
 */
export const scheduleMotoNotifications = async (moto: Moto): Promise<void> => {
  try {
    // Cancel existing notifications for this moto
    await cancelNotificationsWithPrefix(`moto_${moto.id}`);

    const motoName = moto.nickname || `${moto.brand} ${moto.model}`;
    const now = new Date();

    // Schedule revisione notifications
    if (moto.deadlines?.revisione?.expiryDate) {
      const expiryDate = toDate(moto.deadlines.revisione.expiryDate);
      await scheduleDeadlineNotifications({
        motoId: moto.id,
        motoName,
        type: 'revisione',
        label: 'Revisione',
        expiryDate,
        now,
      });
    }

    // Schedule assicurazione notifications
    if (moto.deadlines?.assicurazione?.expiryDate) {
      const expiryDate = toDate(moto.deadlines.assicurazione.expiryDate);
      await scheduleDeadlineNotifications({
        motoId: moto.id,
        motoName,
        type: 'assicurazione',
        label: 'Assicurazione',
        expiryDate,
        now,
      });
    }

    console.log(`✅ Scheduled notifications for ${motoName}`);
  } catch (error) {
    console.error('Schedule moto notifications error:', error);
  }
};

/**
 * Schedule notifications at different intervals before deadline
 */
const scheduleDeadlineNotifications = async (params: {
  motoId: string;
  motoName: string;
  type: string;
  label: string;
  expiryDate: Date;
  now: Date;
}): Promise<void> => {
  const { motoId, motoName, type, label, expiryDate, now } = params;

  const intervals = [
    { days: 30, text: 'tra 1 mese' },
    { days: 7, text: 'tra 1 settimana' },
    { days: 1, text: 'domani' },
    { days: 0, text: 'oggi' },
  ];

  for (const interval of intervals) {
    const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil >= interval.days) {
      const triggerDate = new Date(expiryDate);
      triggerDate.setDate(triggerDate.getDate() - interval.days);
      triggerDate.setHours(9, 0, 0, 0); // 9:00 AM

      await scheduleNotification({
        id: `moto_${motoId}_${type}_${interval.days}d`,
        title: `${label} ${interval.text}`,
        body: `${motoName}: scade il ${expiryDate.toLocaleDateString('it-IT')}`,
        triggerDate,
        data: { motoId, type, screen: 'MotoDetail' },
      });
    }
  }
};

/**
 * Schedule notifications for all motos
 */
export const scheduleAllMotosNotifications = async (motos: Moto[]): Promise<void> => {
  try {
    for (const moto of motos) {
      await scheduleMotoNotifications(moto);
    }
    console.log(`✅ Scheduled notifications for ${motos.length} motos`);
  } catch (error) {
    console.error('Schedule all motos notifications error:', error);
  }
};
