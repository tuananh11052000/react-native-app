import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Button } from "galio-framework";
import config from "../../config";
import { TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

// async function save(key, value) {
//     await SecureStore.setItemAsync(key, value);
// }

// async function getValueFor(key) {
//     let result = await SecureStore.getItemAsync(key);
//     if (result) {
//         alert(result)
//         return result;
//     } else {
//         return "null"
//     }
// }

function SignUp(props) {
  //   const { dispatch, navigation, onPress } = props;
  //   const [UserName, onChangeName] = useState("");
  //   const [PhoneNumber, onChangePhone] = useState("");
  //   const [Password, onChangePass] = useState("");
  //   const [RePassword, onChangeRePass] = useState(" ");
  const [showPass, showPassWord] = useState(true);
  const [showPass2, showPassWord2] = useState(true);
  //   const [errorPhoneNumber, seterrorPassword] = useState("");

  //   const loginFunction = async (UserName, PhoneNumber, Password, RePassword) => {
  //     if (UserName === "") {
  //       seterrorPassword("Yêu cầu nhập họ và tên.");
  //     } else {
  //       seterrorPassword("");
  //     }
  //     if (PhoneNumber === "") {
  //       seterror("Yêu cầu nhập số điện thoại");
  //     }

  //     //   await axios
  //     //     .post("https://smai-app-api.herokuapp.com/account/register", {
  //     //       UserName: UserName,
  //     //       PhoneNumber: PhoneNumber,
  //     //       Password: Password,
  //     //     })
  //     //     .then(async (data) => {
  //     //       if (data.status == 201) {
  //     //         await save("token", data.data.accessToken);
  //     //         if (props.auth.token == "null") {
  //     //           dispatch({
  //     //             type: "SIGN_IN",
  //     //             token: data.data.accessToken,
  //     //             PhoneNumber: PhoneNumber,
  //     //           });
  //     //           props.onPress_();
  //     //         }
  //     //       }
  //     //     })
  //     //     .catch((e) => alert("Tài khoản đã tồn tại"));
  //   };

  // const password = useRef({});
  //   <TextInput
  //                 style={styles.textInput}
  //                 onChangeText={(text) => onChangeName(text)}
  //                 label="Họ tên"
  //                 theme={{
  //                   colors: {
  //                     primary: "gray",
  //                   },
  //                 }}
  //               />
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
const onSubmit = (data) => console.log(data.password);

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
            rules={{ required: "Yêu cầu nhập đầy đủ họ và tên" }}
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
            rules={{ required: "Yêu cầu nhập mật khẩu." }}
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
    fontSize: 20,
    width: "95%",
    backgroundColor: "#FFF",
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
    fontSize: 20,
  },
  error: {
    color: "#bf1650",
    alignSelf: "flex-start",
  },
});

export default connect(function (state) {
  return { auth: state.auth };
})(SignUp);
