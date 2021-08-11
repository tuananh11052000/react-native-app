import React, { Fragment, Component, useState, useEffect } from "react";
import PostDonationComponents from '../components/postDonation.components';    
import {View, StyleSheet} from "react-native";

export default function PostDonation(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <PostDonationComponents navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})