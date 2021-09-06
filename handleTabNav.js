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
import ProfileStackk from './ProfileStack';
import {
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert, Dimensions
} from "react-native";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
var { width } = Dimensions.get("window");
const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = (props) => {
  const menu = useRef();
  const { dispatch, navigation } = props;
  const showMenu = () => menu.current.show();
  const hideMenu = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("avatar");
    await SecureStore.deleteItemAsync("FullName");
    dispatch({ type: "SIGN_OUT" });
    navigation.jumpTo("Feed")
  };
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
                <Text onPress={showMenu}><MaterialIcons name="settings" size={30} color="#FFF"></MaterialIcons></Text>
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
};
const ConnectionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Kết nối"
        component={Connection}
        options={{
          headerLeft: null,
          headerShown: true,
          headerStyle: {
            backgroundColor: config.color_header_background,
          },
          headerTintColor: config.headerTintColor,
        }}
      />
    </Stack.Navigator>
  );
};

const CreatePostStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tin đăng"
        component={createPost}
        options={{
          headerLeft: null,
          headerShown: true,
          headerStyle: {
            backgroundColor: config.color_header_background,
          },
          headerTintColor: config.headerTintColor,
          headerTitleStyle: {
            // fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

function CustomeTabNav(props) {
  const {navigation, dispatch} = props;
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: config.color_header_background,
        labelStyle: {
          fontSize: config.fontsize_3,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeStack}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="connect"
        component={ConnectionStack}
        options={{
          tabBarLabel: "Kết nối",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="share" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={CreatePostStack}
        options={{
          tabBarLabel: "Tin đăng",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackk}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default connect(function(state) {
  return { auth: state.auth };
})(CustomeTabNav)