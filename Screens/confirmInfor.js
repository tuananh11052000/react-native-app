import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'

import ButtonConfirm from '../components/buttonConfirm.components';
import ConfirmInfor from '../components/confirminfor.components';

const heightStatusBar = StatusBar.currentHeight;

function ConfirmInforScreen(props) {
  const { navigation } = props;
  // console.log(props.auth.token)
  // console.log(props.infoPost)
  // axios({
  //   method: "POST",
  //   url: 'https://smai-app-api.herokuapp.com/post/CreatePost',
  //   data: {},
  //   header: {
  //     'Authorization': props.auth.token,
  //     'Content-Type': 'multipart/form-data'
  //   },

  // })
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
  return { infoPost: state.infoPost, auth: state.auth }
})(ConfirmInforScreen);