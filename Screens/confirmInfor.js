import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Platform, 
  Image } from 'react-native';

import ButtonConfirm from '../components/buttonConfirm.components';
import ConfirmInfor from '../components/confirminfor.components';




export default class App extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <View style={styles.container}>
          <ConfirmInfor></ConfirmInfor>
          <ButtonConfirm/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 20,
    justifyContent: 'space-between'
  },
});