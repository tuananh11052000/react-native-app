import React, { useEffect, useState, useRef, useLayoutEffect, useCallback } from "react";
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
  Alert, BackHandler
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
import book from "../assets/bookstore.png";
import gigamall from "../assets/gigamall.png";
import Ticket from "../components/home/ticket";
import doubleHeart from "../assets/doubleHeart.png";
import ProductGiveHome from "../components/home/productGiveHome";
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
  const [dataReceive, setDataReceive] = useState([]);
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

  const getDataReceive = async () => {
    await axios({
      method: "get",
      url: "https://api.smai.com.vn/post/post-need-help",
    })
      .then((resjson) => {
        const tempData = resjson.data.data;
        let listTemp = tempData.filter((val) => {
          if (val.NameAuthor != "Văn Tư") {
            return false;
          }
          return true;
        })
        setDataReceive(listTemp);
        // console.log(listTemp)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setrefreshing(false));
    dispatch({ type: "setNoReload" });
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Thông báo", "Bạn có muốn thoát?", [
        {
          text: "Hủy",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Thoát", onPress: () => BackHandler.exitApp() }
      ]);
      
      return true;
    };

    BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => BackHandler.removeEventListener("hardwareBackPress",
    backAction)
  }, [navigation]);
 
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
    getDataReceive();
    return () => {};
  }, [props.auth.PhoneNumber]);
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
  const ItemSeparatorViewReceive = () => {
    return (
      <View
        style={{ height: "100%", width: width * 0.04, backgroundColor: "#FFF" }}
      />
    );
  };

  const listEmpty = () => {
    return (
      <View
        style={{
          alignItems: "center",
          flex: 2,
          justifyContent: "center",
          backgroundColor: "#e5e5e5",
          paddingTop: "2%",
        }}
      >
        <Text style={{ color: "#7F7E85" }}>Chưa có</Text>
      </View>
    );
  };
  const onRefresh = () => {
    setlistData([]);
    setDataReceive([]);
    getData();
    getDataReceive();
  };
  const renderItemReceive = ({ item }) => {
    return <ProductGiveHome data={item} navigation={navigation} />;
  };
  const pressBaner = () => {
    dispatch({ type: "SET_XIN_POSTDONATE" });
    navigation.navigate("PostDonation")
  }
  const listheader = () => {
    return (
      <>
        <SearchComponent
          onPress={() => navigation.navigate("Search")}
          pressAnnounce={() => navigation.navigate("Announce")}
          navigation={navigation}
          dispatch={dispatch}
        />

        {/* <Ticket
          title="Thanh lý đồ"
          onPress={() => navigation.navigate("PostDonation")}
        /> */}

       <TitleComponent title="Khám phá" />
        <TouchableOpacity onPress={() => pressBaner()}>
          <View style={{width: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center', marginBottom: '4%'}}>
            <Image
              source={doubleHeart}
              style={styles.imagedoubleheart}
              resizeMode="stretch"
            />
            <Text style={styles.textdoubleheart}>Đồ cho tặng</Text>
            {/* <TitleComponent title="Đồ cho tặng" /> */}
          </View>
        </TouchableOpacity>

        {/* <NewsedBox
            image={book}
            title="Tặng cộng đồng"
            onPress={() => navigation.navigate("PostDonation")}
          /> */}
        <TitleComponent title="Người cần giúp" />

        <FlatList
          data={dataReceive}
          keyExtractor={(item) => item._id}
          horizontal={true}
          renderItem={renderItemReceive}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparatorViewReceive}
          style={{
            marginLeft: "2%",
            marginRight: "2%",
            marginBottom: "4%",
          }}
        />
        <TitleComponent title="BẠN QUAN TÂM" />
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
          <>
            {listData.length == 0 ? (
              <>{listEmpty()}</>
            ) : (
              <>
                <FlatList
                  data={listData}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                  ItemSeparatorComponent={ItemSeparatorView}
                  ListHeaderComponent={listheader}
                  ListEmptyComponent={listEmpty}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
              </>
            )}
          </>
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

  wrap_search_bgr: {
    flex: 1,
  },
  // style product components///
  containerr: {
    backgroundColor: "#FFF",
  },
  imagedoubleheart: { width: "96%", height: width * 0.3},
  textdoubleheart: {
    position: "absolute",
    bottom: 3,
    right: 20,
    fontSize: config.fontsize_3,
    color: "#000",
    fontFamily: "OpenSans_400Regular",
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
  // if (finalStatus !== "granted") {
  //   alert("Failed to get push token for push notification!");
  //   return;
  // }
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
    redirectComplete: state.redirectComplete,
    redirectPostDonate: state.redirectPostDonate
  };
})(Home);
