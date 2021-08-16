import React, { Component, useState, useEffect } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import chevrondown from '../assets/down-chevron.png';
import { Entypo } from '@expo/vector-icons';

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
    dispatch({ type: "GET_NAME", NameProduct: [{ category: category, NameProduct: item.name }] });
    
    props.onPress()
  }
  return (
    <View style={styles.panelContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={props.onClickFunction} style={styles.categoryView}>
        <Text style={styles.categoryText}>{props.item.category}</Text>
        {/* <Image source={chevrondown} style={styles.iconStyle} /> */}
        <View style={styles.iconStyle}>
          <Entypo name="chevron-down" size={24} color="#757575" />
        </View>
      </TouchableOpacity>
      <View style={{ height: layoutHeight, overflow: 'hidden' }}>
        {
          props.item.subCategory.map((item, key) => (
            <TouchableOpacity key={key} style={styles.subCategoryText} onPress={() => showSelectedCategory(item, props.item.category)}>
              <Text style={{fontSize: 18}}> {item.name} </Text>
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
      category: "Thực phẩm và đồ y tế",
      subCategory: [
        { id: 1, name: 'Thịt, cá, trứng, sữa,…' },
        { id: 2, name: 'Rau, củ, quả,…' },
        { id: 3, name: 'Gạo, mỳ tôm, bánh kẹo,…' },
        { id: 4, name: 'Đồ cá nhân (dầu gội, bột giặt,…' },
        { id: 5, name: 'Khẩu trang, nước diệt khuẩn,…' },
        { id: 6, name: 'Đồ khác' }]
    },
    {
      expanded: false,
      category: "Đồ may mặc",
      subCategory: [
        { id: 7, name: 'Đệm, chăn, màn,…' },
        { id: 8, name: 'Đồ bé sơ sinh nam' },
        { id: 9, name: 'Đồ bé sơ sinh nữ' },
        { id: 10, name: 'Đồ trẻ em nam' },
        { id: 11, name: 'Đồ trẻ em nữ' },
        { id: 12, name: 'Đồ nữ giới' },
        { id: 13, name: 'Đồ nam giới' },
        { id: 14, name: 'Đồ mẹ bầu' },
        { id: 15, name: 'Đồ cho người cao tuổi nam' },
        { id: 16, name: 'Đồ cho người cao tuổi nữ' },
        { id: 17, name: 'Đồ tổng hợp' }]
    },
    {
      expanded: false,
      category: "Đồ học tập vui chơi",
      subCategory: [
        { id: 18, name: 'Dụng cụ hỗ trợ học tập' },
        { id: 19, name: 'Đồ chơi trẻ em' },
        { id: 20, name: 'Đồ trẻ mẫu giáo' },
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
        { id: 33, name: 'Sách vở giáo trình ôn thi ĐH, CĐ' },
        { id: 34, name: 'Giáo trình các trường cao đẳng' },
        { id: 35, name: 'Giáo trình các trường đại học' },
        { id: 36, name: 'Truyện, báo, sách kỹ năng…' },
        { id: 37, name: 'Đồ tổng hợp' },]
    },
    {
      expanded: false,
      category: "Nội trợ điện dân dụng",
      subCategory: [
        { id: 38, name: 'Bát đĩa, nồi, chậu thau, đũa thìa,…' },
        { id: 39, name: 'Bếp, nồi điện,ấm điện, lò vi sóng,…' },
        { id: 40, name: 'Máy lạnh, tủ lạnh, máy giặt, quạt,…' },
        { id: 41, name: 'Đồ tổng hợp' },
      ]
    },
    {
      expanded: false,
      category: "Điện tử",
      subCategory: [
        { id: 42, name: 'Tivi, loa, đài,…' },
        { id: 43, name: 'Điện thoại, laptop, máy tính,…' },
        { id: 44, name: 'Đồ tổng hợp' },
      ]
    },
    {
      expanded: false,
      category: "Nội ngoại thất, vật tư xây dựng",
      subCategory: [
        { id: 45, name: 'Bàn ghế, giường, tủ, kệ,…' },
        { id: 46, name: 'Cây cảnh, ghế đá,…' },
        { id: 47, name: 'Vật tư ( gạch, đá, xi măng,…)' },
        { id: 48, name: 'Đồ tổng hợp' },
      ]
    },
    {
      expanded: false,
      category: "Phương tiện di chuyển",
      subCategory: [
        { id: 49, name: 'Xe đẩy, xe lăn ( người khuyết tật )' },
        { id: 50, name: 'Xe đạp, xe đạp điện, xe máy' },
        { id: 51, name: 'Xe khác' }]
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
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#FFF',
  },
  iconStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    tintColor: '#000'
  },
  subCategoryText: {
    fontSize: 18,
    color: '#000',
    paddingTop: '3%',
    paddingBottom: '3%',
    paddingLeft: '5%',
  },
  categoryText: {
    textAlign: 'left',
    color: '#000000',
    fontSize: 21,
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