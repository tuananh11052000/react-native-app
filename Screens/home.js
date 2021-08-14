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
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
import GiftComponent from "../components/gift.component";
import SearchComponent from "../components/search.component";
import TitleComponent from "../components/title.component";
import ProductComponent from "../components/product.component";
import NewsedBox from "../components/newsedBox.components";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const heightStatusBar = StatusBar.currentHeight;
function Home(props) {
  const { dispatch } = props;
  const [listData, setlistData] = useState([]);
  const [refreshing, setrefreshing] = useState(true);

  const getData = async () => {
    let temp = await axios({
      method: "get",
      url: "https://smai-app-api.herokuapp.com/post/getNewPost",
    }).finally(() =>setrefreshing(false));
    setlistData(temp.data);
    dispatch({ type: "UPDATE", data: temp.data });
  };
  useEffect(() => {
    // ẩn warning
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    const checkTokenLocal = async () => {
      let result = await SecureStore.getItemAsync("token");
      console.log(result);
      let PhoneNumber = await SecureStore.getItemAsync("PhoneNumber");
      if (result) {
        dispatch({ type: "SIGN_IN", token: result, PhoneNumber: PhoneNumber });
        return await result;
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
      dispatch({ type: "setThreadTCD" });
      navigation.navigate("ConfirmAddress",);
    }
    else navigation.replace("Authentication");
  };
  // onPress tặng người nghèo
  const actionOnPressGiveCaNhan = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "setThreadGiveGroup" });
      dispatch({ type: "giveForCaNhan" });
      navigation.navigate("ConfirmAddress",);
    }
    else navigation.replace("Authentication");
  };
  // onpress tặng quỹ từ thiện
  const actionOnPressGiveQuy = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "setThreadGiveGroup" });
      dispatch({ type: "giveForQuy" });
      navigation.navigate("ConfirmAddress",);
    }
    else navigation.replace("Authentication");
  };
  // onpress quyên góp công ích
  const actionOnPressGiveCongIch = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "setThreadGiveGroup" });
      dispatch({ type: "giveForCongIch" });
      navigation.navigate("ConfirmAddress",);
    }
    else navigation.replace("Authentication");
  };
  const { navigation } = props;
  //ConfirmAddress
  // product component////////////////////////////////////////////////////
  const calculatingTime = (d1, d2) => {
    d1 = new Date(d1);
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
    if (calYear() != 0) return `${calYear()} năm trước`;
    else if (calMonth() != 0) return `${calMonth()} tháng trước`;
    else if (calDay() != 0) return `${calDay()} ngày trước`;
    else return `${calHour()} giờ trước`;
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
    if (pr.length > 1) return pr[0].Category + ", ...";
    else return pr[0].Category;
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
            <Feather name="clock" size={20} color="gray" />
            <Text style={styles.time}>
              {calculatingTime(item.createdAt, currentTime)}
            </Text>
          </View>
          <Text style={styles.address}>
            {item.address.slice(0, 15) + "..."}
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

  }
  ////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <SearchComponent onPress={() => navigation.navigate("Search")} />
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
        {/* <ProductComponent navigation={navigation} listData={listData}/> */}
        <View style={styles.containerr}>
            {
                refreshing ? <ActivityIndicator/> : 
                <FlatList
                    data={listData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    ItemSeparatorComponent={ItemSeparatorView}
              />
            }
          
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: heightStatusBar,
    flex: 1,
    backgroundColor: "#FFF",
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
    padding: 15,
    marginBottom: 10,
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  tinyLogo: {
    width: 90,
    height: 90,
  },
  wrapInfoProduct: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
  },
  wrapTypePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapTimeAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titlePost: {
    fontSize: 20,
    fontWeight: "900",
  },
  wrapTime: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  time: {
    fontSize: 20,
    marginLeft: 7,
    color: "gray",
  },
  price: {
    color: "green",
    fontSize: 20,
  },
  type: {
    fontSize: 20,
    color: "gray",
  },
  address: {
    color: "gray",
    fontSize: 20,
  },
  //////////////////////////////////////////////////
});

export default connect(function (state) {
  return {
    auth: state.auth,
    infoPost: state.infoPost,
    newestPost: state.newestPost,
    controlThreadGiveFor: state.controlThreadGiveFor,
  };
})(Home);
