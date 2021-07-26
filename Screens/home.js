import React from 'react';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
import { connect } from "react-redux";

import GiftComponent from '../components/gift.component';
import SearchComponent from '../components/search.component'
import TitleComponent from '../components/title.component'
import ProductComponent from '../components/product.component'

const heightStatusBar = StatusBar.currentHeight;
function Home(props) {
    // getValueFor();
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <ScrollView>
                <SearchComponent onPress={() => navigation.navigate('Search')} />
                <GiftComponent onPress={() => navigation.navigate('ConfirmAddress')} style={styles.gift_component} />
                <TitleComponent title="Tin mới nhất" />
                <ProductComponent />
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
    return { num: state.countNumber, newestPost: state.newestPost }
})(Home);