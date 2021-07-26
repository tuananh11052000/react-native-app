import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './Redux.js'

import AppNavigator from './AppNavigator'


export default function App(props) {
  return (<Provider store={store}>
    <AppNavigator />
  </Provider>
  );
}
