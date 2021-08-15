import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import ProductComponent from '../components/product.component'
import axios from 'axios'

export default function historyPage(props) {
  const [data, getData] = useState({})
  useEffect(()=>{
    const getDataFunc = async()=>{
      await axios({
        methoid:'GET',
        url:"https://smai-app-api.herokuapp.com/user/getHistoryPost",
        headers:{
          Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SUQiOiI2MGU5Y2M5ZjJkMzlkYzJkMTBkOGM2OWQiLCJpYXQiOjE2Mjc5OTkwNzh9.XxzvJigOW0GGSotGY69Xs-GxuEZ8DFxfRd5WzetDvgc'
        }
      }).then(res=>{
        getData({...data, data:res.data})
      })
    }
    getDataFunc()
  },[])
  const { navigation } = props;
  const renderItem = ()=>{
    if(!data)
      return <ProductComponent navigation={navigation}/>
    else
    {
      return <ProductComponent navigation={navigation} data_={data.data} type="history"/>
    }
  }

  return (
    <View style={styles.container}>
      <Text>{data.length}</Text>
      {renderItem()}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    child: {

    }, gift_component: {
        paddingLeft: 30,
        paddingRight: 30
    },
    wrap_search_bgr: {
        flex: 1
    },

});