import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { Button, View, Text, TextInput, Image, StyleSheet } from "react-native";

import Search from "./Screens/seachScreen";
import ConfirmAddress from "./Screens/confirmAddress";
import Category from "./Screens/category";
import Description from "./Screens/description";
import CustomeTabNav from "./handleTabNav";
import ConfirmInforScreen from "./Screens/confirmInfor";
import Completed from "./Screens/completed";
import Authentication from "./Screens/login";
import PostType from "./Screens/newpostType";
import WhoConfirm from "./Screens/whoConfirm";
import DetailPost from "./Screens/detailPost";
import PickerImage from "./Screens/pickerImage";
import config from "./config";
import CreatePost from "./Screens/createPost";
import HistoryPage from "./Screens/historyPage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppNavigator(props) {
  const { navigation } = props;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={CustomeTabNav}
          options={{
            headerShown: false,
            title: "Trang chủ",
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={({ navigation }) => ({
            title: "Tìm kiếm",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
        <Stack.Screen name="ConfirmAddress" component={ConfirmAddress} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Description" component={Description} />
        <Stack.Screen
          name="ConfirmInforScreen"
          component={ConfirmInforScreen}
          options={({ navigation }) => ({
            title: "Confirm ",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
        <Stack.Screen
          name="Completed"
          component={Completed}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostType"
          component={PostType}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WhoConfirm"
          component={WhoConfirm}
          options={({ navigation }) => ({
            title: "Bạn là ai",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              // fontWeight: "bold",
            },
          })}
        />
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={({ navigation }) => ({
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate("Home")}
              ></HeaderBackButton>
            ),
            title: "Tài khoản",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
        <Stack.Screen
          name="DetailPost"
          component={DetailPost}
          options={{
            title: "Chi tiết bài đăng",
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryPage}
          options={({ navigation }) => ({
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate("Home")}
              ></HeaderBackButton>
            ),
            title: "Lịch sử xem",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
       
        <Stack.Screen
          name="PickImage"
          component={PickerImage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
