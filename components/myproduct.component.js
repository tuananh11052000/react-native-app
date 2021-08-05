import React, { useEffect } from 'react'
import {
  Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, FlatList
} from 'react-native'
import { connect } from "react-redux";
import axios from 'axios'

import { Feather } from '@expo/vector-icons';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const { width, height } = Dimensions.get('window')

function MyProductComponent(props) {
  var { dispatch } = props;
  const calculatingTime = (d1, d2) => {
    d1 = new Date(d1);
    const calHour = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 60 * 1000));
    }
    const calDay = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (24 * 60 * 60 * 1000));
    }
    const calMonth = () => {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    }
    const calYear = () => {
      return d2.getFullYear() - d1.getFullYear();
    }
    if (calYear() != 0)
      return `${calYear()}năm trước `
    else if (calMonth() != 0)
      return `${calMonth()}tháng trước `
    else if (calDay() != 0)
      return `${calDay()}ngày trước `
    else
      return `${calHour()}giờ trước `
  }

  useEffect(() => {
    const getData = async () => {
      let temp = await axios({
        method: 'get',
        url: 'https://smai-app-api.herokuapp.com/post/myPost'
      })
      dispatch({ type: 'UPDATE', data: temp.data })

    }
    getData()

  }, [])
  //Function handling title post
  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1,)
    if (item.length > 20)
      return item.slice(0, 20) + "..."
    else
      return item
  }
  //Function handling type product
  const renderType = (pr) => {
    if (pr.length > 1)
      return pr[0].Category + ", ..."
    else
      return pr[0].Category
  }
  //sang trang detail
  const _pressRow = (item) => {
    props.navigation.navigate('DetailPost', { data: item }) //chuyển trang
  }
  const currentTime = new Date()
  return <View style={style.constainer}>
    {

      props.newestPost.map((item, key) => {
        return (
          <TouchableOpacity key={key} style={style.wrapCategory} activeOpacity={0.8} onPress={() => _pressRow(item)} >
            {/* //dùng onStartShouldSetResponder để click vào view */}
            <View style={style.wrapTop} >
              <Image style={style.tinyLogo} source={{
                uri: item.urlImage[0],
              }} />
              <View style={style.wrapInfoProduct} >
                <MenuContext style={{}}>

                  <View style={style.wrapTitle}>
                    <Text style={style.titlePost}>
                      {
                        renderTitle(item.title)
                      }
                    </Text>
                    < View style={style.wrapMore}>
                      {/* <MenuContext style={{}}> */}
                      <View style={{ alignItems: "flex-end" }}>
                        <Menu>
                          <MenuTrigger>
                            <Feather name="more-vertical" size={20} color="gray" />
                          </MenuTrigger>
                          <MenuOptions customStyles={optionsStyles} onSelect={false}>
                            <MenuOption value="Edit" text="Chỉnh sửa" />
                            <MenuOption value="Delete" text="Xóa" />
                          </MenuOptions>
                        </Menu>
                      </View>
                      {/* </MenuContext> */}
                    </View>
                  </View>

                  <View style={style.wrapTypePrice}>
                    <Text style={style.type}>{renderType(item.NameProduct)}</Text>
                    <Text style={style.price}>Miễn phí</Text>
                  </View>
                  <View style={style.wrapTimeAddress}>
                    <View style={style.wrapTime}>
                      <Feather name="clock" size={20} color="gray" style={{ width: 20, height: 20, }} />
                      <Text style={style.time}>{calculatingTime(item.createdAt, currentTime)}</Text>
                    </View>
                    <Text style={style.address}>{item.address.slice(0, 15) + "..."}</Text>
                  </View>
                </MenuContext>

              </View>
            </View>
            <View style={style.wrapBot} >
              <Text style={style.textCate}>Tặng cộng đồng</Text>
              <Text style={style.textStatus}>Đang hiển thị</Text>
            </View>


          </TouchableOpacity>
        )
      })
    }
  </View>
}

const style = StyleSheet.create({
  constainer: {
    backgroundColor: "#DDD"
  },
  wrapCategory: {
    padding: 15,
    marginBottom: 10,
    flex: 1,
    // alignItems: 'center',
    display: "flex",
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    backgroundColor: "white"
  },
  wrapTop: {
    // padding: 15,
    // marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "white",
    paddingBottom: 5,
  },
  tinyLogo: {
    width: 90,
    height: 90,
  }, wrapTitle: {
    display: "flex",
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, wrapMore: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",

  }, wrapInfoProduct: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 10,
  }, wrapTypePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, wrapTimeAddress: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titlePost: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapTime: {
    display: "flex",
    alignItems: "center",
    flexDirection: 'row',
  },
  time: {
    fontSize: 20,
    marginLeft: 7,
    color: "gray"
  },
  price: {
    color: "green",
    fontSize: 20
  },
  type: {
    fontSize: 20,
    color: "gray"
  },
  address: {
    color: "gray",
    fontSize: 20,
  },
  wrapBot: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  textCate: {
    fontSize: 20,
    color: "gray",
  },
  textStatus: {
    fontSize: 20,
    color: "black"
  }
})

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#f2f2f2',
    width: "50%",
  },
  optionsWrapper: {
    backgroundColor: '#f2f2f2',
  },
  optionWrapper: {
    backgroundColor: 'white',
    margin: 2,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'black',
    fontSize: 16
  },
};

export default connect(function (state) {
  return { num: state.countNumber, newestPost: state.newestPost }
})(MyProductComponent);