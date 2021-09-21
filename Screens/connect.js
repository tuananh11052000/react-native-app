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
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  SectionList,
} from "react-native";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import config from "../config";
import { Entypo, Foundation, EvilIcons } from "@expo/vector-icons";
import ConnectPost from "../components/connectPost.component";
import ProductTitleConnect from "../components/productTitleConnect.component";
import * as SecureStore from "expo-secure-store";
import Chip from "../components/Chip.Component";
import { Searchbar } from "react-native-paper";
import axios from "axios";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
var { width } = Dimensions.get("window");
const list = [
  {
    title: "Tất cả",
    id: "0",
    checked: true,
  },
  {
    title: "Đã nhận",
    id: "1",
    checked: false,
  },
  {
    title: "Đã tặng",
    id: "2",
    checked: false,
  },
  {
    title: "Chưa nhận",
    id: "3",
    checked: false,
  },
  {
    title: "Chưa tặng",
    id: "4",
    checked: false,
  },
];

function Connection(props) {
  const { dispatch } = props;
  const [listitem, setListItem] = useState(list);
  const [itemSelected, setItemSelected] = useState("0");
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [refreshing, setrefreshing] = useState(true);
  useEffect(() => {
    const getConnectPostDS = async () => {
      if (props.auth.isLogin == true) {
        let result = await SecureStore.getItemAsync("token");
        await axios({
          method: "get",
          url: "https://api.smai.com.vn/transaction/transaction-connected",
          headers: {
            Authorization: result,
          },
        })
          .then((res) => {
            setDataAll(res.data.data.data);
            setData(res.data.data.data);
            dispatch({ type: "SAVE_DATA_TRANS", data: res.data.data.data });
          })
          .catch((error) => {
            console.log("Error: ", error);
          })
          .finally(() => {
            dispatch({ type: "setNoReload" });
            setrefreshing(false);
          });
      }
    };
    getConnectPostDS();
    return () => {
    
    };
  }, [props.reloadPost]);
  const handlePress = (item, index) => {
    if (item.checked != true) {
      setItemSelected(item.id);
      item.checked = !item.checked;
      const array = [...listitem];
      array.map((value, index) => {
        if (value != item) {
          value.checked = false;
        }
      });
      setListItem(array);
      filter(item.id)
    }
  };
  const onRefresh = () => {
    setData([]);
    getConnectPostDS();
  };
  

  const filter = (itemvalue) => {
    if (itemvalue == "0") {
      setData(props.dataTrans.data);
    }
    if (itemvalue == "1") {
      let tempData = [...dataAll];
      let a1 = [];
      for (let i = 0; i < tempData.length; i++) {
        let temp = tempData[i].data;
        let arr = temp.filter((item) => {
          if (item.typetransaction == "Đã nhận") {
            return true;
          } else {
            return false;
          }
        });
        if (arr.length != 0) {
          let obj = {
            data: arr,
            title: tempData[i].title,
          };
          a1.push(obj);
        } 
        
      }
      setData(a1);
    }
    if (itemvalue == "2") {
      let tempData = [...dataAll];
      let a1 = [];
      for (let i = 0; i < tempData.length; i++) {
        let temp = tempData[i].data;
        let arr = temp.filter((item) => {
          if (item.typetransaction == "Đã tặng") {
            return true;
          } else {
            return false;
          }
        });
        if (arr.length != 0) {
          let obj = {
            data: arr,
            title: tempData[i].title,
          };
          a1.push(obj);
        } 
      }
      setData(a1);
    }
    if (itemvalue == "3") {
      let tempData = [...dataAll];
      let a1 = [];
      for (let i = 0; i < tempData.length; i++) {
        let temp = tempData[i].data;
        let arr = temp.filter((item) => {
          if (item.typetransaction == "Chưa nhận") {
            return true;
          } else {
            return false;
          }
        });
        if (arr.length != 0) {
          let obj = {
            data: arr,
            title: tempData[i].title,
          };
          a1.push(obj);
        } 
      }
      setData(a1);
    }
    if (itemvalue == "4") {
      let tempData = [...dataAll];
      let a1 = [];
      for (let i = 0; i < tempData.length; i++) {
        let temp = tempData[i].data;
        let arr = temp.filter((item) => {
          if (item.typetransaction == "Chưa tặng") {
            return true;
          } else {
            return false;
          }
        });
        if (arr.length != 0) {
          let obj = {
            data: arr,
            title: tempData[i].title,
          };
          a1.push(obj);
        } 
      }
      setData(a1);
    }
  };
  const handleSearch = (text) => {
    setQuery(text);
    // const tempData=[...dataAll];
    if (text == "") setData(dataAll);
    else {
     
      let a1 = [];
      for (let i = 0; i < dataAll.length; i++) {
        let temp = dataAll[i].data;
        let arr = temp.filter((item) => {
          if (
            item.SenderUser.FullName.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
            item.PostData.NameAuthor.toLowerCase().indexOf(text.toLowerCase()) != -1
          )
            return true;
          else return false;
        });
        if (arr.length != 0) {
          let obj = {
            data: arr,
            title: dataAll[i].title,
          };
          a1.push(obj);
        } 
      }
      setData(a1);
      
    }

  };
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };
  const listHeader = () => {
    return (
      <View style={styles.wrapHeader}>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listitem.map((item, index) => (
            <Chip
              key={item.id}
              onPress={() => handlePress(item, index)}
              textStyle={
                item.checked ? styles.textChipActive : styles.textChipNoActive
              }
              style={
                item.checked
                  ? styles.chipOutLineActive
                  : styles.chipOutLineNoActive
              }
              title={item.title}
              active={item.checked}
            />
          ))}
        </ScrollView>
      </View>
    );
  };
  const pressItem = (item) => {
    if (
      (item.SenderUser.PhoneNumber == props.auth.PhoneNumber &&
        item.PostData.TypeAuthor == "tangcongdong") ||
      (item.ReceiverUser.PhoneNumber == props.auth.PhoneNumber &&
        item.PostData.TypeAuthor != "tangcongdong")
    ) {
      props.navigation.navigate("DetailConnectPost", {
        name: "Chi tiết nhận tặng",
        titlePerson: "NGƯỜI TẶNG",
        data: item,
      }); //chuyển trang
    } else {
      props.navigation.navigate("DetailConnectPost", {
        name: "Chi tiết bạn tặng",
        titlePerson: "NGƯỜI NHẬN",
        data: item,
      }); //chuyển trang
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
            <View>
              <View style={styles.wrapTop}>
          <View style={styles.wrapSearch}>
            <EvilIcons name="search" size={30} color="#BDBDBD" />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={query}
              onChangeText={(queryText) => handleSearch(queryText)}
              placeholder="Tìm kiếm..."
              style={styles.searchText}
            />
          </View>
          <TouchableOpacity style={styles.wrapFilter}>
            <Text style={styles.textFilter}>Bộ lọc</Text>
            <Foundation name="filter" size={width * 0.05} color="#BDBDBDBD" />
          </TouchableOpacity>
        </View>
              <SectionList
                sections={data}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ItemSeparatorComponent={ItemSeparatorView}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <ConnectPost
                    urlImage={item.urlImage[0]}
                    title={item.PostData._id}
                    nameAuthorPost={item.PostData.NameAuthor}
                    nameAuthorMess={item.SenderUser.FullName}
                    phoneAuthorPost={item.ReceiverUser.PhoneNumber}
                    phoneAccount={props.auth.PhoneNumber}
                    time={item.PostData.updatedAt}
                    status={item.isStatus}
                    onPress={() => pressItem(item)}
                    typeAuthor={item.PostData.TypeAuthor}
                    statusType={item.typetransaction}
                  />
                )}
                renderSectionHeader={({ section }) => (
                  <View style={styles.wrapTitleSection}>
                    <Text style={styles.titleSection}>{section.title}</Text>
                  </View>
                )}
                ListHeaderComponent={listHeader}
              />
            </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: "4%",
  },
  wrapHeader: { paddingLeft: "2%", paddingRight: "2%", marginBottom: "2%" },
  wrapTop: {
    flexDirection: "row",
    marginBottom: "2%",
    paddingLeft: '2%',
    justifyContent: "space-between",
  },
  wrapSearch: {
    flexDirection: "row",
    width: "80%",
    maxWidth: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
    padding: "1%",
    backgroundColor: "#EFEFEF",
  },
  searchText: {
    fontSize: config.fontsize_5,
    marginLeft: "3%",
    maxWidth: "85%",
    width: "85%",
    color: "#000",
    backgroundColor: "#EFEFEF",
  },
  wrapFilter: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  textFilter: {
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
    color: "#BDBDBDBD",
  },
  chipOutLineActive: {
    borderWidth: 1,
    borderColor: "#EF1A26",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    marginRight: width * 0.02,
    paddingLeft: width * 0.02,
    paddingRight: width * 0.02,
  },
  chipOutLineNoActive: {
    borderWidth: 1,
    borderColor: "#BDBDBDBD",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    marginRight: width * 0.02,
    paddingLeft: width * 0.02,
    paddingRight: width * 0.02,
  },
  textChipActive: {
    fontSize: config.fontsize_5,
    color: "#000",
    fontFamily: "OpenSans_600SemiBold",
  },
  textChipNoActive: {
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_400Regular",
    color: "#BDBDBD",
  },
  wrapTitleSection: {
    backgroundColor: "#DDD",
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  titleSection: {
    fontSize: config.fontsize_5,
    color: "#000",
    fontFamily: "OpenSans_600SemiBold",
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
})(Connection);
