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
import { Entypo, EvilIcons, FontAwesome, AntDesign  } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import db from "./db.json";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const height = width * 0.6;

export default function App(props) {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [typeAuthor, settypeAuthor] = useState("tangcongdong");
  const [query, setQuery] = useState("");
  const [datafilter, setDataFilter] = useState([]);
  const [dataAddressFilter, setdataAddressFilter] = useState([]);
  const [selectedValue, setSelectedValue] = useState("1");
  const [listAddress, setListAddress] = useState(db.province);
  useEffect(() => {
    getListPhotos();
    return () => {};
  }, []);

  // call api
  //https://smai-back-end.herokuapp.com/post/getPostByTypeAuthor?typeauthor=%7BLoaij
  getListPhotos = () => {
    const apiURL = `https://smai-app-api.herokuapp.com/post/getPostByTypeAuthor?typeauthor=${typeAuthor}`;
    axios
      .get(apiURL)
      .then((resjson) => {
        setData(resjson.data);
        setDataFilter(resjson.data);
        setdataAddressFilter(resjson.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setisLoading(false));
  };

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
  const handleSearch = (text) => {
    setQuery(text);
    if (text == "") setData(datafilter);
    else {
      const data = datafilter.filter((pr) => {
        if (
          pr.NameAuthor.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
          pr.title.toLowerCase().indexOf(text.toLowerCase()) != -1
        )
          return true;
        else return false;
      });
      setData(data);
    }
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
  const countryList = () => {
    return listAddress.map((x, i) => {
      return <Picker.Item label={x.name} key={i} value={x.name} />;
    });
  };
  const currentTime = new Date();
  // render item product
  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.wrapCategory}
        activeOpacity={0.8}
      
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
  };

  return (
    <View style={isLoading ? styles.containterLoading : styles.containter}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <View style={styles.searchFilterContainer}>
            <TouchableOpacity style={styles.wrapFilterButton}  activeOpacity={0.5} >
              <Text style={{fontSize: 20, }}>Tất cả</Text>
              <AntDesign name="appstore-o" size={24} color="#909090" style={{position: 'absolute', right: '5%'}}/>
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
    paddingTop: 20,
    backgroundColor: "#DDD",
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
    justifyContent: 'space-around',
    alignItems: "center",
    marginLeft: '3%'
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
});
