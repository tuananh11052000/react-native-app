import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GiftComponent from './components/gift.component';
import SearchComponent from './components/search.component'

export default function App(props) {
  const [item, setItem1] = useState([{ id: 1, name: "Tặng công đồng", img: "gift2" }, { id: 2, name: "Tặng người nghèo", img: "gift1" },
  { id: 3, name: "Tặng quỹ từ thiện", img: "gift2" },
  { id: 4, name: "quyên góp công ích", img: "gift1" }
  ]);
  return (
    <View style={styles.container}>
      <SearchComponent />
      <GiftComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
    backgroundColor: '#fff'
  },
  child: {

  }
});
