import React from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import MainStackNavigator from './MainStackNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated ? (
        <Stack.Screen
          name="Main"
          component={MainStackNavigator}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;