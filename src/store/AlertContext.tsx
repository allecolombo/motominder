/**
 * AlertContext
 * Global alert management with custom design
 * Replaces native Alert.alert() throughout the app
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CustomAlert, AlertButton } from '@components/common/CustomAlert';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@constants';

interface AlertConfig {
  title: string;
  message?: string;
  buttons?: AlertButton[];
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
}

interface AlertContextType {
  showAlert: (config: AlertConfig) => void;
  showSuccess: (title: string, message?: string, onOk?: () => void) => void;
  showError: (title: string, message?: string, onOk?: () => void) => void;
  showConfirm: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText?: string,
    cancelText?: string
  ) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = useCallback((config: AlertConfig) => {
    setAlertConfig(config);
    setVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setVisible(false);
    // Clear config after animation
    setTimeout(() => setAlertConfig(null), 300);
  }, []);

  const showSuccess = useCallback(
    (title: string, message?: string, onOk?: () => void) => {
      showAlert({
        title,
        message,
        icon: 'checkmark-circle',
        iconColor: Colors.success,
        buttons: [
          {
            text: 'OK',
            style: 'default',
            onPress: onOk,
          },
        ],
      });
    },
    [showAlert]
  );

  const showError = useCallback(
    (title: string, message?: string, onOk?: () => void) => {
      showAlert({
        title,
        message,
        icon: 'close-circle',
        iconColor: Colors.error,
        buttons: [
          {
            text: 'OK',
            style: 'default',
            onPress: onOk,
          },
        ],
      });
    },
    [showAlert]
  );

  const showConfirm = useCallback(
    (
      title: string,
      message: string,
      onConfirm: () => void,
      onCancel?: () => void,
      confirmText: string = 'Conferma',
      cancelText: string = 'Annulla'
    ) => {
      showAlert({
        title,
        message,
        icon: 'alert-circle',
        iconColor: Colors.warning,
        buttons: [
          {
            text: cancelText,
            style: 'cancel',
            onPress: onCancel,
          },
          {
            text: confirmText,
            style: 'destructive',
            onPress: onConfirm,
          },
        ],
      });
    },
    [showAlert]
  );

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        showSuccess,
        showError,
        showConfirm,
        hideAlert,
      }}
    >
      {children}
      {alertConfig && (
        <CustomAlert
          visible={visible}
          title={alertConfig.title}
          message={alertConfig.message}
          buttons={alertConfig.buttons}
          icon={alertConfig.icon}
          iconColor={alertConfig.iconColor}
          onDismiss={hideAlert}
        />
      )}
    </AlertContext.Provider>
  );
};

/**
 * Hook to access alert functions
 */
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};
