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
import ListCategory from '../category';
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
  
  const [accordionData, setAccordionData] = useState(ListCategory);

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