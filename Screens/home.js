import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, Button } from 'react-native';
import { connect } from "react-redux";

import GiftComponent from '../components/gift.component';
import SearchComponent from '../components/search.component'
import TitleComponent from '../components/title.component'
import ProductComponent from '../components/product.component'
import NewsedBox from '../components/newsedBox.components';
import * as SecureStore from 'expo-secure-store';

const heightStatusBar = StatusBar.currentHeight;
function Home(props) {
    // getValueFor();
    const { dispatch } = props;
    useEffect(() => {
        const checkTokenLocal = async () => {
            let result = await SecureStore.getItemAsync('token');
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
    const { navigation } = props;

    return (
        <View style={styles.container}>
            <ScrollView>
                <SearchComponent onPress={() => navigation.navigate('Search')} />
                <GiftComponent onPress={() => navigation.navigate('ConfirmAddress')} style={styles.gift_component} />
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
        flex: 1
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
    return { auth: state.auth }
})(Home);