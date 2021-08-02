import React, { useEffect } from 'react'
import {
    Image, Text, View, StyleSheet, TouchableOpacity, Dimensions,FlatList 
} from 'react-native'
import { connect } from "react-redux";
import axios from 'axios'
import SearchComponent from '../components/search.component'

import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

function ProductComponent(props) {
    var { dispatch } = props;
    const calculatingTime = (d1, d2) => {
        d1 = new Date(d1);
        const calHour = () => {
            var t2 = d2.getTime();
            var t1 = d1.getTime();
            return parseInt((t2 - t1) / (60 * 60 * 1000));
        }
        const calDay = () => {
            var t2 = d2.getTime();
            var t1 = d1.getTime();
            return parseInt((t2 - t1) / (24 * 60 * 60 * 1000));
        }
        const calMonth = () => {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
        }
        const calYear = () => {
            return d2.getFullYear() - d1.getFullYear();
        }
        if (calYear() != 0)
            return `${calYear()} năm trước`
        else if (calMonth() != 0)
            return `${calMonth()} tháng trước`
        else if (calDay() != 0)
            return `${calDay()} ngày trước`
        else
            return `${calHour()} giờ trước`
    }

    useEffect(() => {
        const getData = async () => {
            let temp = await axios({
                method: 'get',
                url: 'https://smai-app-api.herokuapp.com/post/getNewPost'
            })
            dispatch({ type: 'UPDATE', data: temp.data })
           
        }
        getData()
      
    }, [])
    //Function handling title post
    const renderTitle = (item) => {
        item = item.charAt(0).toUpperCase() + item.slice(1,)
        if (item.length > 28)
            return item.slice(0, 28) + "..."
        else
            return item
    }
    //Function handling type product
    const renderType = (pr) => {
        if (pr.length > 1)
            return pr[0].Category + ", ..."
        else
            return pr[0].Category
    }
    //sang trang detail
    const _pressRow = (item) => {
        props.navigation.navigate('DetailPost',{data:item}) //chuyển trang
      }
    const currentTime = new Date()
    return <View style={style.constainer}>
        {
            
            props.newestPost.map((item, key) => {
                return (
                    <TouchableOpacity key={key} style={style.wrapCategory} onPress={()=> _pressRow(item)} > 
                    {/* //dùng onStartShouldSetResponder để click vào view */}
                        <Image style={style.tinyLogo} source={{
                            uri: item.urlImage[0],
                        }} />
                        <View style={style.wrapInfoProduct} >
                            <Text style={style.titlePost}>
                                {
                                    renderTitle(item.title)
                                }
                            </Text>
                            <View style={style.wrapTypePrice}>
                                <Text style={style.type}>{renderType(item.NameProduct)}</Text>
                                <Text style={style.price}>Miễn phí</Text>
                            </View>
                            <View style={style.wrapTimeAddress}>
                                <View style={style.wrapTime}>
                                    <Feather name="clock" size={20} color="gray" />
                                    <Text style={style.time}>{calculatingTime(item.createdAt, currentTime)}</Text>
                                </View>
                                <Text style={style.address}>{item.address.slice(0, 15) + "..."}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    </View>
}

const style = StyleSheet.create({
    constainer: {
        backgroundColor: "#ADB5BD"
    },
    wrapCategory: {
        padding: 15,
        marginBottom: 10,
        flex: 1,
        alignItems: 'center',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: "white"
    }, tinyLogo: {
        width: 90,
        height: 90,
    }, wrapInfoProduct: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "space-around"
    }, wrapTypePrice: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, wrapTimeAddress: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titlePost: {
        fontSize: 20,
        fontWeight: "900"
    },
    wrapTime: {
        flexDirection: 'row',
    },
    time: {
        fontSize: 16,
        marginLeft: 7,
        color: "gray"
    },
    price: {
        color: "green",
        fontSize: 17
    },
    type: {
        fontSize: 17,
        color: "gray"
    },
    address: {
        color: "gray"
    }
})

export default connect(function (state) {
    return { num: state.countNumber, newestPost: state.newestPost }
})(ProductComponent);