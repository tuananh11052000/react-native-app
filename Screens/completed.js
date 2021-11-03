import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import config from "../config";
var { width } = Dimensions.get("window");
import { connect } from "react-redux";
function Completed(props) {
  const { navigation, dispatch } = props;
  const renderText = () => {
    if (props.redirectComplete == "TCD") {
      return (
        <View style={styles.wrapText}>
          <Text style={styles.text1}>Đăng tin thành công</Text>
          <Text style={styles.text2}>Cộng động ai cần sẽ liên hệ bạn</Text>
        </View>
      );
    }
    if (props.redirectComplete == "LOINHAN") {
      // lời nhắn ở mục tin đăng của mình
      return (
        <View style={styles.wrapText}>
          <Text style={styles.text1}>Gửi tặng thành công</Text>
          <Text style={styles.text2}>Vui lòng vào kết nối để xem chi tiết</Text>
          <Text style={styles.text2}>Trân trọng!</Text>
        </View>
      );
    }
    if (props.redirectComplete == "CXD") {
      //lời nhắn đăng itn cần xin đồ
      return (
        <View style={styles.wrapText}>
          <Text style={styles.text1}>Đã tiếp nhận</Text>
          <Text style={styles.text2}>Vui lòng chờ xác thực. Trân trọng!</Text>
        </View>
      );
    }
    if (props.redirectComplete == "LOINHAN_CXD" || props.redirectComplete == "LOINHAN_DONE") {
      // hoàn thành khi để lại lời nhắn ở tin đăng cần xin đồ
      return (
        <View style={styles.wrapText}>
          <Text style={styles.text1}>Gửi tặng thành công</Text>
          <Text style={styles.text2}>Cảm ơn tấm lòng hảo tâm của bạn</Text>
          <Text style={styles.text2}>Trân trọng!</Text>
        </View>
      );
    }
    if (props.redirectComplete == "LOINHAN_TCD") {
      // hoàn thành khi để lại lời nhắn ở tin đăng tặng cộng đồng
      return (
        <View style={styles.wrapText}>
          <Text style={styles.text1}>Gửi lời nhắn thành công</Text>
          <Text style={styles.text2}>Vui lòng đợi phản hồi từ người tặng</Text>
          <Text style={styles.text2}>Trân trọng!</Text>
        </View>
      );
    }
    if (props.redirectComplete == "LOINHAN_CANCEL") {
      // hoàn thành khi để lại lời nhắn ở tin đăng tặng cộng đồng
      return (
        <View style={styles.wrapText}>
          <Text style={styles.text1}>Hủy thành công</Text>
        </View>
      );
    }
  };
  const pressComplete = () => {
    if (props.redirectComplete == "LOINHAN_TCD") {
      dispatch({ type: "setReload" });
      navigation.navigate("Home");
    }
    if (props.redirectComplete == "LOINHAN_CXD") {
      navigation.navigate("ListNeedSupport");
    }
    if (props.redirectComplete == "TCD" || props.redirectComplete == "CXD") {
      dispatch({ type: "setReload" });
      navigation.navigate("Notifications"); // move to  màn hình tin đăng
    }
    if (props.redirectComplete == "LOINHAN") {
      const id = props.idPost.idPost;
      dispatch({ type: "SET_XIN" });
      dispatch({ type: "setReload" });
      navigation.navigate("GiveFor", {
        name: "Danh sách lời nhắn",
        postId: id,
      });
    }
    if (props.redirectComplete == "LOINHAN_CANCEL" || props.redirectComplete == "LOINHAN_DONE") {
      navigation.navigate("connect");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.backgroundBox}>
        {renderText()}
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.buttonComplete}
          onPress={() => pressComplete()}
        >
          <Text style={styles.textComplete}>Xong</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  backgroundBox: {
    backgroundColor: "#FFF",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
  },
  wrapText: {
    marginBottom: "4%",
  },
  text1: {
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_600SemiBold",
  },
  text2: {
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_400Regular",
  },
  buttonComplete: {
    backgroundColor: "#E53935",
    paddingVertical: 5,
    borderRadius: 5,
    width: width * 0.2,
    alignItems: "center",
    marginTop: 15,
  },
  textComplete: {
    color: "#FFF",
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_600SemiBold",
  },
});

export default connect(function (state) {
  return {
    reloadPost: state.reloadPost,
    redirectComplete: state.redirectComplete,
    redirectTransaction: state.redirectTransaction,
    idPost: state.idPost,
  };
})(Completed);
