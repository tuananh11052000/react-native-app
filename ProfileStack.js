import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import Home from "./Screens/home";
import ProfileScreen from "./Screens/profile";
import createPost from "./Screens/createPost";
import Connection from "./Screens/connect";
import config from "./config";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import * as SecureStore from "expo-secure-store";
import {
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function ProfileStack(props) {
  const menu = useRef();
  const { dispatch, navigation } = props;
  const showMenu = () => menu.current.show();
  const hideMenu = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("avatar");
    await SecureStore.deleteItemAsync("FullName");
    dispatch({ type: "SIGN_OUT" });
    navigation.jumpTo("Feed");
  };
  if (props.auth.isLogin == true) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Tài khoản"
          component={ProfileScreen}
          options={({ navigation }) => ({
            headerLeft: null,
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerRight: () => (
              <Menu
                ref={menu}
                button={
                  <Text onPress={showMenu} style={{ marginRight: 20 }}>
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
              </Menu>
            ),
          })}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Tài khoản"
          component={ProfileScreen}
          options={({ navigation }) => ({
            headerLeft: null,
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
          })}
        />
      </Stack.Navigator>
    );
  }
}

export default connect(function (state) {
  return { auth: state.auth };
})(ProfileStack);
