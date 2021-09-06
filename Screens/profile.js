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
import HistoryProfileComponent from "../components/Profile/historyProfile.component";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
import * as SecureStore from "expo-secure-store";
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
  const _pressRow = async () => {
    let result = await SecureStore.getItemAsync("token");
    if (result) {
      navigation.navigate("History"); //chuyển trang
    } else {
      navigation.replace("Authentication"); //chuyển trang
    }
  };
  const _pressListGiveTotal = () => {
    props.navigation.navigate("YouGiveTotal"); //chuyển trang
  };
  const _pressListReveiceTotal = () => {
    props.navigation.navigate("YouReceiveTotal"); //chuyển trang
  };
  return (
    <View style={styles.container}>
      <View style={styles.scrollview}>
        {/* <HeaderLoginPage
          message={"ProfilePage"}
          onPress={() => navigation.jumpTo("Feed")}
        /> */}
        <TopProfile
          onPress={() => navigation.replace("Authentication")}
          navigation={navigation}
        />
        <Text style={styles.Text}>Từ thiện</Text>
        <HistoryProfileComponent
          textTitle="Thống kê bạn tặng"
          icon="give"
          onPress={() => _pressListGiveTotal()}
        />
        <HistoryProfileComponent
          textTitle="Thống kê nhận tặng"
          onPress={() => _pressListReveiceTotal()}
          icon="receive"
        />
        <Text style={styles.Text}>Quản lý</Text>
        <HistoryProfileComponent
          textTitle="Lịch sử xem"
          icon="history"
          onPress={() => _pressRow()}
        />
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
    fontSize: config.fontsize_3,
    marginLeft: 20,
    color: "#7F7E85",
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
  },
  phonenumber: {
    maxWidth: "95%",
    minWidth: "90%",
    position: "absolute",
    left: "3%",
    bottom: 0,
    padding: "3%",
    // marginBottom: 5,
    flexDirection: "row",
    // justifyContent: 'space-between',
    // alignSelf: 'center',
  },
  textPhone: {
    fontFamily: "OpenSans_400Regular_Italic",
    fontSize: config.fontsize_5,
    color: "#000",
  },
  numPhone: {
    fontFamily: "OpenSans_400Regular_Italic",
    fontSize: config.fontsize_5,
    color: "#00a2e8",
  },
});

export default connect(function (state) {
  return { auth: state.auth };
})(ProfileScreen);
