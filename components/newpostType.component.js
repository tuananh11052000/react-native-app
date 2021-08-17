import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function NewPostType(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    marginTop: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  }
})