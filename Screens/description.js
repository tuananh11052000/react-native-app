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
      <TitleDetail onPress={() => navigation.navigate('PickImage')}></TitleDetail>
      <ButtonConfirm onPress={() => navigation.navigate('ConfirmInforScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 20,
    justifyContent: 'space-between'
  },
});