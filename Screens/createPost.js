import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'

import CreatePosts from '../components/createPost.component';
import ProductComponent from '../components/product.component'

const heightStatusBar = StatusBar.currentHeight;//lay ra chieu cao cua thanh trang thai

function CreatePost(props) {
  const { navigation } = props;
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <CreatePosts onPress={() => navigation.navigate('PostType')} />
        <ProductComponent />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: heightStatusBar,
    backgroundColor: '#f2f2f2',
  },
});

export default connect(function (state) {
  return { num: state.countNumber, newestPost: state.newestPost }
})(CreatePost);