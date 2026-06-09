import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {logoutUser} from '../../store/slices/authSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();

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
          onPress: () => {
            dispatch(logoutUser());
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.header}>Settings</Text>
        <Text style={styles.subtitle}>
          Manage your account preferences
        </Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.itemText}>
            Account Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.icon}>🔔</Text>
          <Text style={styles.itemText}>
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.icon}>🎨</Text>
          <Text style={styles.itemText}>
            Appearance
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.icon}>ℹ️</Text>
          <Text style={styles.itemText}>
            About App
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}>
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FF',
  },
  headerBox: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#EDEBFF',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 3,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  icon: {
    fontSize: 22,
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SettingsScreen;