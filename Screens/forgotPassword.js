import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import ForgotPassword from "../components/forgotPassword.component";

const heightStatusBar = StatusBar.currentHeight;//lay ra chieu cao cua thanh trang thai

export default function ForgotPasswords(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <ForgotPassword navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: heightStatusBar/2,
  },
});
