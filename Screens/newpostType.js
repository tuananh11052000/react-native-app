import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import NewPostType from '../components/newpostType.component';

const heightStatusBar = StatusBar.currentHeight;//get status bar height

export default class PostType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newposttype: [
        { id: 1, title: 'Cần xin đồ' },
        { id: 2, title: 'Tặng cộng đồng' },
        { id: 3, title: 'Tặng người nghèo' },
        { id: 4, title: 'Tặng quỹ nhóm từ thiện' },
        { id: 5, title: 'Tặng quyên góp công ích' },
      ]
    }
  }

  render() {
    const { newposttype } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={newposttype}
          renderItem={({ item }) => <NewPostType newpost={item} />}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    marginTop: heightStatusBar,
  },
});
