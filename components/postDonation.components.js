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
} from "react-native";
import { connect } from "react-redux";
import { Entypo, EvilIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import db from "../db.json";
import axios from "axios";
import ProductComponent from './product.component';
import { Feather } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const height = width * 0.6;
import config from "../config";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
import ModelFilterAddressComponent from "./ModelFilterAddress.component";

function App(props) {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [typeAuthor, settypeAuthor] = useState("tangcongdong");
  const [listAfterFilter, setlistAfterFilter] = useState([]);
  const [showModelAddress, setshowModelAddress] = useState(false);
  const { dispatch } = props;
  // địa chỉ đã chọn
  const filterAddressFunc = (address, list) => {
    const listTemp = list.filter((pr) => {
      if (pr.address.indexOf(address) != -1) {
        return true;
      } else return false;
    });
    setData(listTemp);
  };
  const addr = props.dataCategory.addressFilter;

  // function lọc các danh mục đã chọn
  const categoryFilter = props.dataCategory.NameProduct;

  const filterCategory = (arrayProduct, listTemp) => {
    if (categoryFilter.length != 0) {
      const list = [];
      for (let i = 0; i < listTemp.length; i++) {
        for (let j = 0; j < arrayProduct.length; j++) {
          if (
            listTemp[i].NameProduct[0].Category ==
              arrayProduct[j].Category &&
            listTemp[i].NameProduct[0].NameProduct ==
              arrayProduct[j].NameProduct
          ) {
            list.push(listTemp[i]);
          }
        }
      }
      setData(list);
    } else {
      console.log("nônnononon");
    }
  };

  useEffect(() => {
    if (categoryFilter.length == 0 && addr.length == 0) {
      getListPhotos();
    } else {
      if (addr.length != 0 && categoryFilter.length == 0) {
        filterAddressFunc(addr, listAfterFilter);
      } else {
        if (addr.length != 0 && categoryFilter.length != 0) {
          filterAddressFunc(addr, data);
          filterCategory(categoryFilter, data);
        } else {
          if (addr.length == 0 && categoryFilter.length != 0)
            filterCategory(categoryFilter, listAfterFilter);
        }
      }
    }
  }, [categoryFilter, addr]);

  // call api
  //https://smai-back-end.herokuapp.com/post/getPostByTypeAuthor?typeauthor=%7BLoaij
  const getListPhotos = () => {
    const apiURL = `https://smai-app-api.herokuapp.com/post/getPostByTypeAuthor?typeauthor=${typeAuthor}`;
    axios
      .get(apiURL)
      .then((resjson) => {
        setData(resjson.data);
        setlistAfterFilter(resjson.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setisLoading(false));
  };

  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const renderItemSelected = () => {
    if (categoryFilter.length != 0) {
      return "Đã chọn:    " + categoryFilter.length;
    } else {
      return "Tất cả...";
    }
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
  //sang trang detail
  const { navigation } = props;

  //chuyển trang filter
  const pressFilter = () => {
    navigation.navigate("FilterDonationComunity");
  };
  const pressAddress = () => {
    setshowModelAddress(true);
  };
 
  // render item product
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

  return (
    <View style={isLoading ? styles.containterLoading : styles.containter}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#DDD" />
      ) : (
        <>
          <View style={styles.searchFilterContainer}>
            <TouchableOpacity
              style={styles.wrapFilterButton}
              activeOpacity={0.5}
              onPress={() => pressFilter()}
            >
              <Text style={{ fontSize: config.fontsize_3, color: "#616161" }}>
                {renderItemSelected()}
              </Text>
              <AntDesign
                name="appstore-o"
                size={24}
                color="#909090"
                style={{ position: "absolute", right: "5%" }}
              />
            </TouchableOpacity>
            <View style={{ width: "40%" }}>
              <TouchableOpacity
                onPress={() => pressAddress()}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: "#616161", fontSize: config.fontsize_3 }}>
                  {showFilterAddress()}
                </Text>
                <AntDesign name="caretdown" size={10} color="#BDBDBDBD" />
              </TouchableOpacity>
            </View>
          </View>
          <ModelFilterAddressComponent
            show={showModelAddress}
            closeModel={() => {
              setshowModelAddress(false);
            }}
            onPress={() => {
              setshowModelAddress(false);
            }}
          />
          <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => `key-${item._id}`}
          ></FlatList>
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
  // style search
  searchFilterContainer: {
    height: 60,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapFilterButton: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "55%",
    maxWidth: "55%",
    height: "70%",
    paddingLeft: "1%",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: "3%",
  },
  searchText: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    fontSize: 20,
    maxWidth: "90%",
  },

  // style product
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
    width: width * 0.25,
    height: width * 0.25,
  },
  wrapInfoProduct: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
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
});
export default connect(function (state) {
  return {
    dataCategory: state.dataCategory,
  };
})(App);
