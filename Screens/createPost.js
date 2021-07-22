import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'

const heightStatusBar = StatusBar.currentHeight;//lay ra chieu cao cua thanh trang thai

function CreatePost(props) {
    return (
        <View style={styles.container}>
            <Text>Trang đăng tin</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: heightStatusBar,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default connect(function (state) {
    return { num: state.countNumber, newestPost: state.newestPost }
})(CreatePost);