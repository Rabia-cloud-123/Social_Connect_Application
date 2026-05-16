// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/screens/main/SettingsScreen.js
// PURPOSE: App Settings Screen
// ═══════════════════════════════════════════════════════════

import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';

import {useDispatch} from 'react-redux';

import Toast from 'react-native-toast-message';

import {logoutUser} from '../../store/slices/authSlice';

import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  SHADOW,
} from '../../theme';

const SettingsScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [notificationsEnabled, setNotificationsEnabled] =
    useState(true);

  const [darkModeEnabled, setDarkModeEnabled] =
    useState(false);

  // Toggle Notifications
  const handleNotificationToggle = value => {
    setNotificationsEnabled(value);

    Toast.show({
      type: 'success',
      text1: value
        ? 'Notifications Enabled'
        : 'Notifications Disabled',
    });
  };

  // Toggle Dark Mode
  const handleDarkModeToggle = value => {
    setDarkModeEnabled(value);

    Toast.show({
      type: 'success',
      text1: value
        ? 'Dark Mode Enabled'
        : 'Dark Mode Disabled',
    });
  };

  // Logout
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

            Toast.show({
              type: 'success',
              text1: 'Logged out successfully',
            });
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Settings
        </Text>

        <Text style={styles.subtitle}>
          Manage your app preferences
        </Text>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          Preferences
        </Text>

        {/* Notifications */}
        <View style={styles.settingCard}>

          <View>
            <Text style={styles.settingTitle}>
              Notifications
            </Text>

            <Text style={styles.settingDescription}>
              Receive likes and comments alerts
            </Text>
          </View>

          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{
              false: '#D1D1D1',
              true: COLORS.primary,
            }}
          />
        </View>

        {/* Dark Mode */}
        <View style={styles.settingCard}>

          <View>
            <Text style={styles.settingTitle}>
              Dark Mode
            </Text>

            <Text style={styles.settingDescription}>
              Enable dark appearance
            </Text>
          </View>

          <Switch
            value={darkModeEnabled}
            onValueChange={handleDarkModeToggle}
            trackColor={{
              false: '#D1D1D1',
              true: COLORS.primary,
            }}
          />
        </View>

      </View>

      {/* Account Section */}
      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          Account
        </Text>

        {/* Edit Profile */}
        <TouchableOpacity
          style={styles.menuCard}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('EditProfile')
          }>

          <Text style={styles.menuTitle}>
            Edit Profile
          </Text>

          <Text style={styles.menuArrow}>
            ›
          </Text>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity
          style={styles.menuCard}
          activeOpacity={0.8}>

          <Text style={styles.menuTitle}>
            About App
          </Text>

          <Text style={styles.menuArrow}>
            ›
          </Text>
        </TouchableOpacity>

      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.8}
        onPress={handleLogout}>

        <Text style={styles.logoutButtonText}>
          Logout
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 80,
  },

  header: {
    marginBottom: SPACING.xl,
  },

  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '700',
    color: COLORS.text,
  },

  subtitle: {
    marginTop: SPACING.sm,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },

  section: {
    marginBottom: SPACING.xl,
  },

  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },

  settingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOW.sm,
  },

  settingTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
  },

  settingDescription: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },

  menuCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOW.sm,
  },

  menuTitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    fontWeight: '600',
  },

  menuArrow: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },

  logoutButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.error,
    paddingVertical: 16,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    ...SHADOW.md,
  },

  logoutButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
});

export default SettingsScreen;