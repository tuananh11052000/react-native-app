import React, { Component, useState, useEffect } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image, Dimensions
} from 'react-native';
import { connect } from 'react-redux'
import config from '../config';
import { Entypo } from '@expo/vector-icons';
var { width } = Dimensions.get("window");
function ExpandableListView(props) {
  const [layoutHeight, setLayoutHeight] = useState(0);
  useEffect(() => {
    if (props.item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [props.item.isExpanded]);
  const showSelectedCategory = (item, category) => {
    const { dispatch } = props
    dispatch({ type: "GET_NAME", NameProduct: [{ Category: category, NameProduct: item.name }] });
    props.onPress()
  }
  return (
    <View style={styles.panelContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={props.onClickFunction} style={styles.categoryView}>
        <Text style={styles.categoryText}>{props.item.category}</Text>
        {/* <Image source={chevrondown} style={styles.iconStyle} /> */}
        <View style={styles.iconStyle}>
          {props.item.isExpanded ? (
            <Entypo name="chevron-up" size={width*0.06} color="#656464" />
          ) : (
            <Entypo name="chevron-down" size={width*0.06} color="#656464" />
          )}
        </View>
      </TouchableOpacity>
      <View style={{ height: layoutHeight, overflow: 'hidden' }}>
        {
          props.item.subCategory.map((item, key) => (
            <TouchableOpacity key={key} style={styles.subCategoryText} onPress={() => showSelectedCategory(item, props.item.category)}>
              <Text style={{fontSize: config.fontsize_5}}> {item.name} </Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
}


function CategoryComponent(props) {

  // create array to contain Expandable ListView items & create a State named as accordionData and store the array in this State
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
        { id: 12, name: 'Đồ chơi' },
        { id: 13, name: 'Xe đẩy, bàn ăn' },
        { id: 14, name: 'Tả, bỉm, sữa cho bé' },
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
        { id: 51, name: 'Nệm, Chăn, gối, màn,...' },
        { id: 40, name: 'Đồ khác' },
      ]
    },
    {
      expanded: false,
      category: "ĐỒ ĐIỆN TỬ",
      subCategory: [
        { id: 41, name: 'Tivi, loa, đài,...' },
        { id: 42, name: 'Điện thoại, laptop, máy tính,...' },
        { id: 43, name: 'Đồ khác' },
      ]
    },
    {
      expanded: false,
      category: "ĐỒ NỘI NGOẠI THẤT",
      subCategory: [
        { id: 44, name: 'Bàn ghế, giường, tủ, kệ,...' },
        { id: 45, name: 'Cây cảnh, bàn ghế đá,...' },
        { id: 46, name: 'Gạch, cát, xi măng, sắt,...' },
        { id: 47, name: 'Đồ khác' },
      ]
    },
    {
      expanded: false,
      category: "XE CỘ",
      subCategory: [
        { id: 48, name: 'Xe cho người khuyết tật' },
        { id: 49, name: 'Xe đạp, xe điện, xe máy' },
        { id: 50, name: 'Xe khác' },]
    },
  ];
  const [accordionData, setAccordionData] = useState(CONTENT);

  // enable layout animation, toggle 'expanded' state for index and then update the layout
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...accordionData];
    array.map((value, placeindex) =>
      placeindex === index ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded']) : (array[placeindex]['isExpanded'] = false),
    );
    setAccordionData(array)
  }
  const { dispatch } = props
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{  }}>
        {
          accordionData.map((item, key) =>
          (
            <ExpandableListView key={item.category} onClickFunction={() => updateLayout(key)} item={item} onPress={props.onPress} dispatch={dispatch} />
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  iconStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    tintColor: '#000'
  },
  subCategoryText: {
    fontSize: config.fontsize_5,
    color: '#000',
    paddingTop: '3%',
    paddingBottom: '3%',
    paddingLeft: '5%',
  },
  categoryText: {
    textAlign: 'left',
    color: '#000000',
    fontSize: config.fontsize_2,
    fontWeight: 'bold',
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '5%',
  },
  categoryView: {
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },

});
export default connect(function (state) {
  return { infoPost: state.infoPost }
})(CategoryComponent);