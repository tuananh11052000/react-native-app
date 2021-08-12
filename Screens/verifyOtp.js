import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import VerifyOtp from '../components/verifyOpt.component'

const heightStatusBar = StatusBar.currentHeight;//lay ra chieu cao cua thanh trang thai

export default function VerifyOtps() {
  return (
    <View style={styles.container}>
      <VerifyOtp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: heightStatusBar,
    paddingTop: heightStatusBar*3,
  },
});
