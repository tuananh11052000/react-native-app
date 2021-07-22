import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'

function Detail(props) {
    return (
        <View style={styles.container}>
            <Text>Detail</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default connect(function (state) {
    return { num: state.countNumber, newestPost: state.newestPost }
})(Detail);