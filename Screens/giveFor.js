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
import { Entypo, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import db from "../db.json";
import axios from 'axios';
import { connect } from 'react-redux'
const { width } = Dimensions.get("window");
const height = width * 0.6;

 function App(props) {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [typeAuthor, settypeAuthor] = useState(props.controlThreadGiveFor);
  const [query, setQuery] = useState("");
  const [datafilter, setDataFilter] = useState([]);
  const [dataAddressFilter, setdataAddressFilter] = useState([]);
  const [selectedValue, setSelectedValue] = useState("1");
  const [listAddress, setListAddress] = useState(db.province);
  

  useEffect(() => {
    getListPhotos();
    return () => {};
  }, []);
  console.log(props.controlThreadGiveFor)
  // call api
  //https://smai-back-end.herokuapp.com/post/getPostByTypeAuthor?typeauthor=%7BLoaij
  const getListPhotos = () => {
    const apiURL = `https://smai-app-api.herokuapp.com/post/getPostByTypeAuthor?typeauthor=${typeAuthor}`;
    axios.get(apiURL)
      .then((resjson) => {
        let responData = resjson.data
        let realData = [];
        for (let i=0; i<responData.length;i++) {
          let nameProduct = responData[i].NameProduct;
          for (let j=0; j<nameProduct.length;j++) {
            if (nameProduct[j].NameProduct == props.infoPost.NameProduct[0].NameProduct && nameProduct[j].Category == props.infoPost.NameProduct[0].Category) {
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
  const renderAddress = (address) => {
    let add = address.split(",");
    return add[2] + ", " + add[3];
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

  // handle picker address 
  const handleFilter = (city) => {
    console.log(city)
    setSelectedValue(city);
    if (city == 0) {
      setData(dataAddressFilter);
    } else {
      const dataAddress = dataAddressFilter.filter((pr) => {
        if (pr.address.indexOf(city) != -1) {
          return true;
        } else return false;
      })
      setData(dataAddress);
    }
  }
  const countryList = () => {
    return listAddress.map((x, i) => {
      return <Picker.Item label={x.name} key={i} value={x.name} />;
    });
  };
  const _pressRow = (item) => {
    props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };
  
  // render item product
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.wrapProduct} activeOpacity={0.8} onPress={() => _pressRow(item)}>
        <View style={styles.wrapBorder}>
          <FontAwesome name="user-circle-o" size={70} color="#BDBDBD" />
          <View style={styles.wrapInfor}>
            <Text style={styles.wrapName}>{item.NameAuthor}</Text>
            <View style={styles.wrapAddress}>
              <Entypo name="location" size={24} color="black" />
              <Text style={styles.address}>{renderAddress(item.address)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.wrapBorder}>
          <Text style={styles.description}>{item.title}</Text>
        </View>
        <View style={styles.wrapImage}>
          <Image source={{ uri: item.urlImage[0] }} style={styles.image} />
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
  wrapInfor: {
    marginLeft: "3%",
    width: "80%",
  },
  wrapName: {
    fontSize: 25,
  },
  wrapAddress: {
    flexDirection: "row",
    marginTop: "3%",
  },
  address: {
    fontSize: 18,
    marginLeft: "3%",
  },
  description: {
    fontSize: 23,
    marginLeft: "3%",
    marginBottom: "3%",
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
    resizeMode: "contain",
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
    width: "60%",
    maxWidth: "60%",
    height: "70%",
    paddingLeft: "1%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EEEEEE",
    alignItems: "center",
  },
  searchText: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    fontSize: 20,
    maxWidth: "90%",
  },
});
export default connect(function (state) {
  return { infoPost: state.infoPost, controlThreadGiveFor: state.controlThreadGiveFor }
})(App);
