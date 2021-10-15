import React, { useEffect, useState } from "react";
import { View,TextInput, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import config from "../config";
import AppLoading from 'expo-app-loading';
import ProductComponent from '../components/product.component';
import {
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";

import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
import { Platform } from "react-native";
export default function (props) {
   const { navigation } = props;
  const [allPost, setAllPost] = useState([]);
  const [resultSearch, setResult] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  useEffect(() => {
    const getData = async () => {
      let temp = await axios({
        method: "get",
        url: "https://api.smai.com.vn/post/getFullPost",
      });
      setAllPost(temp.data);
      setResult(temp.data)
      // dispatch({ type: 'UPDATE', data: temp.data })
    };
    getData();
  }, []);
  const getResult =async (value) => {
    setKeySearch(value);
    if (keySearch == "") {
      await setResult(allPost);
    } else {
      const data = allPost.filter((pr) => {
        if (
          pr.NameAuthor.toLowerCase().indexOf(keySearch.toLowerCase()) != -1 ||
          pr.title.toLowerCase().indexOf(keySearch.toLowerCase()) != -1
        )
          return true;
        else return false;
      });
      setResult(data);
    }
  };
  
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };


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
        isHistory="no"
      />
    );
  };
 
 function backleft(){ 
       if(Platform.OS == 'ios')
       {
         return (
           <AntDesign
             name="left"
             size={28}
             color="white"
             onPress={() => navigation.goBack()}
           />
         );
       }else{
         return (
           <AntDesign
             name="arrowleft"
             size={28}
             color="white"
             onPress={() => navigation.goBack()}
           />
         );
       }
   }
  return (
    <View style={{flex:1}}>
      <View
        style={{
          height: config.heightStatusBar,
          width: "100%",
          backgroundColor: config.color_header_background,
        }}
      ></View>
      <View style={style.wrapHeader}>
        {backleft()}
        <View style={style.wrapSearch}>
          <EvilIcons name="search" size={30} color="#BDBDBD" />
          <TextInput
            placeholder="Nhập tìm kiếm..."
            onChangeText={async (value) => getResult(value)}
            value={keySearch}
            lightTheme="true"
            color="black"
            style={style.searchText}
          />
        </View>
      </View>
      <FlatList
        data={resultSearch}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} 
        ItemSeparatorComponent={ItemSeparatorView}
        
      />
    </View>
  );
}
const style = StyleSheet.create({
  // constainer: {
  //   backgroundColor: config.color_header_background,
  // },
  wrapHeader: {
    height: 60,
    backgroundColor: config.color_header_background,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapSearch: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "85%",
    maxWidth: "85%",
    height: "70%",
    paddingLeft: "1%",
    marginLeft: "4%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
  },
  searchText: {
    backgroundColor: "#fff",
    fontSize: 18,
    marginLeft: "3%",
    maxWidth: "85%",
    width: "85%",
  },
  wrapCategory: {
    padding: 15,
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
