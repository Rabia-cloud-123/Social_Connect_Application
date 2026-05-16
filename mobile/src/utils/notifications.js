// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/utils/notifications.js
// PURPOSE: Firebase Push Notifications Utility
// ═══════════════════════════════════════════════════════════

import messaging from '@react-native-firebase/messaging';

import notifee, {
  AndroidImportance,
} from '@notifee/react-native';

import {Alert, Platform} from 'react-native';

// ═══════════════════════════════════════════════════════════
// REQUEST USER PERMISSION
// ═══════════════════════════════════════════════════════════

export const requestUserPermission = async () => {
  try {
    const authStatus =
      await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus ===
        messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log(
        'Notification Permission Granted.',
      );

      getFCMToken();
    }
  } catch (error) {
    console.log(
      'Notification Permission Error:',
      error,
    );
  }
};

// ═══════════════════════════════════════════════════════════
// GET FCM TOKEN
// ═══════════════════════════════════════════════════════════

export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();

    console.log('FCM TOKEN:', token);

    return token;
  } catch (error) {
    console.log('FCM TOKEN ERROR:', error);
  }
};

// ═══════════════════════════════════════════════════════════
// CREATE NOTIFICATION CHANNEL
// ═══════════════════════════════════════════════════════════

export const createNotificationChannel =
  async () => {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'social-connect',
        name: 'Social Connect Notifications',
        importance: AndroidImportance.HIGH,
      });
    }
  };

// ═══════════════════════════════════════════════════════════
// FOREGROUND NOTIFICATIONS
// ═══════════════════════════════════════════════════════════

export const notificationListener = async () => {
  // Foreground State
  messaging().onMessage(async remoteMessage => {
    console.log(
      'Foreground Notification:',
      remoteMessage,
    );

    await notifee.displayNotification({
      title:
        remoteMessage.notification?.title ||
        'Social Connect',

      body:
        remoteMessage.notification?.body ||
        'You have a new notification',

      android: {
        channelId: 'social-connect',
        smallIcon: 'ic_launcher',
      },
    });
  });

  // App Opened From Background
  messaging().onNotificationOpenedApp(
    remoteMessage => {
      console.log(
        'Notification caused app to open:',
        remoteMessage.notification,
      );
    },
  );

  // App Opened From Quit State
  const remoteMessage =
    await messaging().getInitialNotification();

  if (remoteMessage) {
    console.log(
      'App opened from quit state:',
      remoteMessage.notification,
    );
  }
};

// ═══════════════════════════════════════════════════════════
// LOCAL TEST NOTIFICATION
// ═══════════════════════════════════════════════════════════

export const showLocalNotification =
  async (
    title = 'Social Connect',
    body = 'New Notification',
  ) => {
    try {
      await notifee.displayNotification({
        title,
        body,

        android: {
          channelId: 'social-connect',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
        },
      });
    } catch (error) {
      console.log(
        'Local Notification Error:',
        error,
      );
    }
  };

// ═══════════════════════════════════════════════════════════
// TEST ALERT NOTIFICATION
// ═══════════════════════════════════════════════════════════

export const showAlertNotification = (
  title,
  message,
) => {
  Alert.alert(title, message);
};