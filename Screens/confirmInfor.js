import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux'

import ButtonConfirm from '../components/buttonConfirm.components';
import ConfirmInfor from '../components/confirminfor.components';

const heightStatusBar = StatusBar.currentHeight;

function ConfirmInforScreen(props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <ConfirmInfor></ConfirmInfor>
      <ButtonConfirm onPress={() => navigation.navigate('Completed')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: (Platform.OS === 'ios') ? 20 : 20,
    marginTop: heightStatusBar,
    justifyContent: 'space-between'
  },
});

export default connect(function (state) {
  return { inforPost: state.infoPost, num: state.countNumber, auth: state.auth }
})(ConfirmInforScreen);