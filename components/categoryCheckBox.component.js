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
import { connect } from "react-redux";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import ButtonCofirm from "./buttonConfirm.components";
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
      category: "Thực phẩm và đồ y tế",
      subCategory: [
        { id: 1, name: "Thịt, cá, trứng, sữa,…" },
        { id: 2, name: "Rau, củ, quả,…" },
        { id: 3, name: "Gạo, mỳ tôm, bánh kẹo,…" },
        { id: 4, name: "Đồ cá nhân (dầu gội, bột giặt,…" },
        { id: 5, name: "Khẩu trang, nước diệt khuẩn,…" },
        { id: 6, name: "Đồ khác" },
      ],
    },
    {
      expanded: false,
      category: "Đồ may mặc",
      subCategory: [
        { id: 7, name: "Đệm, chăn, màn,…" },
        { id: 8, name: "Đồ bé sơ sinh nam" },
        { id: 9, name: "Đồ bé sơ sinh nữ" },
        { id: 10, name: "Đồ trẻ em nam" },
        { id: 11, name: "Đồ trẻ em nữ" },
        { id: 12, name: "Đồ nữ giới" },
        { id: 13, name: "Đồ nam giới" },
        { id: 14, name: "Đồ mẹ bầu" },
        { id: 15, name: "Đồ cho người cao tuổi nam" },
        { id: 16, name: "Đồ cho người cao tuổi nữ" },
        { id: 17, name: "Đồ tổng hợp" },
      ],
    },
    {
      expanded: false,
      category: "Đồ học tập vui chơi",
      subCategory: [
        { id: 18, name: "Dụng cụ hỗ trợ học tập" },
        { id: 19, name: "Đồ chơi trẻ em" },
        { id: 20, name: "Đồ trẻ mẫu giáo" },
        { id: 21, name: "Sách vở lớp 1" },
        { id: 22, name: "Sách vở lớp 2" },
        { id: 23, name: "Sách vở lớp 3" },
        { id: 24, name: "Sách vở lớp 4" },
        { id: 25, name: "Sách vở lớp 5" },
        { id: 26, name: "Sách vở lớp 6" },
        { id: 27, name: "Sách vở lớp 7" },
        { id: 28, name: "Sách vở lớp 8" },
        { id: 29, name: "Sách vở lớp 9" },
        { id: 30, name: "Sách vở lớp 10" },
        { id: 31, name: "Sách vở lớp 11" },
        { id: 32, name: "Sách vở lớp 12" },
        { id: 33, name: "Sách vở giáo trình ôn thi ĐH, CĐ" },
        { id: 34, name: "Giáo trình các trường cao đẳng" },
        { id: 35, name: "Giáo trình các trường đại học" },
        { id: 36, name: "Truyện, báo, sách kỹ năng…" },
        { id: 37, name: "Đồ tổng hợp" },
      ],
    },
    {
      expanded: false,
      category: "Nội trợ điện dân dụng",
      subCategory: [
        { id: 38, name: "Bát đĩa, nồi, chậu thau, đũa thìa,…" },
        { id: 39, name: "Bếp, nồi điện,ấm điện, lò vi sóng,…" },
        { id: 40, name: "Máy lạnh, tủ lạnh, máy giặt, quạt,…" },
        { id: 41, name: "Đồ tổng hợp" },
      ],
    },
    {
      expanded: false,
      category: "Điện tử",
      subCategory: [
        { id: 42, name: "Tivi, loa, đài,…" },
        { id: 43, name: "Điện thoại, laptop, máy tính,…" },
        { id: 44, name: "Đồ tổng hợp" },
      ],
    },
    {
      expanded: false,
      category: "Nội ngoại thất, vật tư xây dựng",
      subCategory: [
        { id: 45, name: "Bàn ghế, giường, tủ, kệ,…" },
        { id: 46, name: "Cây cảnh, ghế đá,…" },
        { id: 47, name: "Vật tư ( gạch, đá, xi măng,…)" },
        { id: 48, name: "Đồ tổng hợp" },
      ],
    },
    {
      expanded: false,
      category: "Phương tiện di chuyển",
      subCategory: [
        { id: 49, name: "Xe đẩy, xe lăn ( người khuyết tật )" },
        { id: 50, name: "Xe đạp, xe đạp điện, xe máy" },
        { id: 51, name: "Xe khác" },
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
      <ButtonCofirm onPress={() => filterButton()} />
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
    dataCategory: state.dataCategory,
    infoPost: state.infoPost,
  };
})(CategoryCheckBoxComponent);
