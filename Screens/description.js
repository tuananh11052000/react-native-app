import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import { connect } from 'react-redux'

import TitleDetail from '../components/titleDetail.components';
import ButtonConfirm from '../components/buttonConfirm.components';

function Description(props) {
  //ham onpress kiem tra xem da nhap title hay chua
  const onPressFunc = () => {
    if (props.infoPost.title == '')
      alert("Vui lòng nhập tiêu đề")
    else
      navigation.navigate('ConfirmInforScreen')
  }

  const { navigation } = props;
  return (
    <View style={styles.container}>
      <TitleDetail onPress={() => navigation.navigate('PickImage')}></TitleDetail>
      <ButtonConfirm onPress={() => onPressFunc()} />
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

export default connect(function (state) {
  return { infoPost: state.infoPost }
})(Description);