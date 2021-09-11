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
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import config from "../config";
import ConnectPost from "../components/connectPost.component";
import * as SecureStore from "expo-secure-store";
import AddImg from "../assets/add.png";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { SearchBar } from "react-native-elements";

function YouGive(props) {
  const { navigation, dispatch } = props;
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [dataTCD, setDataTCD] = useState([]);
  const [dataCXD, setDataCXD] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([
    { label: "Trạng thái", value: "1" },
    { label: "Chưa tặng", value: "2" },
    { label: "Đã tặng", value: "3" },
    { label: "Hủy", value: "4" },
  ]);
  useEffect(() => {
    if (props.auth.isLogin == true) {
      getConnectPost();
      onRefresh();
    }
  }, [props.auth.isLogin, props.reloadPost]);
  const getConnectPost = () => {
    if (props.auth.isLogin == true) {
      const listTemp = props.dataTrans.data.filter((pr) => {
        if (pr.ReceiverUser.PhoneNumber == props.auth.PhoneNumber) {
          return true;
        } else return false;
      });
        setData(listTemp);
        setDataAll(listTemp);
    }

    dispatch({ type: "setNoReload" });
  };

  const onRefresh = () => {
    setData([]);
    getConnectPost();
    setSelectedValue(1);
  };

  let dropdown;
  if (Platform.OS === "ios") {
    //switch for ios
    dropdown = (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Trạng thái"
        style={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          height: 41,
          borderColor: "gray",
        }}
        dropDownContainerStyle={{
          backgroundColor: "white",
          borderColor: "gray",
        }}
      />
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
          label="&ensp;Trạng thái"
          value="1"
          style={{ fontSize: config.fontsize_3 }}
        />
        <Picker.Item
          label="&ensp;Chưa tặng"
          value="2"
          style={{ fontSize: config.fontsize_3 }}
        />
        <Picker.Item
          label="&ensp;Đã tặng"
          value="3"
          style={{ fontSize: config.fontsize_3 }}
        />
        <Picker.Item
          label="&ensp;Hủy"
          value="4"
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
    props.navigation.navigate("DetailConnectPost", { data: item }); //chuyển trang
  };

  const renderItem = ({ item }) => {
    return (
      <ConnectPost
        urlImage={item.urlImage[0]}
        title={item.ReceiverID}
        name={item.SenderUser.FullName}
        time={item.SenderUser.createdAt}
        address={item.SenderAddress}
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
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={"Đang xóa bài..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{ zIndex: 1 }}>
        <View style={styles.wrapContent}>
          <View style={styles.wrapSearch}>
            <SearchBar
              placeholder="Tìm kiếm..."
              onChangeText={setSearch}
              value={search}
              lightTheme="true"
              style={{ fontSize: config.fontsize_3 }}
              containerStyle={{ padding: 0 }}
              inputStyle={{ color: "black" }}
              inputContainerStyle={{ backgroundColor: "#FFF", height: 42 }}
            />
          </View>

          <View style={styles.wrapPikerA}>{dropdown}</View>
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
  wrapSearch: {
    width: "55%",
  },
  wrapPikerA: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#BDBDBD",
    width: "40%",
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
})(YouGive);
