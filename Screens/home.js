import React, { useEffect, useState } from "react";
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
} from "react-native";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
import GiftComponent from "../components/gift.component";
import SearchComponent from "../components/search.component";
import TitleComponent from "../components/title.component";
import NewsedBox from "../components/newsedBox.components";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import config from "../config";
import AppLoading from 'expo-app-loading';
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
var {width} = Dimensions.get('window');
const heightStatusBar = StatusBar.currentHeight;
function Home(props) {
  const { dispatch } = props;
  const [listData, setlistData] = useState([]);
  const [refreshing, setrefreshing] = useState(true);
 
  const getData = async () => {
    let temp = await axios({
      method: "get",
      url: "https://smai-app-api.herokuapp.com/post/getNewPost",
    }).finally(() => setrefreshing(false));
    setlistData(temp.data);
    dispatch({ type: "UPDATE", data: temp.data }) 
  };
  useEffect(() => {
    // ẩn warning
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    const checkTokenLocal = async () => {
      let result = await SecureStore.getItemAsync("token");
      let avatar = await SecureStore.getItemAsync("avatar")
      let PhoneNumber = await SecureStore.getItemAsync("PhoneNumber");
      if (result) {
        dispatch({ type: "SIGN_IN", token: result, PhoneNumber: PhoneNumber });
        dispatch({ type: "GET_AVATAR", avatar: avatar })
      } else {
        return await null;
      }
    };
    checkTokenLocal();
    getData();
  }, []);
  // onPress tặng cộng đồng
  const actionOnPressTCD = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "setThreadCategory" });
      dispatch({ type: "setThreadTCD" });
      dispatch({ type: "SET_TYPE_AUTHOR", TypeAuthor: "tangcongdong" });
      navigation.navigate("ConfirmAddress");
    } else navigation.replace("Authentication");
  };
  // onPress tặng người nghèo
  const actionOnPressGiveCaNhan = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "setThreadCategory" });
      dispatch({ type: "setThreadGiveGroup" });
      dispatch({ type: "giveForCaNhan" });
      navigation.navigate("ConfirmAddress");
    } else navigation.replace("Authentication");
  };
  // onpress tặng quỹ từ thiện
  const actionOnPressGiveQuy = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "setThreadCategory" });
      dispatch({ type: "setThreadGiveGroup" });
      dispatch({ type: "giveForQuy" });
      navigation.navigate("ConfirmAddress");
    } else navigation.replace("Authentication");
  };
  // onpress quyên góp công ích
  const actionOnPressGiveCongIch = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "setThreadCategory" });
      dispatch({ type: "setThreadGiveGroup" });
      dispatch({ type: "giveForCongIch" });
      navigation.navigate("ConfirmAddress");
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
  //ConfirmAddress
  // product component////////////////////////////////////////////////////
  const calculatingTime = (d1, d2) => {
    d1 = new Date(d1);
    const calMinute = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 1000));
    };
    const calHour = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 60 * 1000));
    };
    const calDay = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (24 * 60 * 60 * 1000));
    };
    const calMonth = () => {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    };
    const calYear = () => {
      return d2.getFullYear() - d1.getFullYear();
    };
    if (calYear() != 0) return `${calYear()}y `;
    else if (calMonth() != 0) return `${calMonth()}mth `;
    else if (calDay() != 0) return `${calDay()}d `;
    else if (calHour() != 0) return `${calHour()}h `;
    else return `${calMinute()}m `;
  };
  //get post

  //Function handling title post
  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 28) return item.slice(0, 28) + "...";
    else return item;
  };
  //Function handling type product
  const renderType = (pr) => {
    if (pr[0].NameProduct.length > 27) return pr[0].NameProduct.slice(0, 27) + ", ...";
    else return pr[0].NameProduct;
  };
 // render address
 const renderDistrict = (district, city) => {
  if (district.indexOf("Thành phố") != -1) {
    return district.slice(10);
  } 
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") == -1) {
    return district.slice(5);
  }
  const distritNumber = "Quận 1, Quận 2, Quận 3, Quận 4, Quận 5, Quận 6, Quận 7, Quận 8, Quận 9, Quận 10, Quận 11, Quận 12"
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) != -1) {
    return district;
  }
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) == -1) {
    return district.slice(5);
  }
  if (district.indexOf("Huyện") != -1) {
    return district.slice(7);
  } 
}
// render địa chỉ
const renderAddress = (address) => {
  let add = address.split(",");
  let huyen = "",
    tinh = "";
  if (add[3].indexOf("Thành phố") != -1) {
    tinh = add[3].slice(10);
  } else {
    tinh = add[3].slice(6);
  }
  huyen = renderDistrict(add[2], add[3]);

  let diachi = huyen + ", " + tinh;
  return diachi;
};
  const _pressRow = (item) => {
    navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };

  const currentTime = new Date();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.wrapCategory}
      activeOpacity={0.4}
      onPress={() => _pressRow(item)}
    >
      {/* //dùng onStartShouldSetResponder để click vào view */}

      <Image
        style={styles.tinyLogo}
        source={{
          uri: item.urlImage[0],
        }}
      />
      <View style={styles.wrapInfoProduct}>
        <Text style={styles.titlePost}>{renderTitle(item.title)}</Text>
        <View style={styles.wrapTypePrice}>
          <Text style={styles.type}>{renderType(item.NameProduct)}</Text>
          <Text style={styles.price}>Miễn phí</Text>
        </View>
        <View style={styles.wrapTimeAddress}>
          <View style={styles.wrapTime}>
            <Feather name="clock" size={18} color="gray" />
            <Text style={styles.time}>
              {calculatingTime(item.createdAt, currentTime)}
            </Text>
          </View>
          <Text style={styles.address}>
            {renderAddress(item.address)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
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
      <SearchComponent onPress={() => navigation.navigate("Search")} pressAnnounce={() => navigation.navigate("Announce")} />
        <GiftComponent
          onPressTCD={() => actionOnPressTCD()}
          onPressGiveCaNhan={() => actionOnPressGiveCaNhan()}
          onPressGiveQuy={() => actionOnPressGiveQuy()}
          onPressGiveCongIch={() => actionOnPressGiveCongIch()}
          style={styles.gift_component}
        />
        <TitleComponent title="Tin đã đăng" />
        <NewsedBox
          title="Tặng cộng đồng"
          onPress={() => navigation.navigate("PostDonation")}
        />
        <TitleComponent title="Tin mới nhất" />
      </>
    )
  }
  ////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
    
        <View style={styles.containerr}>
          {refreshing ? (
            <ActivityIndicator />
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
  // style product components///////////////////////////////////
  containerr: {
    backgroundColor: "#FFF",
  },
  wrapCategory: {
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '3%',
    paddingRight: '3%',
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  tinyLogo: {
    width: width*0.25,
    height: width*0.25,
  },
  wrapInfoProduct: {
    flex: 1,
    marginLeft: 10,
    // justifyContent: "space-around",
    // paddingBottom: 10,
  },
  wrapTypePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  wrapTimeAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titlePost: {
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_600SemiBold",
  },
  wrapTime: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  time: {
    fontSize: config.fontsize_3,
    marginLeft: 5,
    color: "black",
    fontFamily: "OpenSans_400Regular",
  },
  price: {
    color: "green",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  type: {
    fontSize: config.fontsize_3,
    color: "gray",
    fontFamily: "OpenSans_400Regular",
  },
  address: {
    color: "black",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  //////////////////////////////////////////////////
});

export default connect(function (state) {
  return {
    auth: state.auth,
    infoPost: state.infoPost,
    newestPost: state.newestPost,
    controlThreadGiveFor: state.controlThreadGiveFor,
    profile: state.profile,
    controlConfirmAddress: state.controlConfirmAddress,
  };
})(Home);
