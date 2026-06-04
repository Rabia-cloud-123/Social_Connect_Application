import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import {formatDateTime} from '../../utils/helpers';

const NotificationItem = ({notification, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        !notification?.isRead && styles.unreadContainer,
      ]}
      activeOpacity={0.8}
      onPress={() => onPress?.(notification)}>
      <Text style={styles.senderName}>
        {notification?.senderName || 'Someone'}
      </Text>

      <Text style={styles.message}>
        {notification?.message || 'You have a new notification'}
      </Text>

      <Text style={styles.time}>
        {formatDateTime(notification?.createdAt)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  unreadContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#1877F2',
  },
  senderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#444444',
    marginBottom: 6,
  },
  time: {
    fontSize: 12,
    color: '#888888',
  },
});

export default NotificationItem;