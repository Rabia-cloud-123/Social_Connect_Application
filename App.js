import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import firebase from '@react-native-firebase/app';

import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

if (!firebase.apps.length) {
  firebase.initializeApp();
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;