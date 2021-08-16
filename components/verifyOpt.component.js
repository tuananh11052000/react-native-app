import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import OtpBox from "./otpBox.component";
import logoSmai from "../assets/logo_smai.png";
import { connect } from "react-redux";
import OTPTextView from "react-native-otp-textinput";
import * as firebase from "firebase";
function VerifyOtp(props) {
  const [otpInput, setotpInput] = useState("");
  const [inputText, setinputText] = useState("");
  console.log(props.register);
  const confirmCode = () => {
    if (otpInput.length != 6) {
      alert("Nhập đầy đủ 6 số");
    } else {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        props.register.verificationId,
        otpInput
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error("The Promise is rejected!", error);
        });;
    }
  };
  return (
    <View style={styles.wrapContent}>
      <Image source={logoSmai} style={styles.styleImg} />
      <Text style={styles.styleText}>Nhập mã OTP</Text>
      <View style={styles.container}>
        <OTPTextView
          handleTextChange={(e) => setotpInput(e)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={confirmCode}
      >
        <Text style={styles.buttonText}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  styleImg: {
    height: 180,
    width: 80,
    marginBottom: 60,
  },
  styleText: {
    marginBottom: 30,
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    paddingVertical: 5,
    paddingHorizontal: "30%",
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
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#F5FCFF",
    padding: 5,
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 1,
    width: "10%",
    height: "100%",
    fontSize: 18,
  },
});
export default connect(function (state) {
  return { register: state.register };
})(VerifyOtp);
