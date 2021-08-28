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
import { Entypo, EvilIcons, FontAwesome, FontAwesome5, AntDesign} from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import db from "../db.json";
import axios from "axios";
import config from "../config";
import ModalFilterAddress from '../components/ModelFilterAddress.component';
import { connect } from "react-redux";
const { width } = Dimensions.get("window");
const height = width * 0.5;

function App(props) {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [typeAuthor, settypeAuthor] = useState(props.controlThreadGiveFor);
  const [query, setQuery] = useState("");
  const [datafilter, setDataFilter] = useState([]);
  const [dataAddressFilter, setdataAddressFilter] = useState([]);
  const [selectedValue, setSelectedValue] = useState("1");
  const [listAddress, setListAddress] = useState(db.province);
  const [showModelAddress, setshowModelAddress] = useState(false);
  const addr = props.dataCategory.addressFilter;
  useEffect(() => {
    if ( addr.length == 0) {
      getListPhotos();
    } else {
        filterAddressFunc(addr);
    }
  }, [addr]);
  const filterAddressFunc = (address) => {
    const listTemp = data.filter((pr) => {
      if (pr.address.indexOf(address) != -1) {
        return true;
      } else return false;
    });
    setData(listTemp);
  };
  // call api
  //https://smai-back-end.herokuapp.com/post/getPostByTypeAuthor?typeauthor=%7BLoaij
  const getListPhotos = () => {
    const apiURL = `https://smai-app-api.herokuapp.com/post/getPostByTypeAuthor?typeauthor=${typeAuthor}`;
    axios
      .get(apiURL)
      .then((resjson) => {
        let responData = resjson.data;
        let realData = [];
        for (let i = 0; i < responData.length; i++) {
          let nameProduct = responData[i].NameProduct;
          for (let j = 0; j < nameProduct.length; j++) {
            if (
              nameProduct[j].NameProduct ==
                props.infoPost.NameProduct[0].NameProduct &&
              nameProduct[j].Category == props.infoPost.NameProduct[0].Category
            ) {
              realData.push(responData[i]);
            }
          }
        }
        // console.log(realData)
        setData(realData);
        setDataFilter(realData);
        setdataAddressFilter(realData);
        const { dispatch } = props;
        // dispatch({ type: 'RESET' })
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setisLoading(false));
  };
  
  // render address
  const renderDistrict = (district, city) => {
    if (district.indexOf("Thành phố") != -1) {
      return district.slice(10);
    } 
    if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") == -1) {
      return district.slice(5);
    }
    if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1) {
      return district;
    }
    if (district.indexOf("Huyện") != -1) {
      return district.slice(7);
    } 
  }
  // render địa chỉ
  const renderAddress = (address) => {
    let add = address.split(",");
    let huyen = "",
      tinh = "";
    if (add[3].indexOf("Thành phố") != -1) {
      tinh = add[3].slice(10);
    } else {
      tinh = add[3].slice(6);
    }
    huyen = renderDistrict(add[2], add[3]);

    let diachi = huyen + ", " + tinh;
    return diachi;
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

  const _pressRow = (item) => {
    props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };

  // render item product
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.wrapProduct}
        activeOpacity={0.8}
        onPress={() => _pressRow(item)}
      >
        <View style={styles.wrapBorder}>
          <FontAwesome name="user-circle-o" size={60} color="#FFC911" />
          <View style={styles.wrapInfor}>
            <Text style={styles.wrapName}>{item.NameAuthor}</Text>
            <View style={styles.wrapAddress}>
              <FontAwesome5 name="user-alt" size={20} color="#BDBDBD" />
              <Text style={styles.address}>{item.TypeAuthor}</Text>
            </View>
          </View>
        </View>
        <View style={styles.wrapBorder}>
          <Text style={styles.description}>{item.title}</Text>
        </View>
        <View style={styles.wrapImage}>
          <Image source={{ uri: item.urlImage[0] }} style={styles.image} />
        </View>
        <View style={styles.wrapBorderBottom}>
          <View style={styles.wrapAddress}>
            <Entypo name="location" size={20} color="#BDBDBD" />
            <Text style={styles.address}>{renderAddress(item.address)}</Text>
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
            <View style={styles.wrapSearch}>
              <EvilIcons name="search" size={30} color="#BDBDBD" />
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
            <View style={{ width: "40%" }}>
              <TouchableOpacity
                onPress={() => setshowModelAddress(true)}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: "#BDBDBD", fontSize: config.fontsize_3 }}>
                  Tỉnh/thành phố
                </Text>
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
    backgroundColor: "#DDD",
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
  wrapBorderBottom: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  wrapInfor: {
    marginLeft: "3%",
    width: "80%",
  },
  wrapName: {
    fontSize: config.fontsize_2,
    fontWeight: 'bold'
  },
  wrapAddress: {
    flexDirection: "row",
    marginTop: "3%",
    width: '80%',
  },
  address: {
    fontSize: config.fontsize_3,
    marginLeft: "3%",
    color: '#BDBDBD'
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

  // style search
  searchFilterContainer: {
    height: 60,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapSearch: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "55%",
    maxWidth: "55%",
    height: "70%",
    paddingLeft: "1%",
    marginLeft: "5%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
  },
  searchText: {
    backgroundColor: "#fff",
    fontSize: config.fontsize_5,
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
  };
})(App);
