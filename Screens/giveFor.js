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
  const addr = props.dataCategory.addressFilter;
  const { navigation, dispatch } = props;
  useEffect(() => {
    if (addr.length == 0) {
      getListPhotos();
    } else {
      filterAddressFunc(addr);
    }
  }, [addr]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getListPhotos();
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  const filterAddressFunc = (address) => {
    if (props.redirectTransaction == "gui") {
      const listTemp = data.filter((pr) => {
        if (pr.address.indexOf(address) != -1) {
          return true;
        } else return false;
      });
      setData(listTemp);
    } else {
      const listTemp = data.filter((pr) => {
        if (pr.SenderAddress.indexOf(address) != -1) {
          return true;
        } else return false;
      });
      setData(listTemp);
    }
  };
  // call api
  const getListPhotos = () => {
    // ki???m tra n???u t??? trang category chuy???n qua th?? call api nh???ng ng?????i xin ?????
    if (props.redirectTransaction == "gui") {
      const apiURL = `https://api.smai.com.vn/post/getPostByTypeAuthor?typeauthor=${typeAuthor}`;
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
                nameProduct[j].Category ==
                  props.infoPost.NameProduct[0].Category
              ) {
                realData.push(responData[i]);
              }
            }
          }

          setData(realData);
          setDataFilter(realData);
          dispatch({ type: "setNoReload" });
        })
        .catch((error) => {
          console.log("Error: ", error);
        })
        .finally(() => setisLoading(false));
    } else {
      // n???u t??? l???i nh???n ch??? tin ????ng th?? call api l???i nh???n
      let postId = props.route.params.postId;
      let result = props.auth.token;
      axios({
        method: "get",
        url: `https://api.smai.com.vn/transaction/transaction-post?postId=${postId}`,
        headers: {
          Authorization: result,
        },
      })
        .then((resjson) => {
          setData(resjson.data.data.data);
          // console.log(resjson.data.data.data)
          setDataFilter(resjson.data.data.data);
        })
        .catch((error) => {
          console.log("Error: ", error.message);
        })
        .finally(() => setisLoading(false));
    }
  };

  const showFilterAddress = () => {
    if (addr != "") {
      let temp = addr.split(",");
      if (temp[0].length > 10) return temp[0].slice(0, 10);
      else return temp[0];
    } else {
      return "T???nh/th??nh ph???";
    }
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

  // render item product
  const renderItem = ({ item }) => {
    let postId = props.route.params.postId;
    if (props.redirectTransaction == "gui") {
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
          idPost={postId}
        />
      );
    } else {
      return (
        <ProductGiveFor
          item={item}
          nameAuthor={item.usersender.FullName}
          title={item.note}
          time={item.updatedAt}
          address={item.SenderAddress}
          urlImage={item.urlImage[0]}
          navigation={navigation}
          authorID={item.SenderID}
          viewDetail="false"
          idTrans={item._id}
          isStatus={item.isStatus}
        />
      );
    }
  };

  return (
    <View style={isLoading ? styles.containterLoading : styles.containter}>
      {isLoading ? (
        <ActivityIndicator color="#BDBDBD" size="small" />
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
                placeholder="T??m ki???m"
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
                <Text style={{ color: "#616161", fontSize: config.fontsize_3 }}>
                  {showFilterAddress()}
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
          <ScrollView>
            {data.map((item, index) => (
               <ProductGiveFor
               key={index}
               item={item}
               nameAuthor={item.usersender.FullName}
               title={item.note}
               time={item.updatedAt}
               address={item.SenderAddress}
               urlImage={item.urlImage[0]}
               navigation={navigation}
               authorID={item.SenderID}
               viewDetail="false"
               idTrans={item._id}
               isStatus={item.isStatus}
             />
            ))}
          </ScrollView>
          {/* <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => `key-${item._id}`}
          ></FlatList> */}
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
    color: "#BDBDBD",
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
    redirectTransaction: state.redirectTransaction,
    auth: state.auth,
    reloadPost: state.reloadPost,
  };
})(App);
