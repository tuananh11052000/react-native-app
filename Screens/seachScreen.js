import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { SearchBar } from 'react-native-elements';
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';


export default function (props) {
    const [allPost, setAllPost] = useState([])
    const [resultSearch, setResult] = useState([])
    const [keySearch, setKeySearch] = useState("")
    useEffect(() => {
        const getData = async () => {
            let temp = await axios({
                method: 'get',
                url: 'https://smai-app-api.herokuapp.com/post/getFullPost'
            })
            setAllPost(temp.data)
            // dispatch({ type: 'UPDATE', data: temp.data })
        }
        getData()
    }, [])
    const getResult = (value) => {
        setKeySearch(value)
        if (keySearch == "")
            setResult(allPost)
        else {
            const data = allPost.filter((pr) => {
                if (pr.NameAuthor.toLowerCase().indexOf(keySearch.toLowerCase()) != -1 || pr.title.toLowerCase().indexOf(keySearch.toLowerCase()) != -1)
                    return true
                else
                    return false
            })
            setResult(data)
        }
    }
    //""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
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

    const currentTime = new Date()
    function renderItem(item) {
        return <View style={style.wrapCategory}>
            <Image style={style.tinyLogo} source={{
                uri: item.urlImage[0],
            }} />
            <View style={style.wrapInfoProduct}>
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
        </View>
    }
    return <View>
        <SearchBar
            placeholder="Type Here..."
            onChangeText={(value) => getResult(value)}
            value={keySearch}
            lightTheme="true"
            color='black'
        />
        <FlatList
            data={resultSearch}
            renderItem={({ item }) => renderItem(item)}
        />
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