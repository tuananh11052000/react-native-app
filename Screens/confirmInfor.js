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
  //ham thuc hien khi nhan vao button xac thuc
  data = props.infoPost;
  // const submitInfoPost = async () => {
  //   try {
  //     await axios({
  //       method: 'POST',
  //       url: 'https://smai-app-api.herokuapp.com/post/CreatePost',
  //       data: {
  //         title: data.title,
  //         NameProduct: data.NameProduct,
  //         TypeAuthor: 'tangcongdong',
  //         address: data.address,
  //         note: data.note
  //       },
  //       headers: {
  //         "Authorization": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SUQiOiI2MGU5Y2M5ZjJkMzlkYzJkMTBkOGM2OWQiLCJpYXQiOjE2Mjc5MjMzNzB9.8VukL4etrnPJezZYXTCkAum3zDuf2t_4ERP6RKNhJFk`,
  //       }
  //     }).then(data => {
  //       data.idpost
  //     })
  //     .catch(e => console.log(e))
  //   } catch (e) {
  //     alert(e)
  //   }
  // }
  const submitInfoPost = async () => {
    try {
      let formData = new FormData();
      formData.append("productImage", 'ASDASD')
      // await axios({
      //   method: 'POST',
      //   url: 'http://192.168.1.109:5000/post/UpdatePost',
      //   data: { formData },
      //   headers: {
      //     'Content-Type': ' multipart/form-data',
      //     'idpost': '61097f4873f40300223169bf',
      //   }
      // }).then(data => {
      //   console.log(data)
      // })
      //   .catch(e => console.log(e))
      const data = new FormData();
      data.append('action', 'ADD');
      data.append('param', 0);
      data.append('secondParam', 0);
      data.append('productImage', props.infoPost.image[0])
      console.log(data)
      // data.append('file', new Blob(['test payload'], { type: 'text/csv' }));

      // axios.post('http://192.168.1.109:5000/post/UpdatePost', data).then((data) => console.log(data)).catch(e => console.log(e));
    } catch (e) {
      alert(e)
    }
  }
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <ConfirmInfor></ConfirmInfor>
      <ButtonConfirm onPress={() => submitInfoPost()} />
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