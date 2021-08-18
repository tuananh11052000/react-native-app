import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";

import config from "../../config";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
//We will consider isLogin state and decide what will appear on the screen
function HeaderLoginPage(props) {
  const _pressRow = async () => {
    let result = await SecureStore.getItemAsync("token");
    if (result) {
      props.navigation.navigate("History"); //chuyển trang
    } else {
      props.navigation.navigate("Authentication"); //chuyển trang
    }
  };
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View>
      <TouchableOpacity style={styles.wrapAll} onPress={() => _pressRow()}>
        <MaterialIcons
          style={styles.History}
          name="history"
          size={30}
        ></MaterialIcons>
        <Text style={styles.Text}>Lịch sử xem</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapAll: {
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
    width: "100%",
    alignItems: "center"
  },
  History: {
    paddingLeft: 10,
  },
  Text: {
    paddingLeft: 10,
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_400Regular",
  },
});

export default connect(function (state) {
  return { auth: state.auth };
})(HeaderLoginPage);
