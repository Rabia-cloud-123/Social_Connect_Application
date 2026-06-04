import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

import NotificationItem from '../../components/notifications/NotificationItem';
import EmptyState from '../../components/common/EmptyState';
import {
  subscribeToNotifications,
  markNotificationAsRead,
} from '../../services/notificationService';

const NotificationsScreen = () => {
  const {user} = useSelector(state => state.auth);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.id) {
      return undefined;
    }

    const unsubscribe = subscribeToNotifications(
      user.id,
      setNotifications,
    );

    return unsubscribe;
  }, [user?.id]);

  const handleNotificationPress = async notification => {
    try {
      await markNotificationAsRead(notification.id);
    } catch (error) {
      console.log('Notification update error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NotificationItem
            notification={item}
            onPress={handleNotificationPress}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No Notifications"
            description="Likes, comments, and follows will appear here."
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
  },
});

export default NotificationsScreen;