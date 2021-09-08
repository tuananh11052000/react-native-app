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
        url: "https://smai-app-api.herokuapp.com/post/getNewPost",
        headers: {
          Authorization: result,
        },
      })
        .then((res) => {
          setData(res.data);
          setDataAll(res.data);
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
    props.navigation.navigate("DetailConnectPost", { data: item }); //chuyển trang
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
        title={item._id}
        name={item.NameAuthor}
        time={item.createdAt}
        address={item.address}
        // confirm={item.confirm}
        // typeAuthor={item.TypeAuthor}
        // cateReceives={item.NameProduct.length}
        onPress={() => _pressRow(item)}
        // onPressDel={() => deletePost(item._id)}
      />
    );
  };
  const listheader = () => {
    return <></>;
  };
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProductTitleConnect
        title="bạn tặng"
        type="Đăng tặng ?"
        onPress={() => _pressListGive()}
        onPressList={() => _pressListGiveTotal()}
      />
      <ProductTitleConnect
        title="nhận tặng"
        type="Cần hỗ trợ ?"
        onPress={() => _pressListReceive()}
        onPressList={() => _pressListReceiveTotal()}
      />
      <Text style={styles.textTitle}>Danh sách</Text>
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
    marginLeft: "4%",
    marginTop: "2%",
    marginBottom: "2%",
    color: "#7F7E85",
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
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
  };
})(Connection);
