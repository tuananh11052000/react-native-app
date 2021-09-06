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
import ProductTitleConnectDetails from "../components/productTitleConnectDetails.component";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
function YouReceiveTotal(props) {
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

  // console.log(dataAll);

  const onRefresh = () => {
    setData([]);
    getConnectPost();
  };

  const _pressListReceive = () => {
    props.navigation.navigate("YouReceive"); //chuyển trang
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProductTitleConnectDetails
        title="Đã nhận"
        onPress={() => _pressListReceive()}
      />
      <ProductTitleConnectDetails
        title="Đã nhận"
        onPress={() => _pressListReceive()}
      />
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
})(YouReceiveTotal);
