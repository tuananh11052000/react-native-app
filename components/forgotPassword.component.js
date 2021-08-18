import React, {  useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {TextInput } from "react-native-paper";
import OTPTextView from "react-native-otp-textinput";
import axios from "axios";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
try {
  firebase.initializeApp({
    apiKey: "AIzaSyDJ89qLqhx9tv-r7DVKV5mtgAtm8SJGNMY",
    authDomain: "smai-react-navtive.firebaseapp.com",
    projectId: "smai-react-navtive",
    storageBucket: "smai-react-navtive.appspot.com",
    messagingSenderId: "512665456682",
    appId: "1:512665456682:web:c3fdddeca7b4b0abd27353",
    measurementId: "G-2KFPXH5YFL",
  });
} catch (err) {
  // ignore app already initialized error in snack
}
function ForgotPassword(props) {
  const { dispatch, navigation, onPress } = props;
  const [PhoneNumber, onChangePhone] = useState("");
  const [error, setError] = useState(null);
  const [otpInput, setotpInput] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const onCheckPhoneNumber = async () => {
    if (PhoneNumber.length != 10) {
      setError("Nhập đủ 10 số");
    } else {
      setError(null);
      await axios
        .post("https://smai-app-api.herokuapp.com/account/getPhone", {
          PhoneNumber: PhoneNumber,
        })
        .then(async (res) => {
          if (res.data == "PhoneNumber already taken") {
            let strphone = "+84" + PhoneNumber.substring(1);
            const phoneProvider = await new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              strphone,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
          }
          else  {
            alert("Số điện thoại không tồn tại");
          } 
        });
    }
  };
  const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        otpInput
      );
      await firebase
        .auth()
        .signInWithCredential(credential)
        .then(async() => {
          await onChangePhone("")
          await setotpInput("")
          await dispatch({
            type: "RESET_PASSWORD",
            phonenumber: PhoneNumber,
           
          });
         await props.navigation.navigate("NewPassword");
        });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={styles.wrapContent}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        // attemptInvisibleVerification={true}
      />
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
      {error && <Text style={styles.error}> {error}</Text>}
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={onCheckPhoneNumber}
      >
        <Text style={styles.btnText}>Xác nhận số điện thoại</Text>
      </TouchableOpacity>
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
    paddingHorizontal: "14%",
    backgroundColor: "#EBEBEB",
    borderRadius: 5,
  },
  btnText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    marginTop: 35,
    paddingVertical: 5,
    paddingHorizontal: "32%",
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
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
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
  error: {
    color: "#bf1650",
    alignSelf: "flex-start",
  },
});
export default connect(function(state){
  return { register: state.register };
})(ForgotPassword);