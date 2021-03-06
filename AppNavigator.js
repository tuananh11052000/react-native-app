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
import ListNeedSupport from './Screens/listNeedSupport';
import ConfirmCategoryGive from './Screens/confirmCategoryGive';
import DetailPostReceive from './Screens/detailPostGiveHome';
import redirectPostDonate from "./Reducer/redirectPostDonate";
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
            title: "Trang ch???",
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={({ navigation }) => ({
            title: "T??m ki???m",
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
            title: "X??c nh???n ?????a ch??? ",
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
            title: "Danh m???c t???ng",
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
                  Alert.alert("Th??ng b??o", "B???n c?? ch???c mu???n h???y!", [
                    {
                      text: "Kh??ng",
                      style: "cancel",
                    },
                    {
                      text: "C??",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>H???y</Text>
              </TouchableOpacity>
            ),
            headerBackTitle: "Quay l???i",

            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
          })}
        />
        <Stack.Screen
          name="CategoryCheckBox"
          component={CategoryCheckBox}
          options={({ navigation }) => ({
            title: "Danh m???c c???n h??? tr???",
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
                  Alert.alert("Th??ng b??o", "B???n c?? ch???c mu???n h???y!", [
                    {
                      text: "Kh??ng",
                      style: "cancel",
                    },
                    {
                      text: "C??",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>H???y</Text>
              </TouchableOpacity>
            ),
            headerBackTitle: "Quay l???i",
          })}
        />

        <Stack.Screen
          name="Description"
          component={Description}
          options={({ navigation, route }) => ({
            title: route.params.name,
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
                  Alert.alert("Th??ng b??o", "B???n c?? ch???c mu???n h???y!", [
                    {
                      text: "Kh??ng",
                      style: "cancel",
                    },
                    {
                      text: "C??",
                      style: "cancel",
                      onPress: () => {
                        dispatch({ type: "RESET_SCREEN_INFORMATION" });
                        navigation.navigate("Home")
                      },
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>H???y</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  dispatch({ type: "RESET_SCREEN_INFORMATION" });
                  navigation.goBack()
                }}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
          })}
        />
        <Stack.Screen
          name="ConfirmInforScreen"
          component={ConfirmInforScreen}
          options={({ navigation }) => ({
            title: "X??c nh???n th??ng tin",
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
                  Alert.alert("Th??ng b??o", "B???n c?? ch???c mu???n h???y!", [
                    {
                      text: "Kh??ng",
                      style: "cancel",
                    },
                    {
                      text: "C??",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>H???y</Text>
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
            title: "Lo???i tin",
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
                onPress={() => navigation.navigate("Home")}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
          })}
        />
        <Stack.Screen
          name="WhoConfirm"
          component={WhoConfirm}
          options={({ navigation }) => ({
            title: "B???n l?? ai",
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
                label="Quay l???i" //back
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.wrapTextCancel}
                onPress={() => {
                  Alert.alert("Th??ng b??o", "B???n c?? ch???c mu???n h???y!", [
                    {
                      text: "Kh??ng",
                      style: "cancel",
                    },
                    {
                      text: "C??",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>H???y</Text>
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
                label="Trang ch???" //back
              />
            ),
            title: "T??i kho???n",
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
          options={({route}) => ({
            title: "Chi ti???t b??i ????ng",
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
          name="DetailPostReceive"
          component={DetailPostReceive}
          options={({route}) => ({
            title: "Chi ti???t b??i ????ng",
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
          name="History"
          component={HistoryPage}
          options={({ navigation }) => ({
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
            title: "L???ch s??? xem",
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
                onPress={() => navigation.goBack()}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.wrapTextCancel}
                onPress={() => {    
                  dispatch({ type: "RESET_FILTER" });   
                  dispatch({ type: "RESET_NAMEPRODUCT" });
                  dispatch({ type: "RESET_DATA" });
                }}
              >
                <Text style={styles.textCancel}>B??? ch???n</Text>
              </TouchableOpacity>
            ),
            title: "Danh m???c t???ng",
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
          name="Ch???n ???nh"
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
                  dispatch({ type: "DEFAULT_POSTDONATE" });
                  navigation.goBack();
                }}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
            title: "Tin t???ng c???ng ?????ng",
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
            title: "X??c nh???n OTP",
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
          options={({ navigation, route }) => ({
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
            title: "Danh s??ch l???i nh???n",
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
            title: "Qu??n m???t kh???u",
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
            title: "M???t kh???u m???i",
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
            title: "Th??ng b??o",
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
            title: "?????i t?????ng g???i t???ng",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerBackTitle: "Quay l???i",

            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate("Home")}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
          })}
        />
        <Stack.Screen
          name="MedicalAdvise"
          component={MedicalAdvise}
          options={{
            title: "Danh s??ch",
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
          options={({ navigation, route }) => ({
            title: route.params.name,
            headerShown: true,
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerBackTitle: "Quay l???i",

            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  dispatch({ type: "RESET" });
                  navigation.goBack();
                }}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
            
          })}
        />
        <Stack.Screen
          name="YouGive"
          component={YouGive}
          options={({ YouGive }) => ({
            title: "B???n t???ng",
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
            title: "Nh???n t???ng",
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
            title: "Th???ng k?? b???n t???ng",
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
            title: "Th???ng k?? nh???n t???ng",
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
          options={({route}) => ({
            title: route.params.name,
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
          name="ListNeedSupport"
          component={ListNeedSupport}
          options={({route, navigation}) => ({
            title: "Danh s??ch c???n h??? tr???",
            headerStyle: {
              backgroundColor: config.color_header_background,
            },
            headerTintColor: config.headerTintColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  dispatch({ type: "RESET_NAMEPRODUCT" });
                  dispatch({ type: "RESET_ADDRESS_FILTER" });
                  dispatch({ type: "RESET_DATA" });
                  navigation.goBack();
                }}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
          })}
        />
        <Stack.Screen
          name="ConfirmCategoryGive"
          component={ConfirmCategoryGive}
          options={({ navigation }) => ({
            title: "????? b???n t???ng",
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
                  Alert.alert("Th??ng b??o", "B???n c?? ch???c mu???n h???y!", [
                    {
                      text: "Kh??ng",
                      style: "cancel",
                    },
                    {
                      text: "C??",
                      style: "cancel",
                      onPress: () => navigation.navigate("Home"),
                    },
                  ]);
                }}
              >
                <Text style={styles.textCancel}>H???y</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  navigation.goBack()
                }}
                tintColor={"white"}
                label="Quay l???i" //back
              />
            ),
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
    marginRight: 10,
  },
});

export default connect(function (state) {
  return { infoPost: state.infoPost, 
    dataCategory: state.dataCategory, 
    resetCate: state.resetCate,
    redirectPostDonate: state.redirectPostDonate
  };
})(AppNavigator);
