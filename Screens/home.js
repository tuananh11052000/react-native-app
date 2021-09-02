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
import { Feather, FontAwesome } from "@expo/vector-icons";
import GiftComponent from "../components/gift.component";
import SearchComponent from "../components/search.component";
import TitleComponent from "../components/title.component";
import NewsedBox from "../components/newsedBox.components";
import ProductComponent from '../components/product.component';
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
    await axios({
      method: "get",
      url: "https://smai-app-api.herokuapp.com/post/getNewPost",
    }).then((resjson) => {
      setlistData(resjson.data);
      dispatch({ type: "UPDATE", data: resjson.data }) 
    })
    .catch((err) => {console.log(err)})
    .finally(() => setrefreshing(false));
    dispatch({ type: "setNoReload" });
  };
  useEffect(() => {
    
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
  }, [props.reloadPost]);
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
    justifyContent: "space-around",
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
    reloadPost: state.reloadPost,
  };
})(Home);
