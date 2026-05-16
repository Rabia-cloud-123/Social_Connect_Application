// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/navigation/TabNavigator.js
// FOLDER: mobile → src → navigation
// PURPOSE: Bottom tab bar for authenticated users.
//          Each tab wraps a Stack navigator so screens like
//          UserProfile can be pushed within a tab.
// ═══════════════════════════════════════════════════════════

import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/main/HomeScreen';
import CreatePostScreen from '../screens/main/CreatePostScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import EditProfileScreen from '../screens/main/EditProfileScreen';
import UserProfileScreen from '../screens/main/UserProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import { COLORS, SHADOW } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ── Home Stack ────────────────────────────────
// Home → UserProfile (tap on a user's name)
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeFeed" component={HomeScreen} />
    <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    <Stack.Screen name="CreatePost" component={CreatePostScreen} />
  </Stack.Navigator>
);

// ── Profile Stack ─────────────────────────────
// MyProfile → EditProfile → Settings
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyProfile" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="UserProfile" component={UserProfileScreen} />
  </Stack.Navigator>
);

// ── Custom Add-Post button in the tab bar ─────
const AddButton = ({ onPress }) => (
  <TouchableOpacity style={styles.addButton} onPress={onPress} activeOpacity={0.8}>
    <Icon name="add" size={28} color={COLORS.white} />
  </TouchableOpacity>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textLight,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabLabel,
      tabBarIcon: ({ focused, color, size }) => {
        const icons = {
          Home: focused ? 'home' : 'home-outline',
          Add: 'add-circle',
          Profile: focused ? 'person' : 'person-outline',
        };
        return <Icon name={icons[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen
      name="Add"
      component={CreatePostScreen}
      options={{
        tabBarLabel: 'Post',
        tabBarButton: (props) => (
          <AddButton onPress={props.onPress} />
        ),
      }}
    />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
    paddingTop: 4,
    ...SHADOW.sm,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...SHADOW.md,
  },
});

export default TabNavigator;