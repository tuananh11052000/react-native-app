import React, { Fragment, Component, useState, useEffect } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  RefreshControl,
} from "react-native";
import {
  Entypo,
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import db from "../db.json";
import axios from "axios";
import config from "../config";
import ModalFilterAddress from "../components/ModelFilterAddress.component";
import ProductGiveFor from "../components/productGiveFor.components";
import * as SecureStore from "expo-secure-store";
import { connect } from "react-redux";
const { width } = Dimensions.get("window");
const height = width * 0.5;

function App(props) {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [typeAuthor, settypeAuthor] = useState(props.controlThreadGiveFor);
  const [query, setQuery] = useState("");
  const [datafilter, setDataFilter] = useState([]);
  const [showModelAddress, setshowModelAddress] = useState(false);
  const [listAfterFilter, setlistAfterFilter] = useState([]);
  const [addressFilter, setaddressFilter] = useState();
  const [cateFilter, setcateFilter] = useState();
  const addr = props.dataCategory.addressFilter;
  let categoryFilter = props.dataCategory.NameProduct;
  const { dispatch } = props;

  const filterCategory = (arrayProduct, listTemp) => {
    if (categoryFilter.length != 0) {
      const list = [];
      for (let i = 0; i < listTemp.length; i++) {
        const childCategory = listTemp[i].NameProduct;
        for (let k = 0; k < childCategory.length; k++) {
          for (let j = 0; j < arrayProduct.length; j++) {
            if (
              childCategory[k].Category == categoryFilter[j].Category &&
              childCategory[k].NameProduct == categoryFilter[j].NameProduct
            ) {
              list.push(listTemp[i]);
            }
          }
        }
      }

      setData(list);
    }
  };
  const filterTwoOption = () => {
    if (addr.length != 0 && categoryFilter.length != 0) {
      const list = [];
      const listTemp = [...listAfterFilter];
      for (let i = 0; i < listTemp.length; i++) {
        const childCategory = listTemp[i].NameProduct;
        for (let k = 0; k < childCategory.length; k++) {
          for (let j = 0; j < categoryFilter.length; j++) {
            if (
              childCategory[k].Category == categoryFilter[j].Category &&
              childCategory[k].NameProduct == categoryFilter[j].NameProduct
            ) {
              list.push(listTemp[i]);
            }
          }
        }
      }
      const listAddr = list.filter((pr) => {
        if (pr.address.indexOf(addr) != -1) {
          return true;
        } else return false;
      });
      setData(listAddr);
    }
  };
  useEffect(() => {
    setaddressFilter(addr);
    setcateFilter(categoryFilter);
    if (categoryFilter.length == 0 && addr.length == 0) {
      setData(listAfterFilter);
    }
    if (addr.length != 0 && categoryFilter.length == 0) {
      filterAddressFunc(addr, listAfterFilter);
    }
    if (addr.length != 0 && categoryFilter.length != 0) {
      filterTwoOption();
    }
    if (addr.length == 0 && categoryFilter.length != 0) {
      filterCategory(categoryFilter, listAfterFilter);
    }
  }, [categoryFilter, addr]);
  useEffect(() => {
    getListPhotos();
  }, []);
  const filterAddressFunc = (address, list) => {
    const listTemp = list.filter((pr) => {
      if (pr.address.indexOf(address) != -1) {
        return true;
      } else return false;
    });
    setData(listTemp);
  };
  // const filterAddressFunc = (address) => {
  //   if (props.redirectTransaction == "gui") {
  //     const listTemp = data.filter((pr) => {
  //       if (pr.address.indexOf(address) != -1) {
  //         return true;
  //       } else return false;
  //     });
  //     setData(listTemp);
  //   } else {
  //     const listTemp = data.filter((pr) => {
  //       if (pr.SenderAddress.indexOf(address) != -1) {
  //         return true;
  //       } else return false;
  //     });
  //     setData(listTemp);
  //   }
  // };
  // call api
  const getListPhotos = () => {
    // kiểm tra nếu từ trang category chuyển qua thì call api những người xin đồ
    const apiURL = `https://api.smai.com.vn/post/getPostByTypeAuthor?typeauthor=${typeAuthor}`;
    axios
      .get(apiURL)
      .then((resjson) => {
        let responData = resjson.data;
        setData(responData);
        setDataFilter(responData);
        setlistAfterFilter(responData);
        // console.log(responData)
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setisLoading(false));
  };
  const pressFilter = () => {
    navigation.navigate("FilterDonationComunity");
  };
  const showFilterAddress = () => {
    if (addr != "") {
      let temp = addr.split(",");
      if (temp[0].length > 10) return temp[0].slice(0, 10);
      else return temp[0];
    } else {
      return "Tỉnh/thành phố";
    }
  };
  const renderItemSelected = () => {
    if (cateFilter.length != 0) {
      return "Đã chọn:    " + cateFilter.length;
    } else {
      return "Lọc danh mục nhận";
    }
  };
  const onRefresh = () => {
    setData([]);
    setaddressFilter([]);
    setcateFilter([]);
    getListPhotos();
    dispatch({ type: "RESET_ADDRESS_FILTER" });
    dispatch({ type: "RESET_NAMEPRODUCT" });
  };
  const handleSearch = (text) => {
    setQuery(text);
    if (text == "") setData(datafilter);
    else {
      if (props.redirectTransaction == "gui") {
        const data = datafilter.filter((pr) => {
          if (
            pr.NameAuthor.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
            pr.title.toLowerCase().indexOf(text.toLowerCase()) != -1
          )
            return true;
          else return false;
        });
        setData(data);
      } else {
        const data = datafilter.filter((pr) => {
          if (
            pr.usersender.FullName.toLowerCase().indexOf(text.toLowerCase()) !=
              -1 ||
            pr.note.toLowerCase().indexOf(text.toLowerCase()) != -1
          )
            return true;
          else return false;
        });
        setData(data);
      }
    }
  };
  const { navigation } = props;
  const listEmpty = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e5e5e5",
          flex: 2,
        }}
      >
        <Text style={{ color: "#7F7E85" }}>Chưa có</Text>
      </View>
    );
  };
  // render item product
  const renderItem = ({ item }) => {
    return (
      <ProductGiveFor
        item={item}
        nameAuthor={item.NameAuthor}
        title={item.title}
        time={item.createdAt}
        address={item.address}
        urlImage={item.urlImage[0]}
        navigation={navigation}
        authorID={item.AuthorID}
        viewDetail="true"
      />
    );
  };

  return (
    <View style={isLoading ? styles.containterLoading : styles.containter}>
      {isLoading ? (
        <ActivityIndicator color="#BDBDBD" size="small" />
      ) : (
        <>
          <View style={styles.searchTop}>
            <EvilIcons name="search" size={width * 0.05} color="#BDBDBD" />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={query}
              onChangeText={(queryText) => handleSearch(queryText)}
              placeholder="Tìm kiếm"
              style={styles.searchText}
            />
          </View>
          <View style={styles.searchFilterContainer}>
            <TouchableOpacity
              style={styles.wrapFilterButton}
              activeOpacity={0.5}
              onPress={() => pressFilter()}
            >
              <Text style={styles.wrapFilterCate}>{renderItemSelected()}</Text>
              <AntDesign
                name="appstore-o"
                size={width * 0.05}
                color="#909090"
                style={{ position: "absolute", right: "5%" }}
              />
            </TouchableOpacity>
            <View style={{ width: "40%" }}>
              <TouchableOpacity
                onPress={() => setshowModelAddress(true)}
                style={styles.wrapFilterAddr}
              >
                <Text style={styles.textFilterAddr}>{showFilterAddress()}</Text>
                <AntDesign name="caretdown" size={10} color="#BDBDBDBD" />
              </TouchableOpacity>
            </View>
          </View>
          <ModalFilterAddress
            show={showModelAddress}
            closeModel={() => {
              setshowModelAddress(false);
            }}
            onPress={() => {
              setshowModelAddress(false);
            }}
          />
          {data.length == 0 ? (
            <>{listEmpty()}</>
          ) : (
            <>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => `key-${item._id}`}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                  />
                }
                ListEmptyComponent={listEmpty}
              />
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  containterLoading: {
    flex: 1,
    justifyContent: "center",
  },
  wrapProduct: {
    width: "100%",
    paddingTop: 10,
    backgroundColor: "#FFF",
    marginBottom: "2%",
    paddingBottom: "3%",
  },
  wrapBorder: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  wrapFilterCate: {
    fontSize: config.fontsize_3,
    color: "#CCC",
    textAlign: "center",
  },
  wrapFilterAddr: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textFilterAddr: { color: "#616161", fontSize: config.fontsize_3 },
  wrapBorderBottom: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingLeft: "3%",
    paddingRight: "3%",
    justifyContent: "center",
  },
  wrapInfor: {
    marginLeft: "3%",
    width: "80%",
  },
  wrapName: {
    fontSize: config.fontsize_2,
    fontWeight: "bold",
  },
  wrapAddress: {
    flexDirection: "row",
    marginTop: "3%",
    width: "80%",
  },
  address: {
    fontSize: config.fontsize_3,
    marginLeft: "3%",
    color: "#e5e5e5",
  },
  description: {
    fontSize: config.fontsize_5,
    // marginLeft: "3%",
    marginBottom: "1%",
    marginTop: "3%",
  },
  wrapImage: {
    flexDirection: "row",
    width: width,
    alignItems: "center",
  },
  image: {
    height: height,
    width: width,
    // resizeMode: "contain",
  },
  btnGiveFor: {
    borderColor: "#26c6da",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingTop: "2%",
    paddingBottom: "2%",
    alignItems: "center",
  },

  // style search
  searchTop: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    padding: "1%",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginRight: "4%",
    marginTop: "2%",
    marginLeft: "4%",
    marginBottom: "2%",
  },
  searchFilterContainer: {
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
  },
  wrapFilterButton: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "55%",
    maxWidth: "55%",
    padding: "1%",
    marginLeft: "3%",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
  },
  searchText: {
    backgroundColor: "#fff",
    fontSize: config.fontsize_3,
    marginLeft: "3%",
    maxWidth: "80%",
    width: "80%",
  },
});
export default connect(function (state) {
  return {
    infoPost: state.infoPost,
    controlThreadGiveFor: state.controlThreadGiveFor,
    dataCategory: state.dataCategory,
    redirectTransaction: state.redirectTransaction,
    auth: state.auth,
  };
})(App);
