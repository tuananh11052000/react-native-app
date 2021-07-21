import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from "react-redux";

import GiftComponent from '../components/gift.component';
import SearchComponent from '../components/search.component'
import TitleComponent from '../components/title.component'
import ProductComponent from '../components/product.component'

function Home(props) {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <ScrollView>
                <SearchComponent />
                <GiftComponent onPress={() => navigation.navigate('Detail')} style={styles.gift_component} />
                <TitleComponent title="Tin mới nhất" />
                <ProductComponent />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    child: {

    }, gift_component: {
        paddingLeft: 30,
        paddingRight: 30
    },
    wrap_search_bgr: {
        flex: 1
    }
});

export default connect(function (state) {
    return { num: state.countNumber, newestPost: state.newestPost }
})(Home);