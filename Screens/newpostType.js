import React from 'react';
import { FlatList, StyleSheet, View, StatusBar } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios';


import NewPostType from '../components/newpostType.component';

// const heightStatusBar = StatusBar.currentHeight;//get status bar height

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
    const { navigation } = this.props;
    const { newposttype } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={newposttype}
          renderItem={({ item }) =>
            <NewPostType newpost={item}
              onPress={() => navigation.navigate('WhoConfirm')} />}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: heightStatusBar,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
});
