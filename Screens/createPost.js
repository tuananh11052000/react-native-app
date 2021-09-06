import React, { useEffect, useState, useRef } from "react";
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
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import config from "../config";
import MyPost from "../components/mypost.components";
import * as SecureStore from "expo-secure-store";
import AddImg from "../assets/add.png";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Feather,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import axios from "axios";
function CreatePost(props) {
  const { navigation, dispatch } = props;
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(true);
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);
  const [valueMenu, setvalueMenu] = useState("Tất cả");
  const menu = useRef();
  const hideMenu = async (temp, title) => {
    setvalueMenu(title);
    filter(temp);
    menu.current.hide();
  };

  const showMenu = () => menu.current.show();
  useEffect(() => {
    if (props.auth.isLogin == true) {
      getMyPost();
      onRefresh();
    }
  }, [props.auth.isLogin, props.reloadPost]);
  const getMyPost = async () => {
    if (props.auth.isLogin == true) {
      let result = await SecureStore.getItemAsync("token");
      await axios({
        method: "get",
        url: "https://smai-app-api.herokuapp.com/post/getPostByAccountId",
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
    getMyPost();
    setSelectedValue(1);
    setvalueMenu("Tất cả")
  };
  const deletePost = (id) => {
    let result = SecureStore.getItemAsync("token");
    setloading(true);
    let url =
      "https://smai-app-api.herokuapp.com/post/deletePostbyUser?_id=" + id;
    axios({
      method: "delete",
      url: url,
      headers: {
        Authorization: result,
      },
    })
      .then((res) => {
        if (res.status == 201) {
          // alert("Xoá bài thành công.");
          onRefresh();
          Alert.alert("Thông báo", "Xóa bài thành công", [{ text: "OK" }]);
        }
      })
      .finally(() => setloading(false));
  };
  let dropdown;
  if (Platform.OS === "android") {
    //switch for ios
    dropdown = (
      <Menu
        style={{ backgroundColor: "#FFF" }}
        ref={menu}
        button={
          <TouchableOpacity
            onPress={showMenu}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "73%",
            }}
          >
            <View style={{width: '125%', paddingLeft: '5%'}}>
              <Text style={{ fontSize: config.fontsize_3 }}>{valueMenu}</Text>
            </View>
            <View style={{width: '10%'}}>
              <AntDesign name="caretdown" size={10} color="gray" />
            </View>
          </TouchableOpacity>
        }
      >
        <MenuItem
          onPress={() => {
            hideMenu(1, "Tất cả");
          }}
          style={{ fontSize: config.fontsize_3 }}
        >
          Tất cả
        </MenuItem>
        <MenuItem
          onPress={() => {
            hideMenu(2, "Tặng cộng đồng");
          }}
          style={{ fontSize: config.fontsize_3 }}
        >
          Tặng cộng đồng
        </MenuItem>
        <MenuItem
          onPress={() => {
            hideMenu(3,  "Cần hỗ trợ");
          }}
          style={{ fontSize: config.fontsize_3 }}
        >
          Cần hỗ trợ
        </MenuItem>
      </Menu>
    );
  } else {
    //check box
    dropdown = (
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
          filter(itemValue);
        }}
        mode={"dropdown"}
        style={{ height: 40 }}
        itemStyle={{ backgroundColor: "#FFF" }}
      >
        <Picker.Item
          label="&ensp;Tất cả"
          value="1"
          style={{ fontSize: config.fontsize_3 }}
        />
        <Picker.Item
          label="&ensp;Tặng cộng đồng"
          value="2"
          style={{ fontSize: config.fontsize_3 }}
        />
        <Picker.Item
          label="&ensp;Cần hỗ trợ"
          value="3"
          style={{ fontSize: config.fontsize_3 }}
        />
      </Picker>
    );
  }
  const filter = (itemvalue, value) => {
    let tempData = dataAll;
    if (props.auth.isLogin == true) {
      if (itemvalue == 1 || value == 1) {
        setData(tempData);
      }
      if (itemvalue == 2 || value == 2) {
        const listTemp1 = tempData.filter((pr) => {
          if (pr.TypeAuthor == "tangcongdong") {
            return true;
          } else return false;
        });
        setData(listTemp1);
      }
      if (itemvalue == 3 || value == 3) {
        const listTemp1 = tempData.filter((pr) => {
          if (pr.TypeAuthor != "tangcongdong") {
            return true;
          } else return false;
        });
        setData(listTemp1);
      }
    }
  };

  const _pressRow = (item) => {
    props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };

  const renderItem = ({ item }) => {
    return (
      <MyPost
        urlImage={item.urlImage[0]}
        title={item.title}
        category={item.NameProduct}
        time={item.createdAt}
        address={item.address}
        confirm={item.confirm}
        typeAuthor={item.TypeAuthor}
        cateReceives={item.NameProduct.length}
        onPress={() => _pressRow(item)}
        onPressDel={() => deletePost(item._id)}
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
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={"Đang xóa bài..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{ zIndex: 1 }}>
        {/* <CreatePosts onPress={() => navigation.navigate("PostType")} /> */}
        <View style={styles.wrapContent}>
          <View style={styles.wrapPikerA}>{dropdown}</View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              if (props.auth.isLogin == true) {
                setSelectedValue(1);
                dispatch({ type: "setThreadCategoryCheckBox" });
                navigation.navigate("ConfirmAddress");
              } else navigation.replace("Authentication");
            }}
            style={styles.btnCreate}
          >
            <Image source={AddImg} style={{ width: 20, height: 20 }} />
            <Text style={styles.btnText}>&ensp; Đăng tin</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
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
    backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  btnCreate: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#00a2e8",
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    width: "38%",
    justifyContent: "space-around",
  },
  btnText: {
    fontWeight: "600",
    fontSize: config.fontsize_3,
    color: "#000",
    fontFamily: "OpenSans_700Bold",
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
})(CreatePost);
