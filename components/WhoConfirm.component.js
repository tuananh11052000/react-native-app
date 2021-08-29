import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

function WhoConfirm(props) {
  const { who } = props;
  const { dispatch } = props
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //gan typeauthor cho post
  const dispatch_func = async (who) => {
    console.log(who.title)
    if (who.title == 'Hoàn cảnh khó khăn') {
      await dispatch({ type: 'SET_TYPE_AUTHOR', TypeAuthor: 'Cá nhân' })
    }
    else
      await dispatch({ type: 'SET_TYPE_AUTHOR', TypeAuthor: who.title })
  }
  const funcPress = (who) => {
    dispatch_func(who).then((res) => {
      console.log(props.infoPost)
      props.onPress()
    })
  }
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onPress={() => funcPress(who)}>
      <View style={styles.container}>
        <Text style={styles.title}>{who.title}</Text>
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
    fontWeight: '500',
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  }
})

export default connect(function (state) {
  return { infoPost: state.infoPost, auth: state.auth }
})(WhoConfirm);