import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
const heightStatusBar = StatusBar.currentHeight; //lay ra chieu cao cua thanh trang thai

export default function ForgotPassword(props) {
  return (
    <View style={styles.wrapContent}>
      {/* <Text style={styles.styleText}>Nhập số điện thoại:</Text> */}
      <View style={styles.username}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangePhone(text)}
          label="Số điện thoại"
          keyboardType="numeric"
          theme={{
            colors: {
              primary: "gray",
            },
          }}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={props.onPress}
      >
        <Text style={styles.btnText}>Xác nhận số điện thoại</Text>
      </TouchableOpacity>
      <Text style={styles.styleText}>Nhập mã OTP</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={props.onPress}
      >
        <Text style={styles.buttonText}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapContent: {
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // flex: 1,
    // paddingTop: '5%',
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FFF",
    // justifyContent: 'space-between',
  },
  styleText: {
    marginBottom: 30,
    fontSize: 16,
    // marginLeft: 10,
  },
  btn: {
    // width: "90%",
    marginBottom: "15%",
    paddingVertical: 8,
    paddingHorizontal: "20%",
    backgroundColor: "#EBEBEB",
    borderRadius: 5,
  },
  btnText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    // width: "90%",
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: "38%",
    backgroundColor: "#E53935",
    borderRadius: 5,
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
  },
  optStyle: {
    flexDirection: "row",
    marginBottom: 60,
  },
  optInput: {
    borderWidth: 0.5,
    // borderColor: "red",
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 4,
    paddingVertical: 6,
    fontSize: 16,
    textAlign: "center",
  },
  textInput: {
    fontSize: 20,
    width: "95%",
    backgroundColor: "#FFF",
  },
  username: {
    height: "10%",
    maxWidth: "90%",
    minWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "15%",
  },
});
