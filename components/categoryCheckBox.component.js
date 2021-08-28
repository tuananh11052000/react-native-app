import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable
} from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import ButtonCofirm from "./buttonConfirm.components";
import config from '../config';
function ExpandableListView(props) {
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
            <Entypo name="chevron-up" size={24} color="#656464" />
          ) : (
            <Entypo name="chevron-down" size={24} color="#656464" />
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
                  size={24}
                  color="#018786"
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={24}
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
      category: "NHU YẾU PHẨM",
      subCategory: [
        { id: 1, name: 'Lương thực, thực phẩm' },
        { id: 2, name: 'Dầu gội, băng vệ sinh,...' },
        { id: 3, name: 'Vật tư ý tế "khẩu trang,.."' },
        { id: 4, name: 'Mặt hàng khác' },]
    },
    {
      expanded: false,
      category: "ĐỒ NGƯỜI LỚN",
      subCategory: [
        { id: 5, name: 'Quần áo, giày dép nam' },
        { id: 6, name: 'Quần áo, giày dép nữ' },
        { id: 7, name: 'Đồ trang điểm, tư trang' },
        { id: 8, name: 'Đồ mẹ bầu' },
        { id: 9, name: 'Đồ người cao tuổi nam' },
        { id: 10, name: 'Đồ người cao tuổi nữ' },
        { id: 11, name: 'Đồ khác' },]
    },
    {
      expanded: false,
      category: "ĐỒ TRẺ EM",
      subCategory: [
        { id: 18, name: 'Dụng cụ hỗ trợ học tập' },
        { id: 19, name: 'Đồ chơi trẻ em' },
        { id: 20, name: 'Đồ trẻ mẫu giáo' },
        { id: 12, name: 'Đồ chơi' },
        { id: 13, name: 'xe đẩy bàn ăn' },
        { id: 14, name: 'Tả. bỉm, sữa cho bé' },
        { id: 15, name: 'Quần áo trẻ nam' },
        { id: 16, name: 'Quần áo trẻ nữ' },
        { id: 17, name: 'Đồ khác' },]
    },
    {
      expanded: false,
      category: "ĐỒ HỌC TẬP",
      subCategory: [
        { id: 18, name: 'Dụng cụ học tập' },
        { id: 19, name: 'Sách vở mẫu giáo' },
        { id: 21, name: 'Sách vở lớp 1' },
        { id: 22, name: 'Sách vở lớp 2' },
        { id: 23, name: 'Sách vở lớp 3' },
        { id: 24, name: 'Sách vở lớp 4' },
        { id: 25, name: 'Sách vở lớp 5' },
        { id: 26, name: 'Sách vở lớp 6' },
        { id: 27, name: 'Sách vở lớp 7' },
        { id: 28, name: 'Sách vở lớp 8' },
        { id: 29, name: 'Sách vở lớp 9' },
        { id: 30, name: 'Sách vở lớp 10' },
        { id: 31, name: 'Sách vở lớp 11' },
        { id: 32, name: 'Sách vở lớp 12' },
        { id: 33, name: 'Giáo trình ôn thi ĐH, CĐ' },
        { id: 34, name: 'Giáo trình các trường cao đẳng' },
        { id: 35, name: 'Giáo trình các trường đại học' },
        { id: 36, name: 'Truyện, báo, sách kỹ năng…' },
        { id: 37, name: 'Đồ học tập khác' },
      ]
    },
    {
      expanded: false,
      category: "ĐỒ SINH HOẠT GIA ĐÌNH",
      subCategory: [
        { id: 38, name: 'Đồ nội trợ nhà bếp' },
        { id: 39, name: 'Máy lạnh, máy giặt, quạt,...' },
        { id: 40, name: 'Đồ khác' },
      ]
    },
    {
      expanded: false,
      category: "ĐỒ NỘI NGOẠI THẤT",
      subCategory: [
        { id: 41, name: 'Bàn ghế, giường, tủ, kệ,...' },
        { id: 42, name: 'Cây cảnh, bàn ghế đá,...' },
        { id: 43, name: 'Gạch, cát, xi măng, sắt,...' },
        { id: 44, name: 'Đồ khác' },
      ]
    },
    {
      expanded: false,
      category: "XE CỘ",
      subCategory: [
        { id: 45, name: 'Xe cho người khuyết tật' },
        { id: 46, name: 'Xe đạp, xe điện, xe máy' },
        { id: 47, name: 'Xe khác' },]
    },



  ];
  const [CONTENT_SAVED, setcontensaved] = useState([]);
  const [accordionData, setAccordionData] = useState([]);
  const dataCate = props.dataCategory.data
  
 
  useEffect(() => {
    if (dataCate.length != 0) {
      setAccordionData(dataCate);
    } else {
      setAccordionData(CONTENT)
    }
  }, []);
  //   if (Platform.OS === "android") {
  //     UIManager.setLayoutAnimationEnabledExperimental(true);
  //   }
  // cập nhật layout khi nhấn vào parent item
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...accordionData];
    // mở nhiều cái
    // array[index]["isExpanded"] = !array[index]["isExpanded"];

    // đóng tất cả khi một cái mở
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
        : (array[placeindex]["isExpanded"] = false)
    );
    setAccordionData(array);
  };
  //   cập nhật layout khi nhấn vào child item
  const updateLayoutItem = (index) => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const array = [...accordionData];
    setAccordionData(array);
  };
  const { dispatch } = props;
  //   function khi nhấn vào button tiếp theo
  const filterButton = () => {
    //  lưu những ô đã checked
    dispatch({ type: "SET_DATA", data: accordionData });
    // Array lưu những ô đã check để filter khi chuyển qua màn hình tặng cộng động
    let dataFilterPost = [];
    for (let i = 0; i < accordionData.length; i++) {
      let item = accordionData[i];
      let itemPost = [];
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
    // lưu những ô đã check vào state
    if (props.type == "canxindo") {
      dispatch({ type: "GET_NAME", NameProduct: dataFilterPost });
    } else {
      dispatch({ type: "GET_NAMEPRODUCT", NameProduct: dataFilterPost });
      dispatch({ type: "SET_DATA", data: accordionData });
    }

    // console.log(dataFilterPost);
    // function chuyển trang
    props.onPress();
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {accordionData.map((item, key) => (
          <ExpandableListView
            key={item.category}
            onClickFunction={() => updateLayout(key)}
            onClickFunctionItem={() => updateLayoutItem(key)}
            item={item}
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
    backgroundColor: '#E70910',
    borderRadius: 5,
    padding: 5,
},
buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
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
