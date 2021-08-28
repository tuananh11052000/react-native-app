import React, { useEffect, useState } from "react";
import { View,TextInput, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import config from "../config";
import AppLoading from 'expo-app-loading';
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
        url: "https://smai-app-api.herokuapp.com/post/getFullPost",
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
  //""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  const calculatingTime = (d1, d2) => {
    d1 = new Date(d1);
    const calMinute = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 1000));
    };
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
    if (calYear() != 0) return `${calYear()}y `;
    else if (calMonth() != 0) return `${calMonth()}mth `;
    else if (calDay() != 0) return `${calDay()}d `;
    else if (calHour() != 0) return `${calHour()}h `;
    else return `${calMinute()}m `;
  };
  //Function handling title post
  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 20) return item.slice(0, 20) + "...";
    else return item;
  };
  //Function handling type product
  const renderType = (pr) => {
    if (pr.length > 1) return pr[0].Category + ", ...";
    else return pr[0].Category;
  };
  // render address
 const renderDistrict = (district, city) => {
  if (district.indexOf("Thành phố") != -1) {
    return district.slice(10);
  } 
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") == -1) {
    return district.slice(5);
  }
  const distritNumber = "Quận 1, Quận 2, Quận 3, Quận 4, Quận 5, Quận 6, Quận 7, Quận 8, Quận 9, Quận 10, Quận 11, Quận 12"
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) != -1) {
    return district;
  }
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) == -1) {
    return district.slice(5);
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
  //sang trang detail
  const _pressRow = (item) => {
    props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };
  const currentTime = new Date();
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
  function renderItem(item) {
    return (
      <TouchableOpacity
        style={style.wrapCategory}
        onPress={() => _pressRow(item)}
      >
        <Image
          style={style.tinyLogo}
          source={{
            uri: item.urlImage[0],
          }}
        />
        <View style={style.wrapInfoProduct}>
          <Text style={style.titlePost}>{renderTitle(item.title)}</Text>
          <View style={style.wrapTypePrice}>
            <Text style={style.type}>{renderType(item.NameProduct)}</Text>
            <Text style={style.price}>Miễn phí</Text>
          </View>
          <View style={style.wrapTimeAddress}>
            <View style={style.wrapTime}>
              <Feather name="clock" size={20} color="gray" />
              <Text style={style.time}>
                {calculatingTime(item.createdAt, currentTime)}
              </Text>
            </View>
            <Text style={style.address}>
              {renderAddress(item.address)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
 
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
            placeholder="Nhập cái gì đó..."
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
        renderItem={({ item }) => renderItem(item)}
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
