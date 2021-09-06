import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity, Dimensions
} from "react-native";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
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
var { width } = Dimensions.get("window");
function HeaderLoginPage(props) {
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const renderIcon = () => {
    if (props.icon == "history") {
      return (
        <MaterialIcons
          style={styles.History}
          name="history"
          color="#DDD"
          size={30}
        ></MaterialIcons>
      );
    }
    if (props.icon == "give") {
      return (
        <FontAwesome
          style={styles.History}
          name="heart"
          color="#DDD"
          size={30}
        />
      );
    }
    if (props.icon == "receive") {
      return (
        <Ionicons
          style={styles.History}
          name="ios-gift-outline"
          color="#DDD"
          size={30}
        />
      );
    }
  };
  return (
    <View>
      <TouchableOpacity style={styles.wrapAll} onPress={props.onPress}>
        {renderIcon()}
        <Text style={styles.Text}>{props.textTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapAll: {
    backgroundColor: "#fff",
    padding: "3%",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: "2%",
  },
  History: {
    paddingLeft: width*0.03,
  },
  Text: {
    paddingLeft: width*0.04,
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_400Regular",
  },
});

export default connect(function (state) {
  return { auth: state.auth };
})(HeaderLoginPage);
