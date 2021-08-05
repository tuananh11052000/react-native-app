import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'
import FormData from 'form-data'

import ButtonConfirm from '../components/buttonConfirm.components';
import ConfirmInfor from '../components/confirminfor.components';

const heightStatusBar = StatusBar.currentHeight;
const photo = {
  "albumId": "-1313584517",
  "creationTime": 1627833124565,
  "duration": 0,
  "filename": "Screenshot_20210801-225204_Facebook.jpg",
  "height": 2400,
  "id": "3215",
  "mediaType": "photo",
  "modificationTime": 1627833124000,
  "uri": "file:///storage/emulated/0/DCIM/Screenshots/Screenshot_20210801-225204_Facebook.jpg",
  "width": 1080,
};
const createFormData = (photo) => {
  const data = new FormData();
  data.append('file', {
    name: photo.filename,
    uri: photo.uri
  });

  return data;
};
function ConfirmInforScreen(props) {
  //ham thuc hien khi nhan vao button xac thuc
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
  let url = 'http://192.168.1.109:5000/post/UpdatePost';
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  let formdata = new FormData();
  // image from CameraRoll.getPhotos(
  formdata.append("data", "lalal")
  formdata.append("files", {});
  xhr.send(formdata)

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