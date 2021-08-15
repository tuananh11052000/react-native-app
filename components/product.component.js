import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl, 
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import SearchComponent from "../components/search.component";

import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

function ProductComponent(props) {
  var { dispatch } = props;
  const [loading, setloading] = useState(true);

  const [dataRender, setData] = useState([])

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
  //get post

  useEffect(() => {
    const getDataHome = async () => {
      let temp = await axios({
        method: "get",
        url: "https://smai-app-api.herokuapp.com/post/getNewPost",
      }).finally(() =>setloading(false));
      setData(temp.data)
    };
    const getDataHistory = async()=>{
      let temp = await axios({
        methoid:'GET',
        url:"https://smai-app-api.herokuapp.com/user/getHistoryPost",
        headers:{
          Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SUQiOiI2MGU5Y2M5ZjJkMzlkYzJkMTBkOGM2OWQiLCJpYXQiOjE2Mjc5OTkwNzh9.XxzvJigOW0GGSotGY69Xs-GxuEZ8DFxfRd5WzetDvgc'
        }
      }).finally(() =>setloading(false));
      console.log("begin")
      console.log(temp.data.length)
      setData(temp.data)
    }
    if(props.type=="history")
    {
      getDataHistory()
    }
    else
      getDataHome();
  }, [props.data_]);
  console.log(dataRender.length)
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

  const _pressRow = (item) => {
    props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };

  const currentTime = new Date();

  const renderItem = ({ item }) => (
     
    <TouchableOpacity
      style={style.wrapCategory}
      activeOpacity={0.4}
      onPress={() => _pressRow(item)}
    >
      {/* //dùng onStartShouldSetResponder để click vào view */}

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
          <Text style={style.address}>{item.address.slice(0, 15) + "..."}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  // space between item flatlist
  const ItemSeparatorView = () => {
    return (
    <View style={{height: 10, width: '100%', backgroundColor: '#EEEEEE'}}/>
    )
  }
  return (
    <View style={style.containerr}>
      {loading ? (
          <View style={{flexDirection: 'row', justifyContent: 'center', height: '100%',}}>
                <ActivityIndicator color="#BDBDBD" size="small" />
          </View>
      ) : (
        <FlatList
          data={dataRender}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  containerr: {
    backgroundColor: "#FFF",
  },
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
    display: "flex",
    alignItems: "center",
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

export default connect(function (state) {
  return { newestPost: state.newestPost };
})(ProductComponent);
