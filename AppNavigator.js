import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux'

import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { Button, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

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
import PostDonation from "./Screens/donationComunity";
import VerifyOtps from "./Screens/verifyOtp";
import GiveFor from "./Screens/giveFor";
import ForgotPasswords from "./Screens/forgotPassword";
import FilterDonationComunity from "./Screens/FilterDonationComunity";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppNavigator(props) {
  const { navigation, dispatch } = props;
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
        <Stack.Screen
          name="ConfirmAddress"
          component={ConfirmAddress}
          options={({ navigation }) => ({
            title: "Xác nhận địa chỉ ",
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
          name="Category"
          component={Category}
          options={({ navigation }) => ({
            title: "Danh mục ",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.wrapTextCancel}
                onPress={() => {
                  Alert.alert(
                    "Thông báo",
                    "Bạn có chắc muốn hủy!",
                    [
                      {
                        text: "Không",
                        style: "cancel"
                      },
                      { text: "Có",style: "cancel", onPress: () => navigation.navigate("Home") }
                    ]
                  );
                  
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
            headerBackTitle: "some label",

            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate("ConfirmAddress")}
                tintColor={"white"}
                label="Quay lại" //back
              />
            ),
          })}
        />
        <Stack.Screen
          name="Description"
          component={Description}
          options={({ navigation }) => ({
            title: "Mô tả",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.wrapTextCancel}
                onPress={() => {
                  Alert.alert(
                    "Thông báo",
                    "Bạn có chắc muốn hủy!",
                    [
                      {
                        text: "Không",
                        style: "cancel"
                      },
                      { text: "Có",style: "cancel", onPress: () => navigation.navigate("Home") }
                    ]
                  );
                  
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  dispatch({ type: 'RESET_SCREEN_INFORMATION' })
                  navigation.navigate("ConfirmAddress");
                }}
                tintColor={"white"}
                label="Quay lại" //back
              />
            ),
          })}
        />
        <Stack.Screen
          name="ConfirmInforScreen"
          component={ConfirmInforScreen}
          options={({ navigation }) => ({
            title: "Xác nhận thông tin",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.wrapTextCancel}
                onPress={() => {
                  Alert.alert(
                    "Thông báo",
                    "Bạn có chắc muốn hủy!",
                    [
                      {
                        text: "Không",
                        style: "cancel"
                      },
                      { text: "Có",style: "cancel", onPress: () => navigation.navigate("Home") }
                    ]
                  );
                  
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
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
          options={({ navigation }) => ({
            title: "Loại tin",
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
                tintColor={"white"}
                label="Trang chủ" //back
              />
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
                tintColor={"white"}
                label="Quay lại" //back
              />
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
          name="FilterDonationComunity"
          component={FilterDonationComunity}
          options={({ navigation }) => ({
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate("PostDonation")}
                tintColor={"white"}
                label="Quay lại" //back
              />
            ),
            title: "Danh mục",
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
        <Stack.Screen
          name="PostDonation"
          component={PostDonation}
          options={({ navigation }) => ({
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate("Home")}
                tintColor={"white"}
                label="Quay lại" //back
              />
            ),
            title: "Tin tặng cộng đồng",
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
          name="VerifyOtps"
          component={VerifyOtps}
          options={({ navigation }) => ({
            title: "Xác nhận OTP",
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
          name="GiveFor"
          component={GiveFor}
          options={({ navigation }) => ({
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate("Category")}
                tintColor={"white"}
                label="Quay lại" //back
              />
            ),
            title: "Gửi tặng đến",
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
          name="ForgotPasswords"
          component={ForgotPasswords}
          options={({ navigation }) => ({
            title: "Quên mật khẩu",
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  wrapTextCancel: {
    marginRight: 10,
  },
  textCancel: {
    color: "#FFF",
    fontSize: 18,
    marginRight: 10,

  },
});


export default connect(function (state) {
  return { infoPost: state.infoPost }
})(AppNavigator);

