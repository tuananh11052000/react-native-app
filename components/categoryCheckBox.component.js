import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable, Dimensions
} from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import ButtonCofirm from "./buttonConfirm.components";
import config from '../config';
var { width } = Dimensions.get("window");
function ExpandableListView(props) {
  const {dispatch} = props;
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [dataa, setDataa] = useState(props.item);
  useEffect(() => {
    if (props.item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [props.item.isExpanded]);

  const showSelectedCategory = (id) => {
    const data = props.item;
    for (let i = 0; i < data.subCategory.length; i++) {
      if (data.subCategory[i].id == id) {
        data.subCategory[i].checked = !data.subCategory[i].checked;
      }
    }
    setDataa(data);
    props.onClickFunctionItem();
  };
  useEffect(() => {
    if (props.dataChecked == true) {
      unChecked();
      dispatch({ type: "DEFAULT_FILTER" });   
    }
  }, [props.dataChecked])

  const unChecked = () => {
    const data = props.item;
    for (let i = 0; i < data.subCategory.length; i++) {
      if (data.subCategory[i].checked == true) {
        data.subCategory[i].checked = false;
      }
    }
    setDataa(data);
  };

  return (
    <View style={styles.panelContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onClickFunction}
        style={styles.categoryView}
      >
        <Text style={styles.categoryText}>{dataa.category} </Text>
        {/* <Image source={chevrondown} style={styles.iconStyle} /> */}
        <View style={styles.iconStyle}>
          {dataa.isExpanded ? (
            <Entypo name="chevron-up" size={width*0.06} color="#656464" />
          ) : (
            <Entypo name="chevron-down" size={width*0.06} color="#656464" />
          )}
        </View>
      </TouchableOpacity>

      <View style={{ height: layoutHeight, overflow: "hidden" }}>
        {dataa.subCategory.map((subitem, key) => (
          <Pressable
            key={key}
            style={styles.subCategoryText}
            onPress={() => showSelectedCategory(subitem.id)}
          >
            <Text style={{ fontSize: config.fontsize_5 }}>{subitem.name}</Text>
            <View style={styles.iconStyle}>
              {subitem.checked ? (
                <MaterialCommunityIcons
                  name="checkbox-marked"
                  size={width*0.06}
                  color="#018786"
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={width*0.06}
                  color="#A0A0A0"
                />
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
function CategoryCheckBoxComponent(props) {
  const CONTENT = [
    {
      expanded: false,
      category: "NHU Y???U PH???M",
      subCategory: [
        { id: 1, name: 'L????ng th???c, th???c ph???m', checked: false },
        { id: 2, name: 'V???t d???ng c?? nh??n "d???u g???i,..."', checked: false },
        { id: 3, name: 'V???t t?? ?? t??? "kh???u trang,.."', checked: false },
        { id: 4, name: 'M???t h??ng kh??c' , checked: false},]
    },
    {
      expanded: false,
      category: "????? NG?????I L???N",
      subCategory: [
        { id: 5, name: 'Qu???n ??o, gi??y d??p nam' , checked: false},
        { id: 6, name: 'Qu???n ??o, gi??y d??p n???' , checked: false},
        { id: 7, name: '????? trang ??i???m, t?? trang' , checked: false},
        { id: 8, name: '????? m??? b???u', checked: false },
        { id: 9, name: '????? ng?????i cao tu???i nam' , checked: false},
        { id: 10, name: '????? ng?????i cao tu???i n???', checked: false },
        { id: 11, name: '????? kh??c' , checked: false},]
    },
    {
      expanded: false,
      category: "????? TR??? EM",
      subCategory: [
        { id: 12, name: '????? ch??i' , checked: false},
        { id: 13, name: 'Xe ?????y, b??n ??n', checked: false },
        { id: 14, name: 'T???, b???m, s???a cho b??' , checked: false},
        { id: 15, name: 'Qu???n ??o b?? trai' , checked: false},
        { id: 16, name: 'Qu???n ??o b?? g??i', checked: false },
        { id: 17, name: '????? kh??c', checked: false },]
    },
    {
      expanded: false,
      category: "????? H???C T???P",
      subCategory: [
        { id: 18, name: 'D???ng c??? h???c t???p', checked: false },
        { id: 19, name: 'S??ch v??? m???u gi??o' , checked: false},
        { id: 21, name: 'S??ch v??? l???p 1', checked: false },
        { id: 22, name: 'S??ch v??? l???p 2', checked: false },
        { id: 23, name: 'S??ch v??? l???p 3', checked: false },
        { id: 24, name: 'S??ch v??? l???p 4' , checked: false},
        { id: 25, name: 'S??ch v??? l???p 5', checked: false },
        { id: 26, name: 'S??ch v??? l???p 6', checked: false },
        { id: 27, name: 'S??ch v??? l???p 7', checked: false },
        { id: 28, name: 'S??ch v??? l???p 8', checked: false },
        { id: 29, name: 'S??ch v??? l???p 9', checked: false },
        { id: 30, name: 'S??ch v??? l???p 10', checked: false },
        { id: 31, name: 'S??ch v??? l???p 11', checked: false },
        { id: 32, name: 'S??ch v??? l???p 12', checked: false },
        { id: 33, name: 'Gi??o tr??nh ??n thi ??H, C??', checked: false },
        { id: 34, name: 'Gi??o tr??nh c??c tr?????ng cao ?????ng', checked: false },
        { id: 35, name: 'Gi??o tr??nh c??c tr?????ng ?????i h???c', checked: false },
        { id: 36, name: 'Truy???n, b??o, s??ch k??? n??ng???', checked: false },
        { id: 37, name: '????? h???c t???p kh??c' , checked: false},
      ]
    },
    {
      expanded: false,
      category: "????? SINH HO???T GIA ????NH",
      subCategory: [
        { id: 38, name: '????? n???i tr??? nh?? b???p', checked: false },
        { id: 39, name: 'M??y l???nh, m??y gi???t, qu???t,...', checked: false },
        { id: 51, name: 'N???m, Ch??n, g???i, m??n,...', checked: false },
        { id: 40, name: '????? kh??c' , checked: false},
      ]
    },
    {
      expanded: false,
      category: "????? ??I???N T???",
      subCategory: [
        { id: 41, name: 'Tivi, loa, ????i,...' , checked: false},
        { id: 42, name: '??i???n tho???i, laptop, m??y t??nh,...', checked: false },
        { id: 43, name: '????? kh??c' , checked: false},
      ]
    },
    {
      expanded: false,
      category: "????? N???I NGO???I TH???T",
      subCategory: [
        { id: 44, name: 'B??n gh???, gi?????ng, t???, k???,...', checked: false },
        { id: 45, name: 'C??y c???nh, b??n gh??? ????,...', checked: false },
        { id: 46, name: 'G???ch, c??t, xi m??ng, s???t,...', checked: false },
        { id: 47, name: '????? kh??c' , checked: false},
      ]
    },
    {
      expanded: false,
      category: "XE C???",
      subCategory: [
        { id: 48, name: 'Xe cho ng?????i khuy???t t???t' , checked: false},
        { id: 49, name: 'Xe ?????p, xe ??i???n, xe m??y' , checked: false},
        { id: 50, name: 'Xe kh??c', checked: false },]
    },
    {
      expanded: false,
      category: 'PH??? LI???U "VE CHAI"',
      subCategory: [
        { id: 51, name: 'Nh???a, gi???y, kim lo???i, "s???t, ch??,..."', checked: false },
        { id: 52, name: 'M??y l???nh, t??? l???nh, m??y gi???t' , checked: false},
        { id: 53, name: 'M??y khoan, m??i, m??y b??m,...' , checked: false},
        { id: 54, name: 'B???p ??i???n, l?? vi s??ng, loa, ???m ??i???n,...', checked: false },
        { id: 55, name: '??i???n tho???i, tivi, loa, m??y t??nh,...', checked: false },
        { id: 56, name: 'Xe m??y, ?????ng c?? x??ng d???u...' , checked: false},
        { id: 57, name: 'Th???y tinh "c???a k??nh, chai l???...' , checked: false},
        { id: 58, name: 'X??m, l???p xe, d???u nh???t th???i...' , checked: false},
        { id: 59, name: 'Ve chai kh??c', checked: false },]
    },
  ];
  const [accordionData, setAccordionData] = useState([]);
  const dataCate = props.dataCategory.data

  // c???p nh???t layout khi nh???n v??o parent item
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...accordionData];
    // m??? nhi???u c??i
    array[index]["isExpanded"] = !array[index]["isExpanded"];

    // ????ng t???t c??? khi m???t c??i m???
    // array.map((value, placeindex) =>
    //   placeindex === index
    //     ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
    //     : (array[placeindex]["isExpanded"] = false)
    // );
    setAccordionData(array);
  };
  //   c???p nh???t layout khi nh???n v??o child item
  const updateLayoutItem = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const array = [...accordionData];
    setAccordionData(array);
  };
  useEffect(() => {
    if (dataCate.length != 0) {
      setAccordionData(dataCate);
    } else {
      setAccordionData([...CONTENT]);
    }
  }, []);
  const { dispatch } = props;
  //   function khi nh???n v??o button ti???p theo
  const filterButton = () => {
    //  l??u nh???ng ?? ???? checked
    // Array l??u nh???ng ?? ???? check ????? filter khi chuy???n qua m??n h??nh t???ng c???ng ?????ng
    let dataFilterPost = [];
    for (let i = 0; i < accordionData.length; i++) {
      let item = accordionData[i];
      for (let j = 0; j < item.subCategory.length; j++) {
        if (item.subCategory[j].checked == true) {
          let itemSub = {
            Category: item.category,
            NameProduct: item.subCategory[j].name,
          };
          dataFilterPost.push(itemSub);
        }
      }
    }
    // l??u nh???ng ?? ???? check v??o state
    if (props.type == "canxindo" ) {
      dispatch({ type: "GET_NAME", NameProduct: dataFilterPost });
      if (dataFilterPost.length == 0) {
        Alert.alert("Th??ng b??o", "Vui l??ng ch???n ??t nh???t 1 m???c", [{ text: "OK" }]);
      } else {
        props.onPress();
      }
    } else {
      dispatch({ type: "GET_NAMEPRODUCT", NameProduct: dataFilterPost });
      dispatch({ type: "SET_DATA", data: accordionData });
      props.onPress();
    }
    // function chuy???n trang
    
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {accordionData.map((item, key) => (
          <ExpandableListView
            key={item.category}
            onClickFunction={() => updateLayout(key)}
            onClickFunctionItem={() => updateLayoutItem()}
            item={item}
            dataChecked={props.dataCategory.disableFilter}
            dispatch={dispatch}
          />
        ))}
      </ScrollView>
      <View style={styles.wrapButton}>
        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={() => filterButton()}>
            <Text style={styles.buttonText}>{props.textButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  iconStyle: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
    tintColor: "#000",
  },
  subCategoryText: {
    fontSize: config.fontsize_5,
    color: "#000",
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryText: {
    textAlign: "left",
    color: "#000000",
    fontSize: config.fontsize_2,
    fontWeight: "bold",
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "5%",
  },
  categoryView: {
    marginBottom: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  button: {
    backgroundColor: config.color_btn_1,
    borderRadius: 5,
    padding: 5,
},
buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_600SemiBold",
},
wrapButton: {
  padding: '3%',
  backgroundColor: '#DDD'
}
});
export default connect(function (state) {
  return {
    dataCategory: state.dataCategory,
    infoPost: state.infoPost,
  };
})(CategoryCheckBoxComponent);