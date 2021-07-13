import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {Provider} from 'react-redux';
import store from './Redux.js'

import AppNavigator from './AppNavigator'


export default function App(props) {
  return (<Provider store={store}>
    <AppNavigator />
  </Provider>
  );
}
