import * as React from "react";
import { View, StyleSheet, Dimensions, StatusBar, Text } from "react-native";
import { TabView, SceneMap, TabBar, Tabs } from "react-native-tab-view";
import Login from "../components/Authentication/login.component";
import SignUp from "../components/Authentication/signUp.component";
import HeaderLoginPage from "../components/Header/headerProfilePage.component";
import config from "../config";

const heightStatusBar = StatusBar.currentHeight; //lay ra chieu cao cua thanh trang thai

export default function Authentication(props) {
  const { navigation } = props;
  const FirstRoute = () => (
    <View style={styles.scene}>
      <Login
        onPress={() => navigation.navigate("Home")}
        navigation={navigation}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.scene}>
      <SignUp
        onPress_={() => navigation.navigate("Home")}
        navigation={navigation}
      />
    </View>
  );

  const initialLayout = { width: Dimensions.get("window").width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "ĐĂNG NHẬP" },
    { key: "second", title: "ĐĂNG KÝ" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <>
      {/* <HeaderLoginPage message={'LoginPage'} /> */}

      <TabView
        navigationState={{ index, routes }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={({ route, color }) => (
              <Text style={styles.titleText}>{route.title}</Text>
            )}
            style={{ backgroundColor: "white", tabBarInactiveTextColor: "red" }}
            underlineColor="#000"
            indicatorStyle={{ height: 2, backgroundColor: config.color_btn_1 }}
          />
        )}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  titleText: {
    color: "black",
    marginVertical: 5,
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
  },
});
