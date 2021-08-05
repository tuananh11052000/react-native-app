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
  data.append('productImage', {
    name: photo.filename,
    uri: photo.uri,
    type: "image/jpg"
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
  const formData = createFormData(photo)
  console.log(formData)
  const temp = new FormData();
  temp.append('test', "testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
  const submitInfoPost = async () => {
    try {
      await axios({
        method: 'POST',
        url: 'http://192.168.1.109:5000/post/UpdatePost',
        data: { temp },
        headers: {
          "idpost": "60e9cdad59830c00223acd9d",
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "Content-Type": 'multipart/form-data; boundary=----WebKitFormBoundaryZG2q9qc0mxF0HhPL',
          "Authorization": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SUQiOiI2MGU5Y2M5ZjJkMzlkYzJkMTBkOGM2OWQiLCJpYXQiOjE2Mjc5MjMzNzB9.8VukL4etrnPJezZYXTCkAum3zDuf2t_4ERP6RKNhJFk`,
        }
      }).then(data => {
        data.idpost
      })
        .catch(e => console.log(e))
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