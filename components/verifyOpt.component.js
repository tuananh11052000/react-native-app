import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// if (Platform.OS === "ios") {
//   import OTPInputView from "@twotalltotems/react-native-otp-input";
// } else {
//   import OtpInputs from "react-native-otp-inputs";
// }

// import OTPInputView from "@twotalltotems/react-native-otp-input";
// import OtpInputs from "react-native-otp-inputs";


// export default function VerifyOtp(props) {
//   let optInput;
  // if (Platform.OS === "ios") {
  //   //switch for ios
  //   optInput = (
  //     <OTPInputView
  //       handleChange={(code) => console.log(code)}
  //       numberOfInputs={6}
  //       style={styles.optStyle}
  //       inputStyles={styles.optInput}
  //     />
  //   );
  // } else {
  //   //check box
  //   optInput = (
  //     <OtpInputs
  //       handleChange={(code) => console.log(code)}
  //       numberOfInputs={6}
  //       style={styles.optStyle}
  //       inputStyles={styles.optInput}
  //     />
  //   );
  
import OtpBox from "./otpBox.component"
import logoSmai from "../assets/logo_smai.png";

export default function VerifyOtp(props) {

  return (
    <View style={styles.wrapContent}>
      <Image source={logoSmai} style={styles.styleImg} />
      <Text style={styles.styleText}>Nhập mã OTP</Text>

      {/* {optInput} */}
      {/* <OTPInputView
        handleChange={(code) => console.log(code)}
        numberOfInputs={6}
        style={styles.optStyle}
        inputStyles={styles.optInput}
      /> */}
      {/* <OtpInputs
        handleChange={(code) => console.log(code)}
        numberOfInputs={6}
        style={styles.optStyle}
        inputStyles={styles.optInput}
      /> */}

      <OtpBox />

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
});
