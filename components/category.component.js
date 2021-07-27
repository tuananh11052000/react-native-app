import React, { Component, useState, useEffect } from 'react';
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
  Button
} from 'react-native';
import chevrondown from '../assets/down-chevron.png';


function ExpandableListView(props) {
  const [layoutHeight, setLayoutHeight] = useState(0)

  useEffect(() => {
    if (props.item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [props.item.isExpanded]);
  console.log(props.item.subCategory)
  const showSelectedCategory = (item) => {
    Alert.alert(item);
  }
  return (
    <View style={styles.panelContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={props.onClickFunction} style={styles.categoryView}>
        <Text style={styles.categoryText}>{props.item.category} </Text>
        <Image
          source={chevrondown}
          style={styles.iconStyle} />
      </TouchableOpacity>
      <View style={{ height: layoutHeight, overflow: 'hidden' }}>
        {
          props.item.subCategory.map((item, key) => (
            <TouchableOpacity key={key} style={styles.subCategoryText} onPress={() => showSelectedCategory(item.namne)}>
              <Text> {item.name} </Text>
              {/* <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} /> */}
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
}


export default function CategoryComponent(props) {

  // create array to contain Expandable ListView items & create a State named as accordionData and store the array in this State
  const CONTENT = [
    {
      expanded: false,
      category: "Nhu yếu phẩm (thực phẩm, y tế)",
      subCategory: [
        { id: 1, name: 'Thực phẩm tươi sống ( thịt, rau, củ quả,..)' },
        { id: 2, name: 'Thực phẩm đóng gói ( bánh, mắm, dầu ăn, mỳ ..' },
        { id: 3, name: 'Lương thực ( gạo, ngô, khoai sắn,…' },
        { id: 4, name: 'Đồ cá nhân ( bột giặt, dầu gội, kem đánh răng…' },
        { id: 5, name: 'Yếu phẩm y tế (khẩu trang, nước diệt khuẩn,…' },
        { id: 6, name: 'Đồ tổng hợp' }]
    },
    {
      expanded: false,
      category: "Đồ may mặc",
      subCategory: [
        { id: 7, name: 'Đệm, chăn, màn,...' },
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
        { id: 42, name: 'Tivi, loa, đài,...' },
        { id: 43, name: 'Điện thoại, laptop, máy tính,...' },
        { id: 44, name: 'Đồ tổng hợp' },
      ]
    },
    {
      expanded: false,
      category: "Nội ngoại thất, vật tư xây dựng",
      subCategory: [
        { id: 45, name: 'Nội thất ( bàn ghế, giường, tủ, kệ,…)' },
        { id: 46, name: 'Ngoại thất ( cây cảnh, ghế đá,…)' },
        { id: 47, name: 'Vật tư xây dựng ( gạch, đá, xi măng, sắt,..)' },
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
  const [accordionData, setAccordionData] = useState(CONTENT)
 
  // enable layout animation, toggle 'expanded' state for index and then update the layout
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...accordionData];
    array.map((value, placeindex) =>
      placeindex === index ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded']) : (array[placeindex]['isExpanded'] = false),
    );
    setAccordionData(array)
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        {
          accordionData.map((item, key) =>
          (
            <ExpandableListView key={item.category} onClickFunction={() => updateLayout(key)} item={item} onPress={props.onPress} />
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
    backgroundColor: '#F5F5F5',
  },
  iconStyle: {
    width: 15,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    tintColor: '#000'
  },
  subCategoryText: {
    fontSize: 18,
    color: '#000',
    padding: 10
  },
  categoryText: {
    textAlign: 'left',
    color: '#000000',
    fontSize: 21,
    fontWeight: 'bold',
    padding: 10
  },
  categoryView: {
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DDDDDD'
  },
  Btn: {
    padding: 10,
    backgroundColor: '#F5F5F5'
  }
});