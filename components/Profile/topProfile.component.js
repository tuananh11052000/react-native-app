import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Avatar } from "react-native-elements";

import { connect } from "react-redux";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import config from "../../config";
import * as SecureStore from "expo-secure-store";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
var { width } = Dimensions.get("window");
//check token
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
//We will consider isLogin state and decide what will appear on the screen
function TopProfile(props) {
  const [FullName, getName] = useState("");
  const [isDisplay, setDisplay] = useState(false);
  const [avatar, getAvatar] = useState("");

  //Ham mo thu vien anh
  let openImagePickerAsync = async () => {
    let token = await SecureStore.getItemAsync("token");
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled == true) setDisplay(false);
    else {
      setDisplay(true);
      let apiUrl = "https://api.smai.com.vn/user/profileUser";
      let formData = new FormData();
      let uri = pickerResult.uri;
      let uriArray = uri.split(".");
      let fileType = uriArray[uriArray.length - 1];
      formData.append("imageUser", {
        uri: uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      let options = {
        method: "POST",
        body: formData,
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };
      fetch(apiUrl, options).then(async (data) => {
        await axios({
          method: "get",
          url: "https://api.smai.com.vn/user/getInForUserByTokenId",
          headers: {
            Authorization: token,
          },
        }).then(async (data) => {
          await SecureStore.setItemAsync("avatar", data.data.urlIamge).then(
            (data_) => {
              getAvatar({ ...avatar, data: data.data.urlIamge });
              setDisplay(false);
            }
          );
        });
      });
    }
  };
  useEffect(() => {
    const getAvtFunc = async () => {
      if (props.auth.isLogin == true) {
        let avatar_ = props.profile.avatar;
        let Name = await SecureStore.getItemAsync("FullName");
        let avatar = await SecureStore.getItemAsync("avatar");
        getAvatar(avatar);
        getName(Name);
      }
    };
    getAvtFunc();
  }, [props.auth]);
  const renderOnloading = () => {
    if (isDisplay == true) {
      return (
        <View style={styles.overlay_}>
          <ActivityIndicator size="small" color="white" />
        </View>
      );
    }
  };
  //font
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderAvatar = () => {
    if (avatar)
      return (
        <View>
          <Avatar
            size={width*0.15}
            rounded
            source={{ uri: avatar }}
            containerStyle={styles.avatarContainer}
          ></Avatar>
          {renderOnloading()}
          <Avatar.Accessory
            size={25}
            position="relative"
            onPress={() => {
              openImagePickerAsync();
            }}
          />
        </View>
      );
    else
      return (
        <View>
          <EvilIcons name="user" size={width*0.1} color="#CCC" />
          {renderOnloading()}
          <Avatar.Accessory
            size={25}
            position="relative"
            onPress={() => {
              openImagePickerAsync();
            }}
          />
        </View>
      );
  };
  if (props.auth.isLogin == false) {
    return (
      <View style={styles.wrapAll}>
        <MaterialIcons name="account-circle" size={width*0.15} color="#BDBDBD" />
        <View style={styles.login}>
          <Button
            onPress={props.onPress}
            title="Đăng nhập/Đăng ký"
            buttonStyle={styles.buttonLogIn}
            titleStyle={styles.titleStyle}
            type="outline"
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.wrapAll}>
        {renderAvatar()}
        <View
          style={{
            marginLeft: "5%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.text}>{FullName}</Text>
          </View>

          <View style={styles.container}>
            <MaterialIcons
              name="person-outline"
              size={width * 0.05}
              color="#BDBDBD"
            ></MaterialIcons>
            <Text style={styles.text_person}>Cá nhân</Text>
          </View>
        </View>
      </View>
    );
  }
  {
    /* */
  }
}

const styles = StyleSheet.create({
  wrapAll: {
    height: width*0.2,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingLeft: '3%',
    alignItems: "center",
    width: "100%",
  },
  wrap_avatar: {
    height: width*0.3,
    width: width*0.3,
    backgroundColor: "red",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    minWidth: "60%",
    maxWidth: "60%",
    maxHeight: "auto",
    minHeight: "60%",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: "5%",
  },
  text: {
    marginTop: "2%",
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_400Regular",
  },
  text_person: {
    marginLeft: "3%",
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_400Regular",
    color: "gray",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: '2%',
  },
  buttonLogIn: {
    borderColor: config.color_btn_1,
  },
  titleStyle: {
    color: config.color_btn_1,
    fontSize: config.fontsize_2,
  },
  avatar: {
    marginTop: "20px",
  },
  overlay_: {
    position: "absolute",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.3,
    borderRadius: 47,
  },
});

export default connect(function (state) {
  return { auth: state.auth, profile: state.profile };
})(TopProfile);
