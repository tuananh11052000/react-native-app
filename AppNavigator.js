import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";

import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import {
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

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
import CategoryCheckBox from "./Screens/categoryNeedSomeThing";
import NewPassword from "./Screens/newPassword";
import Announce from "./Screens/announce";
import ServiceCharity from "./Screens/serviceCharity";
import MedicalAdvise from "./Screens/medicalAdvice";
import ConfirmGiveFor from './Screens/confirmGiveFor';
import YouGive from "./Screens/youGive";
import YouReceive from "./Screens/youReceive";
import YouGiveTotal from "./Screens/youGiveTotal";
import YouReceiveTotal from "./Screens/youReceiveTotal";
import DetailConnectPost from "./Screens/detailConnectPost";
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
            headerShown: false,
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
            headerShown: false,
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
                  Alert.alert("Thông báo", "Bạn có chắc muốn hủy!", [
                    {
                      text: "Không",
                      style: "cancel",
                    },
                    {
                      text: "Có",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
            headerBackTitle: "Quay lại",

            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                tintColor={"white"}
                label="Quay lại" //back
              />
            ),
          })}
        />
        <Stack.Screen
          name="CategoryCheckBox"
          component={CategoryCheckBox}
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
                  Alert.alert("Thông báo", "Bạn có chắc muốn hủy!", [
                    {
                      text: "Không",
                      style: "cancel",
                    },
                    {
                      text: "Có",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
            headerBackTitle: "Quay lại",
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
                  Alert.alert("Thông báo", "Bạn có chắc muốn hủy!", [
                    {
                      text: "Không",
                      style: "cancel",
                    },
                    {
                      text: "Có",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  dispatch({ type: "RESET_SCREEN_INFORMATION" });
                  navigation.goBack()
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
                  Alert.alert("Thông báo", "Bạn có chắc muốn hủy!", [
                    {
                      text: "Không",
                      style: "cancel",
                    },
                    {
                      text: "Có",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
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
            headerRight: () => (
              <TouchableOpacity
                style={styles.wrapTextCancel}
                onPress={() => {
                  Alert.alert("Thông báo", "Bạn có chắc muốn hủy!", [
                    {
                      text: "Không",
                      style: "cancel",
                    },
                    {
                      text: "Có",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate("Home")}
                tintColor={"white"}
                label="Quay lại" //back
              />
            ),
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
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  navigation.goBack();
                }}
                tintColor={"white"}
                label="Quay lại" //back
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.wrapTextCancel}
                onPress={() => {
                  Alert.alert("Thông báo", "Bạn có chắc muốn hủy!", [
                    {
                      text: "Không",
                      style: "cancel",
                    },
                    {
                      text: "Có",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
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
                onPress={() => navigation.goBack()}
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
          name="Chọn ảnh"
          component={PickerImage}
          options={{
            headerShown: true,
            headerTintColor: config.headerTintColor,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
          }}
        />
        <Stack.Screen
          name="PostDonation"
          component={PostDonation}
          options={({ navigation }) => ({
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  dispatch({ type: "RESET_NAMEPRODUCT" });
                  dispatch({ type: "RESET_ADDRESS_FILTER" });
                  dispatch({ type: "RESET_DATA" });
                  navigation.goBack();
                }}
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
            headerRight: () => (
              <TouchableOpacity
                style={styles.wrapTextCancel}
                onPress={() => {
                  Alert.alert("Thông báo", "Bạn có chắc muốn hủy!", [
                    {
                      text: "Không",
                      style: "cancel",
                    },
                    {
                      text: "Có",
                      style: "cancel",
                      onPress: () => {
                        dispatch({ type: "RESET_ADDRESS_FILTER" });
                        navigation.navigate("Home");
                      },
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
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
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={({ navigation }) => ({
            title: "Mật khẩu mới",
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
          name="Announce"
          component={Announce}
          options={{
            title: "Thông báo",
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
          name="ServiceCharity"
          component={ServiceCharity}
          options={({ navigation }) => ({
            title: "Dịch vụ từ thiện",
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
                  Alert.alert("Thông báo", "Bạn có chắc muốn hủy!", [
                    {
                      text: "Không",
                      style: "cancel",
                    },
                    {
                      text: "Có",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
            headerBackTitle: "Quay lại",

            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate("Home")}
                tintColor={"white"}
                label="Quay lại" //back
              />
            ),
          })}
        />
        <Stack.Screen
          name="MedicalAdvise"
          component={MedicalAdvise}
          options={{
            title: "Danh sách",
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
          name="ConfirmGiveFor"
          component={ConfirmGiveFor}
          options={({ navigation }) => ({
            title: "Xác nhận gửi tặng",
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
                  Alert.alert("Thông báo", "Bạn có chắc muốn hủy!", [
                    {
                      text: "Không",
                      style: "cancel",
                    },
                    {
                      text: "Có",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                      
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
            ),
            headerBackTitle: "Quay lại",

            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                tintColor={"white"}
                label="Quay lại" //back
              />
            ),
          })}
        />
        <Stack.Screen
          name="YouGive"
          component={YouGive}
          options={({ YouGive }) => ({
            title: "Bạn tặng",
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
          name="YouReceive"
          component={YouReceive}
          options={({ YouReceive }) => ({
            title: "Nhận tặng",
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
          name="YouGiveTotal"
          component={YouGiveTotal}
          options={({ YouGiveTotal }) => ({
            title: "Thống kê bạn tặng",
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
          name="YouReceiveTotal"
          component={YouReceiveTotal}
          options={({ YouReceiveTotal }) => ({
            title: "Thống kê nhận tặng",
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
          name="DetailConnectPost"
          component={DetailConnectPost}
          options={{
            title: "Chi tiết bạn tặng",
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
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
    marginRight: 10,
  },
});

export default connect(function (state) {
  return { infoPost: state.infoPost, dataCategory: state.dataCategory };
})(AppNavigator);
