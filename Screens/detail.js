import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'

function Detail(props) {
    var { dispatch } = props;
    useEffect(() => {
        const getData = async () => {
            let temp = await axios({
                method: 'get',
                url: 'https://smai-app-api.herokuapp.com/post/getFullPost'
            })
            dispatch({ type: 'UPDATE', data: [temp.data[0]] })
        }
        getData()
    }, [])
    function addNumber() {
        dispatch({ type: 'ADD', value: 1 });
    }
    return (
        <View style={styles.container}>
            {
                props.newestPost.map((item, key) => {
                    return (
                        <Text key={key}>{item.NameAuthor}</Text>
                    )
                })
            }
            <Text onPress={addNumber}>haha</Text>
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