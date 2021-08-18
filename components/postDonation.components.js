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
import { Feather } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const height = width * 0.6;
import config from "../config";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";

function App(props) {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [typeAuthor, settypeAuthor] = useState("tangcongdong");
  const [dataAddressFilter, setdataAddressFilter] = useState([]);
  const [selectedValue, setSelectedValue] = useState("1");
  const [listAddress, setListAddress] = useState(db.province);
  const [dataCategoryFilter, setdataCategoryFilter] = useState([]);
  useEffect(() => {
    getListPhotos();
    return () => {};
  }, []);

  // call api
  //https://smai-back-end.herokuapp.com/post/getPostByTypeAuthor?typeauthor=%7BLoaij
  const getListPhotos = () => {
    const apiURL = `https://smai-app-api.herokuapp.com/post/getPostByTypeAuthor?typeauthor=${typeAuthor}`;
    axios
      .get(apiURL)
      .then((resjson) => {
        setData(resjson.data);
        setdataAddressFilter(resjson.data);
        setdataCategoryFilter(resjson.data);
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
    if (calYear() != 0) return `${calYear()}y`;
    else if (calMonth() != 0) return `${calMonth()}m`;
    else if (calDay() != 0) return `${calDay()}d`;
    else return `${calHour()}h`;
  };

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
  //sang trang detail
  const { navigation } = props;
  const _pressRow = (item) => {
    navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };
  //chuyển trang filter
  const pressFilter = () => {
    navigation.navigate("FilterDonationComunity");
  };
  // function lọc các danh mục đã chọn
  const categoryFilter = props.dataCategory.NameProduct;
  let listAfterFilter = [];
  const filterCategory = () => {
    const listData = dataCategoryFilter;
    for (let i = 0; i < categoryFilter.length; i++) {
      for (let j = 0; j < listData.length; j++) {
        let namepro = listData[j].NameProduct;
        console.log("Đây là name product***************************\n");
        console.log(namepro[0].Category);
        console.log(namepro[0].NameProduct);
        console.log(categoryFilter[i].category);
        console.log(categoryFilter[i].name);
        console.log("**************************************\n");
        if (categoryFilter[i].category == namepro[0].Category) {
          if (categoryFilter[i].name == namepro[0].NameProduct) {
            listAfterFilter.push(listData[j]);
          }
        }
      }
    }
    console.log("Sau khi lọc");
    // console.log(listAfterFilter)
  };
  // filterCategory();

  // handle picker address
  const handleFilter = (city) => {
    console.log(city);
    setSelectedValue(city);
    if (city == 0) {
      setData(dataAddressFilter);
    } else {
      const dataAddress = dataAddressFilter.filter((pr) => {
        if (pr.address.indexOf(city) != -1) {
          return true;
        } else return false;
      });
      setData(dataAddress);
    }
  };
  //  render spinner city
  const countryList = () => {
    return listAddress.map((x, i) => {
      return <Picker.Item label={x.name} key={i} value={x.name} />;
    });
  };
  const currentTime = new Date();
  // render item product
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.wrapCategory}
        activeOpacity={0.8}
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
              {item.address.slice(0, 15) + "..."}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={isLoading ? styles.containterLoading : styles.containter}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <View style={styles.searchFilterContainer}>
            <TouchableOpacity
              style={styles.wrapFilterButton}
              activeOpacity={0.5}
              onPress={() => pressFilter()}
            >
              <Text style={{ fontSize: 20 }}>Tất cả</Text>
              <AntDesign
                name="appstore-o"
                size={24}
                color="#909090"
                style={{ position: "absolute", right: "5%" }}
              />
            </TouchableOpacity>
            <View style={{ width: "40%" }}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  handleFilter(itemValue)
                }
                mode={"dropdown"}
                style={{ height: 40 }}
              >
                <Picker.Item label="Tỉnh/thành phố" value="0" />
                {countryList()}
              </Picker>
            </View>
          </View>

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
    borderWidth: 2,
    borderColor: "#EEEEEE",
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
    width: 90,
    height: 90,
  },
  wrapInfoProduct: {
    flex: 1,
    marginLeft: 10,
    // justifyContent: "space-around",
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
    fontFamily: "OpenSans_700Bold",
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
