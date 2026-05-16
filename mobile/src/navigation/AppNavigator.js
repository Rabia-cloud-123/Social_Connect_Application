// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/navigation/AppNavigator.js
// FOLDER: mobile → src → navigation
// PURPOSE: Root navigator — shows AuthNavigator when logged out,
//          TabNavigator when logged in. Watches Firebase auth state.
// ═══════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { setUser } from '../store/slices/authSlice';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { COLORS } from '../theme';
import api from '../api/apiClient';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { user, initialized } = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // onAuthStateChanged fires once immediately with current user (or null)
    // then again on every login/logout
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          // Fetch the full Firestore profile from our backend
          const res = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser({ ...res.data.user, token, uid: firebaseUser.uid }));
        } catch (error) {
          // Profile might not exist yet (first login edge case)
          dispatch(setUser({ uid: firebaseUser.uid, email: firebaseUser.email, token: '' }));
        }
      } else {
        dispatch(setUser(null));
      }
      setChecking(false);
    });

    return unsubscribe; // Cleanup listener on unmount
  }, [dispatch]);

  // Show spinner while checking Firebase session
  if (checking || !initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Route to correct navigator based on auth state
  return user ? <TabNavigator /> : <AuthNavigator />;
};

export default AppNavigator;