import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Alert
} from 'react-native';
import { connect } from 'react-redux'

import TitleDetail from '../components/titleDetail.components';
import ButtonConfirm from '../components/buttonConfirm.components';

function Description(props) {
  //ham onpress kiem tra xem da nhap title hay chua
  const onPressFunc = () => {
    if (props.infoPost.title.trim() == '') {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập tiêu đề!",
        [
          { text: "OK" }
        ]
      );
    }
    else
      navigation.navigate('ConfirmInforScreen')
  }

  const { navigation } = props;
  return (
    <View style={styles.container}>
      <TitleDetail onPress={() => navigation.navigate('Chọn ảnh')}></TitleDetail>
      <ButtonConfirm onPress={() => onPressFunc()} textBtn="Tiếp theo"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
  },
});

export default connect(function (state) {
  return { infoPost: state.infoPost }
})(Description);