import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { connect } from "react-redux";

import GiftComponent from '../components/gift.component';
import SearchComponent from '../components/search.component'
import TitleComponent from '../components/title.component'
import ProductComponent from '../components/product.component'
import NewsedBox from '../components/newsedBox.components';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

const heightStatusBar = StatusBar.currentHeight;
function Home(props) {
    const { dispatch } = props;
    useEffect(() => {
        const checkTokenLocal = async () => {
            let result = await SecureStore.getItemAsync('token');
            console.log(result)
            let PhoneNumber = await SecureStore.getItemAsync('PhoneNumber')
            if (result) {
                dispatch({ type: "SIGN_IN", token: result, PhoneNumber: PhoneNumber })
                return await result
            } else {
                return await null
            }
        }
        checkTokenLocal()
    }, [])
    const actionOnPress = () => {
        if (props.auth.isLogin == true)
            navigation.navigate('ConfirmAddress')
        else
            navigation.replace('Authentication')
    }
    const { navigation } = props;
    //ConfirmAddress
    return (
        <View style={styles.container}>
            <ScrollView>
                <SearchComponent onPress={() => navigation.navigate('Search')} />
                <GiftComponent onPress={() => actionOnPress()} style={styles.gift_component} />
                <TitleComponent title="Tin đã đăng" />
                <NewsedBox title="Tặng cộng đồng" />
                <TitleComponent title="Tin mới nhất" />
                <ProductComponent navigation={navigation} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: heightStatusBar,
        flex: 1, 
        backgroundColor: '#FFF'
    },
    child: {

    }, gift_component: {
        paddingLeft: 30,
        paddingRight: 30
    },
    wrap_search_bgr: {
        flex: 1
    },

});

export default connect(function (state) {
    return { auth: state.auth, infoPost: state.infoPost }
})(Home);