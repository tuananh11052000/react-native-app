import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Alert
} from 'react-native';
import { connect } from 'react-redux'
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import TitleDetail from '../components/titleDetail.components';
import ButtonConfirm from '../components/buttonConfirm.components';

function Description(props) {
  const { dispatch } = props;
  const [isDisplay, setIsDisplay] = useState(false);
  const image = props.infoPost.image;
  const submitInfoPost = async () => {
    //api upload infor json
    setIsDisplay(true);
    const data = props.infoPost;
    axios({
      url: "https://api.smai.com.vn/post/CreatePost",
      method: "post",
      data: {
        title: data.title,
        note: data.note,
        address: data.address,
        TypeAuthor: data.TypeAuthor,
        NameProduct: data.NameProduct,
      },
      headers: {
        Accept: "application/json",
        Authorization: props.auth.token,
      },
    })
      .then((res) => {
        //sau khi upload json xong thi tien hanh upload hinh anh su dung idpost duoc tra ve
        if (props.infoPost.image[0]) {
          let apiUrl = "https://api.smai.com.vn/post/UpdatePost";
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
            mode: "cors",
            headers: {
              idpost: res.data.idpost,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: props.auth.token,
            },
          };
          fetch(apiUrl, options).then((res) => {
            setIsDisplay(false);
            dispatch({ type: "RESET" });
            navigation.navigate("Completed");
          });
        } else {
          setIsDisplay(false);
          dispatch({ type: "RESET" });
          navigation.navigate("Completed");
        }
      })
      .catch((err) => console.log(err));
  };
  //ham onpress kiem tra xem da nhap title hay chua

  const onPressFunc = () => {
    if (props.infoPost.title.trim() == '') {
      Alert.alert(
        "Th??ng b??o",
        "Vui l??ng nh???p ti??u ?????!",
        [
          { text: "OK" }
        ]
      );
    }
    else {
      submitInfoPost();
      // console.log(props.infoPost.image);
    }
    
  }

  const { navigation } = props;
  return (
    <View style={styles.container}>
      <TitleDetail onPress={() => navigation.navigate('Ch???n ???nh')} ></TitleDetail>
      <ButtonConfirm onPress={() => onPressFunc()} textBtn="????ng tin"/>
      <Spinner
        visible={isDisplay}
        textContent={"??ang x??? l?? y??u c???u..."}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default connect(function (state) {
  return { infoPost: state.infoPost, auth: state.auth, redirectComplete: state.redirectComplete, }
})(Description);