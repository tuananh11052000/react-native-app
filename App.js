import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './Redux.js'
import * as Notifications from 'expo-notifications';
import AppNavigator from './AppNavigator'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App(props) {
  return (<Provider store={store}>
    <AppNavigator />
  </Provider>
  );
}
