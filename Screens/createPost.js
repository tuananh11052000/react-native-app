import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'

import CreatePosts from '../components/createPost.component';
import MyProductComponent from '../components/myproduct.component'

// const heightStatusBar = StatusBar.currentHeight;//lay ra chieu cao cua thanh trang thai

function CreatePost(props) {
  const { navigation } = props;
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <CreatePosts onPress={() => navigation.navigate('PostType')} />
        <MyProductComponent navigation={navigation}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: heightStatusBar,
    backgroundColor: '#f2f2f2',
  },
});

export default connect(function (state) {
  return { auth: state.auth, infoPost: state.infoPost }
})(CreatePost);
