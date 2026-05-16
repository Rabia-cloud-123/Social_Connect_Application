// ─────────────────────────────────────────────
// File: mobile/App.js
// Root of the app — wraps everything in Redux
// Provider and sets up navigation + toast
// ─────────────────────────────────────────────
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './mobile/src/store/index';
import AppNavigator from './mobile/src/navigation/AppNavigator';
import { setupNotifications } from './mobile/src/utils/notifications';

const App = () => {
  useEffect(() => {
    // Set up FCM foreground/background listeners
    setupNotifications();
  }, []);

  return (
    // GestureHandlerRootView is required by React Navigation
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Redux store provider — all screens can access global state */}
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          {/* AppNavigator switches between Auth and Main flows */}
          <AppNavigator />
        </NavigationContainer>
        {/* Toast for success/error messages anywhere in the app */}
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;