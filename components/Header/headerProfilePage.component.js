import React, { useEffect, useRef } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { color } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import config from "../../config";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import * as SecureStore from "expo-secure-store";

//We will consider isLogin state and decide what will appear on the screen
function HeaderLoginPage(props) {
  const menu = useRef();
  const { dispatch } = props;
  const hideMenu = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("avatar");
    await SecureStore.deleteItemAsync("FullName");
    dispatch({ type: "SIGN_OUT" });
    props.onPress();
  };

  const showMenu = () => menu.current.show();
  if (props.message == "ProfilePage") {
    return (
      <>
        <View
          style={{
            height: config.heightStatusBar,
            width: "100%",
            backgroundColor: config.color_header_background,
          }}
        ></View>
        <View style={styles.wrapAll}>
          <View>
            <Text style={styles.Text}>Tài khoản</Text>
          </View>
          <View>
            <Menu
              style={styles.Settings}
              ref={menu}
              button={
                <Text onPress={showMenu}>
                  {" "}
                  <MaterialIcons
                    name="settings"
                    size={30}
                    color="#FFF"
                  ></MaterialIcons>
                </Text>
              }
            >
              <MenuItem
                onPress={() => {
                  hideMenu();
                }}
              >
                Đăng xuất
              </MenuItem>
              {/* <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
                    <MenuItem onPress={hideMenu} disabled>
                        Menu item 3
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
            </Menu>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <View style={styles.wrapAll}>
        <View>
          <Text style={styles.Text}>Tài khoản</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapAll: {
    // marginTop: config.heightStatusBar,
    height: config.header,
    backgroundColor: config.color_header_background,
    alignItems: "center",
    paddingLeft: "3%",
    paddingRight: "3%",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  Settings: {
    color: "#fff",
    fontSize: config.fontsize_3,
  },
  Text: {
    padding: 8,
    fontSize: config.fontsize_2,
    color: "#fff",
    fontWeight: "bold",
  },
  icon_settings: {},
});

export default connect(function (state) {
  return { auth: state.auth };
})(HeaderLoginPage);
