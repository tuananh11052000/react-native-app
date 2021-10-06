import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  StatusBar,
  Text,
  SafeAreaView,
  LogBox,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Feather, FontAwesome } from "@expo/vector-icons";
import GiftComponent from "../components/gift.component";
import SearchComponent from "../components/search.component";
import TitleComponent from "../components/title.component";
import NewsedBox from "../components/newsedBox.components";
import ProductComponent from "../components/product.component";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import config from "../config";
import AppLoading from "expo-app-loading";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";
var { width } = Dimensions.get("window");
const heightStatusBar = StatusBar.currentHeight;
function Home(props) {
  const { dispatch } = props;
  const [listData, setlistData] = useState([]);
  const [refreshing, setrefreshing] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const getData = async () => {
    await axios({
      method: "get",
      url: "https://api.smai.com.vn/post/getNewPost",
    })
      .then((resjson) => {
        setlistData(resjson.data);
        dispatch({ type: "UPDATE", data: resjson.data });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setrefreshing(false));
    dispatch({ type: "setNoReload" });
  };
  useEffect(() => {
    const checkTokenLocal = async () => {
      let result = await SecureStore.getItemAsync("token");
      let avatar = await SecureStore.getItemAsync("avatar");
      let PhoneNumber = await SecureStore.getItemAsync("PhoneNumber");
      if (result) {
        dispatch({ type: "SIGN_IN", token: result, PhoneNumber: PhoneNumber });
        dispatch({ type: "GET_AVATAR", avatar: avatar });
      } else {
        return await null;
      }
    };
    checkTokenLocal();
    getData();
    return () => {};
  }, [props.reloadPost]);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      axios({
        method: "post",
        url: "https://api.smai.com.vn/push/create-push-token",
        data: {
          PushToken: token,
        },
      })
        .then((resjson) => {
          console.log(resjson.data);
        })
        .catch((err) => {
          console.log(err.message);
        });

      setExpoPushToken(token);
      console.log(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response.notification.request.content.data);
        let data = response.notification.request.content.data;
        if (data.isStatus != "null") {
          if (
            data.typetransaction == "Đã nhận" ||
            data.typetransaction == "Chưa nhận" ||
            data.typetransaction == "Hủy nhận"
          ) {
            navigation.navigate("DetailConnectPost", {
              name: "Chi tiết nhận tặng",
              titlePerson: "NGƯỜI TẶNG",
              data: data,
            });
          } else {
            navigation.navigate("DetailConnectPost", {
              name: "Chi tiết bạn tặng",
              titlePerson: "NGƯỜI NHẬN",
              data: data,
            });
          }
        } else {
          dispatch({ type: "SET_XIN" });
          navigation.navigate("GiveFor", {
            name: "Danh sách lời nhắn",
            postId: data.PostData._id,
          }); //chuyển trang
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // onPress tặng cộng đồng
  const actionOnPressTCD = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "setThreadCategory" }); // redirect address giữa tặng cộng đồng và cần xin đồ ở home và createPost
      dispatch({ type: "setThreadTCD" });
      dispatch({ type: "SET_TYPE_AUTHOR", TypeAuthor: "tangcongdong" });
      navigation.navigate("ConfirmAddress");
    } else navigation.replace("Authentication");
  };
  // onPress tặng người nghèo
  const actionOnPressCXD = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "setThreadCXD" }); // redirect address giữa tặng cộng đồng và cần xin đồ ở home và createPost
      navigation.navigate("ConfirmAddress");
    } else navigation.replace("Authentication");
  };
  // onpress tặng quỹ từ thiện
  const actionOnPressMedicalAdvise = () => {
    if (props.auth.isLogin == true) {
      navigation.navigate("MedicalAdvise");
    } else navigation.replace("Authentication");
  };
  const { navigation } = props;
  const [fontsLoaded, error] = useFonts({
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }) => {
    return (
      <ProductComponent
        item={item}
        urlImage={item.urlImage[0]}
        title={item.title}
        category={item.NameProduct}
        time={item.createdAt}
        address={item.address}
        confirm={item.confirm}
        typeAuthor={item.TypeAuthor}
        cateReceives={item.NameProduct.length}
        navigation={navigation}
        isHistory="no"
      />
    );
  };
  // space between item flatlist
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };
  const onRefresh = () => {
    setlistData([]);
    getData();
  };
  const listheader = () => {
    return (
      <>
        <SearchComponent
          onPress={() => navigation.navigate("Search")}
          pressAnnounce={() => navigation.navigate("Announce")}
        />
        <GiftComponent
          onPressTCD={() => actionOnPressTCD()}
          onPressCXD={() => actionOnPressCXD()}
          onPressMedicalAdvise={() => actionOnPressMedicalAdvise()}
          style={styles.gift_component}
        />
        <TitleComponent title="Tin đã đăng" />
        <NewsedBox
          title="Tặng cộng đồng"
          onPress={() => navigation.navigate("PostDonation")}
        />
        <TitleComponent title="Tin mới nhất" />
      </>
    );
  };
  ////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <View style={styles.containerr}>
        {refreshing ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <ActivityIndicator color="#BDBDBD" size="small" />
          </View>
        ) : (
          <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={ItemSeparatorView}
            ListHeaderComponent={listheader}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: heightStatusBar,
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  child: {},
  gift_component: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  wrap_search_bgr: {
    flex: 1,
  },
  // style product components///
  containerr: {
    backgroundColor: "#FFF",
  },
});

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  const sendTokenDevice = async () => {
    await axios({
      method: "post",
      url: "https://api.smai.com.vn/push/create-push-token",
      data: {
        PushToken: token,
      },
    })
      .then((resjson) => {
        console.log(resjson.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    }
    return null;
  }
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  save("tokenDevice", token);
  let tokenSaved = getValueFor("tokenDevice");

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
export default connect(function (state) {
  return {
    auth: state.auth,
    infoPost: state.infoPost,
    newestPost: state.newestPost,
    controlThreadGiveFor: state.controlThreadGiveFor,
    profile: state.profile,
    controlConfirmAddress: state.controlConfirmAddress,
    reloadPost: state.reloadPost,
  };
})(Home);
