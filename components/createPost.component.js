import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import AddImg from '../assets/add.png'

export default function CreatePosts(props) {
  // const { navigation } = props;
  const [selectedValue, setSelectedValue] = useState("1");

  return (
    <View style={styles.wrapContent}>
      <View style={styles.wrapPiker}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        mode={'dropdown'}
        style={{ height: 40,}}
      // style={styles.pikerStyle}
      >
        <Picker.Item label="Tất cả tin đăng" value="1" />
        <Picker.Item label="Tin tặng cộng đồng" value="2" />
        <Picker.Item label="Tin xin đồ" value="3" />
      </Picker>
      </View>
      {/* <View style={styles.wrapBtn}> */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={props.onPress}
        style={styles.btnCreate}
      >
        <Image source={AddImg} style={{ width: 20, height: 20 }} />
        <Text style={styles.btnText}>&ensp;Đăng tin</Text>
      </TouchableOpacity>
      {/* </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapContent: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  wrapPiker: {
    borderWidth: 1,
    width: '60%',
  },
  pickerStyle: {
    height: 40,
    // width: '100%',
  },
  // wrapBtn: {
  // },
  btnCreate: {
   
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#018786',
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    width: '38%',
    justifyContent: 'space-around',
  },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#fff',
  }
})
