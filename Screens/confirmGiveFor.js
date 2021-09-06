import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Modal,
  TouchableOpacity,
  Alert
} from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import InforAddress from "../components/nameAndAddress.component";
import ButtonCofirm from "../components/buttonConfirm.components";
import Spinner from "react-native-loading-spinner-overlay";
function ConfirmGiveFor(props) {
  const [isDisplay, setIsDisplay] = useState(false);
  const { dispatch, navigation } = props;
  let detailPost = props.route.params.data;
  const pressConfirm = () => {
    dispatch({ type: "COMPLETE_GIVEFOR" });
    dispatch({ type: "RESET" });
    navigation.navigate("Completed");
  };
  const submitInfoPost = async () => {
    if (props.infoPost.noteTransac.trim() == "") {
      Alert.alert("Thông báo", "Vui lòng nhập mô tả", [
        { text: "OK" },
      ]);
    } else {
      //api upload infor json
    setIsDisplay(true);
    const data = props.infoPost;
    let apiUrl =
      "https://smai-app-api.herokuapp.com/transaction/create-transaction";
    let formData = new FormData();
    //sau khi upload json xong thi tien hanh upload hinh anh su dung idpost duoc tra ve
    if (props.infoPost.image[0]) {
      let listImage = props.infoPost.image;
      for (let i = 0; i < listImage.length; i++) {
        let uri = listImage[i].uri;
        let uriArray = uri.split(".");
        let fileType = uriArray[uriArray.length - 1];
        formData.append("productImage", {
          uri: uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
    }
    formData.append("note", data.noteTransac);
    formData.append("receiverID", detailPost.AuthorID);
    formData.append("postID", detailPost._id);
    formData.append("isConfirm", false);
    formData.append("isConnect", false);
    formData.append("senderAddress", data.address);
    let options = {
      method: "POST",
      body: formData,
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: props.auth.token,
      },
    };
    fetch(apiUrl, options).then(res => {
      setIsDisplay(false);
      dispatch({ type: "COMPLETE_GIVEFOR" });
      dispatch({ type: "RESET" });
      navigation.navigate("Completed");
    }).catch(err => {console.log(err)});
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <InforAddress onPress={() => navigation.navigate("Chọn ảnh")} />
      <View style={{ backgroundColor: "#DDD" }}>
        <ButtonCofirm textBtn="Gửi tặng" onPress={() => submitInfoPost()} />
      </View>
      <Spinner
        visible={isDisplay}
        textContent={"Đang xử lý yêu cầu..."}
        textStyle={styles.spinnerTextStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default connect(function (state) {
  return {
    redirectComplete: state.redirectComplete,
    infoPost: state.infoPost,
    auth: state.auth,
  };
})(ConfirmGiveFor);
