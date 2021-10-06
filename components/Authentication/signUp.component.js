import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { Button } from "galio-framework";
import config from "../../config";
import { TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
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

function SignUp(props) {
  const [showPass, showPassWord] = useState(true);
  const [showPass2, showPassWord2] = useState(true);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );
  const { dispatch, navigation, onPress } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const onSubmit = async (data) => {
    //Check xem sddt đã tồn tại hay chưa
    if (data.phonenumber) {
      await axios
        .post("https://api.smai.com.vn/account/getPhone", {
          PhoneNumber: data.phonenumber,
        })
        .then(async (res) => {
          if (res.data === "Oke") {
            let strphone = "+84" + data.phonenumber.substring(1);
            const phoneProvider = await new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              strphone,
              recaptchaVerifier.current
            );
            if (verificationId != null) {
              await dispatch({
                type: "REGISTER_OTP",
                username: data.username,
                phonenumber: data.phonenumber,
                password: data.password,
                verificationId: verificationId,
              });
            }
            props.navigation.navigate("VerifyOtps"); //chuyển trang
          } else {
        
            Alert.alert(
              "Thông báo",
              "Số điện thoại đã tồn tại",
              [
                { text: "OK" }
              ]
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.child_container}>
        <View style={styles.username}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                value={value}
                onChangeText={(value) => onChange(value)}
                label="Họ tên"
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
              />
            )}
            name="username"
            rules={{ required: "Yêu cầu nhập đầy đủ họ và tên", minLength: {
              value: 3,
              message: "Tên không hợp lệ",
            }, }}
            defaultValue=""
          />
        </View>
        {errors.username && (
          <Text style={styles.error}> {errors.username.message}</Text>
        )}

        <View style={styles.phonenumber}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Số điện thoại"
                keyboardType="numeric"
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
              />
            )}
            name="phonenumber"
            rules={{
              required: "Yêu cầu nhập số điện thoại",
              minLength: {
                value: 10,
                message: "Số điện thoại phải có 10 số",
              },
              maxLength: {
                value: 10,
                message: "Số điện thoại tối đa 10 số",
              },
            }}
            defaultValue=""
          />
        </View>
        {errors.phonenumber && (
          <Text style={styles.error}> {errors.phonenumber.message}</Text>
        )}

        <View style={styles.password}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Mật khẩu"
                secureTextEntry={showPass}
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
                right={
                  <TextInput.Icon
                    name="eye"
                    onPress={() => {
                      showPassWord(!showPass);
                    }}
                  />
                }
              />
            )}
            name="password"
            rules={{ required: "Yêu cầu nhập mật khẩu.", 
            minLength: {
              value: 6,
              message: "Mật khẩu phải ít nhất 6 ký tự",
            }, }}
            defaultValue=""
          />
        </View>
        {errors.password && (
          <Text style={styles.error}> {errors.password.message}</Text>
        )}

        <View style={styles.password}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Nhập lại mật khẩu"
                secureTextEntry={showPass2}
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
                right={
                  <TextInput.Icon
                    name="eye"
                    onPress={() => {
                      showPassWord2(!showPass2);
                    }}
                  />
                }
              />
            )}
            name="repassword"
            rules={{
              required: "Yêu cầu nhập mật khẩu.",
              validate: (value) => {
                if (value === getValues()["password"]) {
                  return true;
                } else {
                  return "Mật khẩu không trùng nhau";
                }
              },
            }}
            defaultValue=""
          />
        </View>
        {errors.repassword && (
          <Text style={styles.error}> {errors.repassword.message}</Text>
        )}
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        // attemptInvisibleVerification={true}
      />
      <View style={styles.layoutBtnLogin}>
        <Button
          onPress={handleSubmit(onSubmit)}
          color={config.color_btn_1}
          size="large"
        >
          <Text style={styles.btnLogin}>Đăng ký</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    alignItems: "center",
    backgroundColor: "#FFF",
    justifyContent: "space-between",
  },
  child_container: {
    alignItems: "center",
    backgroundColor: "#FFF",
    justifyContent: "space-around",
  },

  username: {
    height: "14%",
    maxWidth: "90%",
    minWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "4%",
  },
  phonenumber: {
    height: "14%",
    maxWidth: "90%",
    minWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "4%",
  },
  password: {
    height: "14%",
    maxWidth: "90%",
    minWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "4%",
  },
  textInput: {
    fontSize: config.fontsize_5,
    width: "95%",
    backgroundColor: "#FFF",
    fontFamily: "OpenSans_400Regular",
  },

  //btn
  layoutBtnLogin: {
    maxHeight: "10%",
    minHeight: "8%",
    maxWidth: "80%",
    minWidth: "70%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "5%",
  },
  btnLogin: {
    color: "white",
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_600SemiBold",
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    fontFamily: "OpenSans_400Regular",
  },
});

export default connect(function (state) {
  return { auth: state.auth, register: state.register };
})(SignUp);
