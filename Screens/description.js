import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import TitleDetail from '../components/titleDetail.components';
import ButtonConfirm from '../components/buttonConfirm.components';

const heightStatusBar = StatusBar.currentHeight;

export default function Description(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <TitleDetail></TitleDetail>
      <ButtonConfirm onPress={() => navigation.navigate('ConfirmInforScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: heightStatusBar,
    paddingTop: (Platform.OS === 'ios') ? 20 : 20,
    justifyContent: 'space-between'
  },
});