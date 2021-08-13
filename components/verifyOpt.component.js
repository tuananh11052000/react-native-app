import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import logoSmai from "../assets/logo_smai.png";

export default function VerifyOtp(props) {
  return (
    <View style={styles.wrapContent}>
      <Image source={logoSmai} style={styles.styleImg} />
      <Text style={styles.styleText}>Nhập mã OTP</Text>
      <OTPInputView
        handleChange={(code) => console.log(code)}
        numberOfInputs={6}
        style={styles.optStyle}
        inputStyles={styles.optInput}
      />
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
    // width: "90%",
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 100,
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
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 4,
    paddingVertical: 6,
    fontSize: 16,
    textAlign: "center",
  },
});
