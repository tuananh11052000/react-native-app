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
  Button,
  CheckBox
} from 'react-native';
import chevrondown from './assets/down-chevron.png';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { MaterialIcons } from '@expo/vector-icons';



function ExpandableListView({ item, onClickFunction}) {
  const [layoutHeight, setLayoutHeight] = useState(0)
  const [dataa, setDataa] = useState(item)
  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  const showSelectedCategory = (id) => {
    const data = item;
    for(let i=0; i<data.subCategory.length;i++) {
      if (data.subCategory[i].id == id) {
          data.subCategory[i].checked = !data.subCategory[i].checked;
          console.log(data.subCategory[i]);          
      }
    }
    setDataa(data)
      
  }

  
  return (
    <View style={styles.panelContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={onClickFunction} style={styles.categoryView}>
        <Text style={styles.categoryText}>{dataa.category} </Text>
        <Image
          source={chevrondown} 
          style={styles.iconStyle} />
      </TouchableOpacity>
      
      <View style={{ height: layoutHeight, overflow: 'hidden' }}>
        {
          dataa.subCategory.map((subitem, key) => (
            <TouchableOpacity key={key} style={styles.subCategoryText} onPress={() => showSelectedCategory(subitem.id)}>
              <Text>{subitem.name}</Text>
              <CheckBox value={subitem.checked} onValueChange={() => {showSelectedCategory(subitem.id)}}/>
            </TouchableOpacity>
          
          ))
        }
      </View>
    </View>
  );
}


export default function CategoryComponent() {

  // create array to contain Expandable ListView items & create a State named as AccordionData and store the array in this State
  const CONTENT = [
    {
      expanded: false,
      category: "Nhu yếu phẩm (thực phẩm, y tế)",
      subCategory: [
        { 
          id: 1, 
          name: 'Thực phẩm tươi sống ( thịt, rau, củ quả,..)', 
          checked: false 
        },
        { 
          id: 2, 
          name: 'Thực phẩm đóng gói ( bánh, mắm, dầu ăn, mỳ ..', 
          checked: false },
        { 
          id: 3, 
          name: 'Lương thực ( gạo, ngô, khoai sắn,…', 
          checked: false },
        ]
    },
    {
      expanded: false,
      category: "Đồ may mặc",
      subCategory: [
        { id: 7, name: 'Đệm, chăn, màn,...', checked: false },
        { id: 8, name: 'Đồ bé sơ sinh nam', checked: false },
        { id: 9, name: 'Đồ bé sơ sinh nữ', checked: false },
       ]
    },
    



  ];
  const [accordionData, setAccordionData] = useState(CONTENT)
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  // enable layout animation, toggle 'expanded' state for index and then update the layout
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...accordionData];
    array[index]['expanded'] = !array[index]['expanded'];

    // If single select is enabled
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
            <ExpandableListView key={item.category} onClickFunction={() => updateLayout(key)} item={item} />
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
    paddingTop: (Platform.OS === 'ios') ? 20 : 20,
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
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  }, 
  checkbox: {
    flexDirection: 'row',
    
  }
});