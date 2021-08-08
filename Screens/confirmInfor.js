import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'

import ButtonConfirm from '../components/buttonConfirm.components';
import ConfirmInfor from '../components/confirminfor.components';

const heightStatusBar = StatusBar.currentHeight;
function ConfirmInforScreen(props) {
  const image = props.infoPost.image;
  const submitInfoPost = async () => {
    //api upload infor json
    const data = props.infoPost;
    axios({
      url: 'https://smai-app-api.herokuapp.com/post/CreatePost',
      method: 'post',
      data: {
        title: data.title,
        note: data.note,
        address: data.address,
        TypeAuthor: 'tangcongdong',
        NameProduct: data.NameProduct
      },
      headers: {
        Accept: "application/json",
        Authorization: props.auth.token
      }
    }).then(res => {
      //sau khi upload json xong thi tien hanh upload hinh anh su dung idpost duoc tra ve
      let apiUrl = "https://smai-app-api.herokuapp.com/post/UpdatePost";
      let formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        let uri = image[i].uri;
        let uriArray = uri.split(".");
        let fileType = uriArray[uriArray.length - 1];
        formData.append("productImage", {
          uri: uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
      let options = {
        method: "POST",
        body: formData,
        mode: 'cors',
        headers: {
          "idpost": res.data.idpost,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SUQiOiI2MGU5Y2M5ZjJkMzlkYzJkMTBkOGM2OWQiLCJpYXQiOjE2Mjc5OTkwNzh9.XxzvJigOW0GGSotGY69Xs-GxuEZ8DFxfRd5WzetDvgc'
        },
      };
      fetch(apiUrl, options).then(alert("ok"))
    }).catch(err => console.log(err))
  }
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