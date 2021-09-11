import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import config from "../config";
import ConnectPost from "../components/connectPost.component";
import ProductTitleConnect from "../components/productTitleConnect.component";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
function Connection(props) {
  const { navigation, dispatch } = props;
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(true);
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);

  useEffect(() => {
    if (props.auth.isLogin == true) {
      getConnectPost();
      onRefresh();
    }
  }, [props.auth.isLogin, props.reloadPost]);
  const getConnectPost = async () => {
    if (props.auth.isLogin == true) {
      let result = await SecureStore.getItemAsync("token");
      await axios({
        method: "get",
        // url: "https://smai-app-api.herokuapp.com/post/getPostByAccountId",
        url: "https://smai-app-api.herokuapp.com/transaction/get-transaction",
        headers: {
          Authorization: result,
        },
      })
        .then((res) => {
          setData(res.data.data.data);
          setDataAll(res.data.data.data);
          dispatch({ type: "SAVE_DATA_TRANS", data: res.data.data.data });
       
        })
        .catch((error) => {
          console.log("Error: ", error);
        })
        .finally(() => {
          setrefreshing(false);
        });
    }

    dispatch({ type: "setNoReload" });
  };

  const onRefresh = () => {
    setData([]);
    getConnectPost();
  };

  const _pressRow = (item) => {
    // props.navigation.navigate("DetailConnectPost", { data: item }); //chuyển trang
  };
  const _pressListGive = () => {
    props.navigation.navigate("YouGive"); //chuyển trang
  };
  const _pressListReceive = () => {
    props.navigation.navigate("YouReceive"); //chuyển trang
  };
  const _pressListGiveTotal = () => {
    props.navigation.navigate("YouGiveTotal"); //chuyển trang
  };
  const _pressListReceiveTotal = () => {
    props.navigation.navigate("YouReceiveTotal"); //chuyển trang
  };

  const renderItem = ({ item }) => {
    return (
      <ConnectPost
        urlImage={item.urlImage[0]}
        title={item.ReceiverUser._id}
        name={item.ReceiverUser.FullName}
        time={item.ReceiverUser.createdAt}
        address={item.SenderAddress}
        onPress={() => _pressRow(item)}
      />
    );
  };
  const listheader = () => {
    return (
      <>
        <View style={{flexDirection: 'row', paddingTop: '2%'}}>
          <View style={{width: '50%',  alignItems: 'center', paddingTop: '2%', borderRightColor:  '#9E9E9E', borderRightWidth: 1,}}>
            <Text style={{fontSize: config.fontsize_5, fontFamily: 'OpenSans_600SemiBold', color: '#616161'}}>Bạn tặng</Text>
            <Text style={{fontSize: config.fontsize_2, fontFamily: 'OpenSans_600SemiBold', }}>9 DH</Text>
            <TouchableOpacity onPress={() => _pressListGive()}>
              <Text style={{fontSize: config.fontsize_3, fontFamily: 'OpenSans_600SemiBold', color: '#26c6da'}}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%', alignItems: 'center', paddingTop: '2%',  }}>
            <Text style={{fontSize: config.fontsize_5, fontFamily: 'OpenSans_600SemiBold', color: '#616161'}}>Nhận tặng</Text>
            <Text style={{fontSize: config.fontsize_2, fontFamily: 'OpenSans_600SemiBold', }}>0 DH</Text>
            <TouchableOpacity onPress={() => _pressListReceive()}>
              <Text style={{fontSize: config.fontsize_3, fontFamily: 'OpenSans_600SemiBold', color: '#26c6da'}}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.textTitle}>Đối soát</Text>
      </>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        {props.auth.isLogin ? (
          <>
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
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={ItemSeparatorView}
                ListHeaderComponent={listheader}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            )}
          </>
        ) : (
          <>
            <View
              style={{
                backgroundColor: "#DDD",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#4B4C4F" }}>Vui lòng đăng nhập</Text>
            </View>
          </>
        )}
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
  },
  textTitle: {
    fontSize: config.fontsize_3,
    paddingLeft: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
    marginTop: '2%',
    marginBottom: '2%',
    color: "#7F7E85",
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
    backgroundColor: '#FFF',
  },

  wrapContent: {
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  wrapPikerA: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#BDBDBD",
    width: "57%",
    backgroundColor: "#FFF",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default connect(function (state) {
  return {
    auth: state.auth,
    infoPost: state.infoPost,
    reloadPost: state.reloadPost,
    controlConfirmAddress: state.controlConfirmAddress,
    dataTrans: state.dataTrans,
  };
})(Connection);
