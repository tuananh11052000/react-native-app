import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
  Button,
  CheckBox,
} from "react-native";
import { connect } from 'react-redux'
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import ButtonCofirm from './buttonConfirm.components';
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
          <TouchableOpacity
            key={key}
            style={styles.subCategoryText}
            onPress={() => showSelectedCategory(subitem.id)}
          >
            <Text style={{ fontSize: 18 }}>{subitem.name}</Text>
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
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
function CategoryCheckBoxComponent(props) {
  const CONTENT = [
    {
      expanded: false,
      category: "Nhu yếu phẩm (thực phẩm, y tế)",
      subCategory: [
        {
          id: 1,
          name: "Thực phẩm tươi sống ( thịt, rau, củ quả,…)",
          checked: false,
        },
        {
          id: 2,
          name: "Thực phẩm đóng gói ( bánh, mắm, dầu ăn, mỳ,…)",
          checked: false,
        },
        { id: 3, name: "Lương thực ( gạo, ngô, khoai sắn,…)", checked: false },
        {
          id: 4,
          name: "Đồ cá nhân ( bột giặt, dầu gội, kem đánh răng,…)",
          checked: false,
        },
        {
          id: 5,
          name: "Yếu phẩm y tế (khẩu trang, nước diệt khuẩn,…)",
          checked: false,
        },
        { id: 6, name: "Đồ tổng hợp", checked: false },
      ],
    },
    {
      expanded: false,
      category: "Đồ may mặc",
      subCategory: [
        { id: 7, name: "Đệm, chăn, màn,…", checked: false },
        { id: 8, name: "Đồ bé sơ sinh nam", checked: false },
        { id: 9, name: "Đồ bé sơ sinh nữ", checked: false },
        { id: 10, name: "Đồ trẻ em nam", checked: false },
        { id: 11, name: "Đồ trẻ em nữ", checked: false },
        { id: 12, name: "Đồ nữ giới", checked: false },
        { id: 13, name: "Đồ nam giới", checked: false },
        { id: 14, name: "Đồ mẹ bầu", checked: false },
        { id: 15, name: "Đồ cho người cao tuổi nam", checked: false },
        { id: 16, name: "Đồ cho người cao tuổi nữ", checked: false },
        { id: 17, name: "Đồ tổng hợp", checked: false },
      ],
    },
    {
      expanded: false,
      category: "Đồ học tập vui chơi",
      subCategory: [
        { id: 18, name: "Dụng cụ hỗ trợ học tập", checked: false },
        { id: 19, name: "Đồ chơi trẻ em", checked: false },
        { id: 20, name: "Đồ trẻ mẫu giáo", checked: false },
        { id: 21, name: "Sách vở lớp 1", checked: false },
        { id: 22, name: "Sách vở lớp 2", checked: false },
        { id: 23, name: "Sách vở lớp 3", checked: false },
        { id: 24, name: "Sách vở lớp 4", checked: false },
        { id: 25, name: "Sách vở lớp 5", checked: false },
        { id: 26, name: "Sách vở lớp 6", checked: false },
        { id: 27, name: "Sách vở lớp 7", checked: false },
        { id: 28, name: "Sách vở lớp 8", checked: false },
        { id: 29, name: "Sách vở lớp 9", checked: false },
        { id: 30, name: "Sách vở lớp 10", checked: false },
        { id: 31, name: "Sách vở lớp 11", checked: false },
        { id: 32, name: "Sách vở lớp 12", checked: false },
        { id: 33, name: "Sách vở giáo trình ôn thi ĐH, CĐ", checked: false },
        { id: 34, name: "Giáo trình các trường cao đẳng", checked: false },
        { id: 35, name: "Giáo trình các trường đại học", checked: false },
        { id: 36, name: "Truyện, báo, sách kỹ năng…", checked: false },
        { id: 37, name: "Đồ tổng hợp", checked: false },
      ],
    },
    {
      expanded: false,
      category: "Nội trợ điện dân dụng",
      subCategory: [
        { id: 38, name: "Bát đĩa, nồi, chậu thau, đũa thìa,…", checked: false },
        { id: 39, name: "Bếp, nồi điện,ấm điện, lò vi sóng,…", checked: false },
        { id: 40, name: "Máy lạnh, tủ lạnh, máy giặt, quạt,…", checked: false },
        { id: 41, name: "Đồ tổng hợp", checked: false },
      ],
    },
    {
      expanded: false,
      category: "Điện tử",
      subCategory: [
        { id: 42, name: "Tivi, loa, đài,…", checked: false },
        { id: 43, name: "Điện thoại, laptop, máy tính,…", checked: false },
        { id: 44, name: "Đồ tổng hợp", checked: false },
      ],
    },
    {
      expanded: false,
      category: "Nội ngoại thất, vật tư xây dựng",
      subCategory: [
        {
          id: 45,
          name: "Nội thất ( bàn ghế, giường, tủ, kệ,…)",
          checked: false,
        },
        { id: 46, name: "Ngoại thất ( cây cảnh, ghế đá,…)", checked: false },
        {
          id: 47,
          name: "Vật tư xây dựng ( gạch, đá, xi măng, sắt,…)",
          checked: false,
        },
        { id: 48, name: "Đồ tổng hợp", checked: false },
      ],
    },
    {
      expanded: false,
      category: "Phương tiện di chuyển",
      subCategory: [
        { id: 49, name: "Xe đẩy, xe lăn ( người khuyết tật )", checked: false },
        { id: 50, name: "Xe đạp, xe đạp điện, xe máy", checked: false },
        { id: 51, name: "Xe khác", checked: false },
      ],
    },
  ];
  const [accordionData, setAccordionData] = useState(CONTENT);
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
      placeindex === index ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded']) : (array[placeindex]['isExpanded'] = false),
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
    dispatch({ type: "SET_DATA", data: accordionData});
    // Array lưu những ô đã check để filter khi chuyển qua màn hình tặng cộng động 
    let dataFilterPost = []
    for (let i=0;i<accordionData.length;i++) {
        let item = accordionData[i];
        let itemPost = []
        for (let j=0;j<item.subCategory.length;j++) {
            if (item.subCategory[j].checked == true) {
                let itemSub = {
                    category: item.category,
                    name: item.subCategory[j].name,
                }
                dataFilterPost.push(itemSub);
            }
        }
        // if (itemPost.length != 0) {
        //     let child = {
        //         category: item.category,
        //         subCategory: itemPost,
        //     }
        //     dataFilterPost.push(child);
        // }
    }
    // lưu những ô đã check vào state
    dispatch({ type: "GET_NAMEPRODUCT", NameProduct: dataFilterPost});
    console.log(dataFilterPost)
// function chuyển trang
    props.onPress();

    
  }
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
      <ButtonCofirm onPress={() => filterButton()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#FFF",
  },
  iconStyle: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
    tintColor: "#000",
  },
  subCategoryText: {
    fontSize: 18,
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
    fontSize: 21,
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
});
export default connect(function (state) {
    return {
        dataCategory: state.dataCategory
    };
  })(CategoryCheckBoxComponent);
  