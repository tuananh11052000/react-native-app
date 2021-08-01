import React, { useState } from 'react';
import {
  View, StyleSheet, Text,
  Image,
  ScrollView,
  Dimensions,
  Linking
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'galio-framework';
import config from '../config';
import axios from 'axios';
const { width } = Dimensions.get('window');
const height = width * 0.6;
export default function App(props) {
  let data = props.route.params.data

  const [active, setActive] = useState(0);
  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  }
     //Function handling title post
  // const renderTypeAuthor = (item) => {
  //     if (item == "tangcongdong")
  //         return "Tặng cộng đồng"
  //     else
  //         return item
  // }
  return (
    <ScrollView style={styles.container}>
      <View>
        <ScrollView
          pagingEnabled
          horizontal
          onScroll={change}
          showsHorizontalScrollIndicator={false}
          style={styles.container}>
          {
            data.urlImage.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image}
              />
            ))
          }
        </ScrollView>
        <View style={styles.pagination}>
          {
            data.urlImage.map((i, k) => (
              <Text key={k} style={k == active ? styles.pagingActiveText : styles.pagingText}>⬤</Text>
            ))
          }

        </View>
      </View>
      <View style={styles.wrapText}>
        <View>
          <Text style={styles.textTitle}>{data.title}</Text>
        </View>
        <View style={styles.wrapCategory}>
          <Text style={styles.textCategory}>Quần áo trẻ em</Text>
          <Text style={styles.textPrice}>Miễn phí</Text>
        </View>
        <View>
          <Text style={styles.textAddress}>
            <Entypo name="location" size={24} color="black" /> {"  "}
           {data.address}
          </Text>
        </View>
        <View style={styles.wrapInfor}>
          <FontAwesome name="user-circle-o" size={70} color="#BDBDBD" />
          <View style={styles.wrapName}>
            <Text style={styles.textName}>{data.NameAuthor}</Text>
            <Text style={styles.textTypeUser}>Cá nhân</Text>
          </View>
        </View>
        <View>
          <Text style={styles.textDescription}>{data.note}
          </Text>
        </View>
        <Button color={config.color_btn_1} size="large" onPress={() => { Linking.openURL('tel:0123213'); }}><Text style={styles.textCall}>Gọi điện</Text></Button>
      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width,
    height,
  },
  scroll: {
    width,
    height,
  },
  image: {
    width,
    height,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  pagingText: {
    fontSize: (width / 30), color: '#888',
    margin: 3,
  },
  pagingActiveText: {
    fontSize: (width / 30), color: '#fff',
    margin: 3,
  },
  wrapText: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,

  },
  textTitle: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  wrapCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCategory: {
    fontSize: 20,
  },
  textPrice: {
    fontSize: 20,
    color: '#3DA20E',
  },
  textAddress: {
    color: '#A1A1A1',
    fontSize: 18,
  },
  wrapInfor: {
    flexDirection: 'row',
    borderTopWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  wrapName: {
    marginLeft: 20,
  },
  textName: {
    fontSize: 25,
  },
  textTypeUser: {
    fontSize: 20,
    color: '#757575',
  },
  textDescription: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
  }, 
  textCall: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  }
})