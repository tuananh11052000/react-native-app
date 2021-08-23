import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import config from "../config";
import TopProfile from "../components/Profile/topProfile.component";
import HeaderLoginPage from "../components/Header/headerProfilePage.component";
import HistoryProfileComponent from "../components/Profile/historyProfile.component";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";

//const heightStatusBar = StatusBar.currentHeight;
function ProfileScreen(props) {
  const { navigation } = props;
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
    <View style={styles.container}>
      <View style={styles.scrollview}>
        <HeaderLoginPage
          message={"ProfilePage"}
          onPress={() => navigation.jumpTo("Feed")}
        />
        <TopProfile
          onPress={() => navigation.replace("Authentication")}
          navigation={navigation}
        />
        <Text style={styles.Text}>Quản lý</Text>
        <HistoryProfileComponent
          navigation={navigation}
        ></HistoryProfileComponent>
      </View>

      <View style={styles.phonenumber}>
        <Text style={styles.textPhone}>Hotline hỗ trợ: </Text>
        <Text
          style={styles.numPhone}
          onPress={() => {
            Linking.openURL("tel:0938516899");
          }}
        >
          0938. 51. 68. 99
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  scrollview: {
    flex: 1,
    width: "100%",
  },
  Text: {
    paddingVertical: 10,
    fontSize: 18,
    marginLeft: 20,
    color: "#7F7E85",
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
  },
  phonenumber: {
    maxWidth: "95%",
    minWidth: "90%",
    position: "absolute",
    bottom: 0,
    padding: 15,
    // marginBottom: 5,
    flexDirection: "row",
    // justifyContent: 'space-between',
    // alignSelf: 'center',
  },
  textPhone: {
    fontFamily: "OpenSans_400Regular_Italic",
    fontSize: 18,
    color: "#000",
  },
  numPhone: {
    fontFamily: "OpenSans_400Regular_Italic",
    fontSize: 18,
    color: "#00a2e8",
  },
});

export default connect(function (state) {
  return { auth: state.auth };
})(ProfileScreen);
