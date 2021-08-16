import React, { Component, useState, useRef } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";

import OTPTextView from "react-native-otp-textinput";

export default function OtpBox(Props) {
  const [otpInput, setotpInput] = useState("");
  const [inputText, setinputText] = useState("");
 
  return (
    <View style={styles.container}>
      <OTPTextView
        handleTextChange={(e) =>setinputText(e)}
        containerStyle={styles.textInputContainer}
        textInputStyle={styles.roundedTextInput}
        inputCount={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18
  },
});
