import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {logoutUser} from '../../store/slices/authSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logoutUser()),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Logged in as</Text>
        <Text style={styles.value}>
          {user?.email || 'user@example.com'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.option}>Account</Text>
        <Text style={styles.option}>Privacy</Text>
        <Text style={styles.option}>Notifications</Text>
        <Text style={styles.option}>Help & Support</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#777',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  option: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  logoutButton: {
    backgroundColor: '#E53935',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SettingsScreen;