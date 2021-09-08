import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import ProductComponent from "../components/product.component";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function historyPage(props) {
  const { navigation } = props;
  const [dataRender, setData] = useState([]);
  const [refreshing, setrefreshing] = useState(true);
  useEffect(() => {
    getDataHistory();
    return () => {};
  }, []);
  const getDataHistory = async () => {
    let result = await SecureStore.getItemAsync("token");
    await axios({
      method: "get",
      url: "https://smai-app-api.herokuapp.com/user/getHistoryPost",
      headers: {
        Authorization: result,
      },
    })
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setrefreshing(false));
  };
  const onRefresh = () => {
    setData([]);
    getDataHistory();
  };
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };
  const renderItem = ({ item }) => {
    return (
      <ProductComponent
        item={item}
        urlImage={item.urlImage[0]}
        title={item.title}
        category={item.NameProduct}
        time={item.createdAt}
        address={item.address}
        confirm={item.confirm}
        typeAuthor={item.TypeAuthor}
        cateReceives={item.NameProduct.length}
        navigation={navigation}
        isHistory="yes"
      />
    );
  };
  return (
    <View style={styles.container}>
      {refreshing ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <ActivityIndicator color="#000" size="small" />
        </View>
      ) : (
        <FlatList
          data={dataRender}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemSeparatorView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
});
