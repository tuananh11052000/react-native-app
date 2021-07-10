import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';

import AppNavigator from './AppNavigator'


export default function App(props) {
  return (
    <AppNavigator />
  );
}
