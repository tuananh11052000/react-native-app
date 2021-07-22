/*
import React, { Component, useState } from 'react';
import { ExpandableListView } from 'react-native-expandable-listview';

const CONTENT = [
  {
    id: '42',
    categoryName: 'Quần áo',
    subCategory: [
      {
        id: '1',
        name:
          "Quần áo nam",
      },
      { id: '2', name: 'Quần áo nữ' },
    ],
  },
  {
    id: '95',
    categoryName: 'Item 2',
    subCategory: [{ id: '1', name: 'Sub Item 1' }],
  },
  {
    id: '94',
    categoryName: 'Item 3',
    subCategory: [{ id: '1', name: 'Sub Item 1' }],
  },
  {
    id: '93',
    categoryName: 'Item 4',
    subCategory: [{ id: '1', name: 'Sub Item 1' }],
  },
  {
    id: '92',
    categoryName: 'Item 5',
    subCategory: [{ id: '1', name: 'Sub Item 1' }],
  },
  {
    id: '96',
    categoryName: 'Item 6',
    subCategory: [{ id: '1', name: 'Sub Item 1' }],
  },
];

function YourComponent() {
  const [listDataSource, setListDataSource] = useState([])
  function handleItemClick({ index }) {
    console.log(index);
  };

  function handleInnerItemClick({ innerIndex, item, itemIndex }) {
    console.log(innerIndex);
  };


  return (
    <ExpandableListView
      // ExpandableListViewStyles={{borderTopWidth:1}} // styles to expandable listview
      // renderInnerItemSeparator={false} // true or false, render separator between inner items
      // renderItemSeparator={false} // true or false, render separator between Items
      // itemContainerStyle={{}} // add your styles to all item container of your list
      // itemLabelStyle={{}} // add your styles to all item text of your list
      // customChevron={{}} // your custom image to the indicator
      // chevronColor="white" // color of the default indicator
      // innerItemContainerStyle={{}} // add your styles to all inner item containers of your list
      // itemLabelStyle={{}} // add your styles to all inner item text of your list
      // itemImageIndicatorStyle={{}} // add your styles to the image indicator of your list
      // animated={true} // sets all animations on/off, default on
      // defaultLoaderStyles?: ViewStyle; // Set your styles to default loader (only for animated={true})
      // customLoader?: JSX.Element; Pass your custom loader, while your content is measured and rendered (only for animated={true})
      data={CONTENT} // required
      onInnerItemClick={handleInnerItemClick}
      onItemClick={handleItemClick}
    />
  );

}

export default YourComponent;
*/
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import RNPickerDialog from 'rn-modal-picker';
import { TextInput } from 'react-native-paper';
import db from '../db.json';



export default class confirmAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: db.province,
      data1: db.district,
      data2: db.commune,
      placeHolderText: 'Please Select Country',
      selectedText: '',
      defaultValue: true,
      select: '',
      value: '',
    };
  }

  selectedValue(index, item) {
    this.setState({ selectedText: item.name });
  }

  render() {
    return (
      <View style={Styles.border}>
        <View style={Styles.containermain}>
          <View style={Styles.top}>
            <Text style={Styles.tittleText}>Xác nhận địa chỉ</Text>
          </View>
          <View>
            <RNPickerDialog
              data={this.state.data}
              labelText={'Tỉnh/thành phố'}
              showSearchBar={true}
              showPickerTitle={true}
              listTextStyle={Styles.listTextStyle}
              pickerStyle={Styles.pickerStyle1}
              selectedText={this.state.selectedText}
              // placeHolderText={this.state.placeHolderText}
              searchBarPlaceHolder={'Search.....'}
              searchBarPlaceHolderColor={'#9d9d9d'}
              selectedTextStyle={Styles.selectedTextStyle1}
              placeHolderTextColor={'black'}
              dropDownIconStyle={Styles.dropDownIconStyle1}
              searchBarStyle={Styles.searchBarStyle}
              //dropDownIcon={require('../assets/pin.png')}
              selectedValue={(index, item) => this.selectedValue(index, item)}
            />

            <RNPickerDialog
              data={this.state.data1}
              labelText={'Quận/huyện'}
              showSearchBar={true}
              showPickerTitle={true}
              listTextStyle={Styles.listTextStyle}
              pickerStyle={Styles.pickerStyle1}
              selectedText={this.state.selectedText}
              // placeHolderText={this.state.placeHolderText}
              searchBarPlaceHolder={'Search.....'}
              searchBarPlaceHolderColor={'#9d9d9d'}
              selectedTextStyle={Styles.selectedTextStyle1}
              placeHolderTextColor={'black'}
              dropDownIconStyle={Styles.dropDownIconStyle1}
              searchBarStyle={Styles.searchBarStyle}
              //dropDownIcon={require('../assets/pin.png')}
              selectedValue={(index, item) => this.selectedValue(index, item)}
            />
            <RNPickerDialog
              data={this.state.data2}
              labelText={'Phường/xã/thị trấn'}
              showSearchBar={true}
              showPickerTitle={true}
              listTextStyle={Styles.listTextStyle}
              pickerStyle={Styles.pickerStyle1}
              selectedText={this.state.selectedText}
              // placeHolderText={this.state.placeHolderText}
              searchBarPlaceHolder={'Search.....'}
              searchBarPlaceHolderColor={'#9d9d9d'}
              selectedTextStyle={Styles.selectedTextStyle1}
              placeHolderTextColor={'black'}
              dropDownIconStyle={Styles.dropDownIconStyle1}
              searchBarStyle={Styles.searchBarStyle}
              //dropDownIcon={require('../assets/pin.png')}
              selectedValue={(index, item) => this.selectedValue(index, item)}
            />
            
          </View>
          <View style={Styles.inputAddress}>
            <TextInput label="Địa chỉ" style={Styles.styleLabel}
              mode={'flat'}
              dense={'true'}
              autoCapitalize='none'
              theme={{
                colors: {
                  primary: 'gray',
                },
              }}
            />
          </View>
          <TouchableOpacity
            style={Styles.touchableButton}
            underlayColor='#fff'>
            <Text style={Styles.buttonConfirm}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  inputAddress: {
    width: '95%',
  },
  styleLabel: {
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'gray',
    overflow:'hidden',
    fontFamily: "Cochin",
  },
  touchableButton: {
    width: '80%',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 20,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#E53935',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonConfirm: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
  },
  border: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  containermain: {
    marginLeft: '10%',
    marginRight: '10%',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderWidth: 5,
    borderColor: '#E0E0E0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 5,
  },
  selectedTextStyle: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: '100%',
    color: 'black',
    fontSize: 20,
    paddingLeft: 10,
    marginTop: -2,
  },
  selectedTextStyle1: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: '100%',
    color: 'black',
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 15,
  },
  listTextStyle: {
    color: '#000',
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  searchBarStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowRadius: 1,
    shadowOpacity: 1.0,
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderColor: '#303030',
    shadowColor: '#303030',
    borderRadius: 5,
    elevation: 1,
    marginHorizontal: 10,
  },
  placeHolderTextStyle: {
    color: 'red',
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  dropDownIconStyle: {
    width: 10,
    height: 10,
    left: -40,
    // marginTop: 20,
  },
  dropDownIconStyle1: {
    width: 10,
    height: 10,
    left: -40,
    marginTop: 15,
  },
  pickerStyle: {
    shadowRadius: 0.5,
    shadowOpacity: 0.5,
    borderWidth: 0.5,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    height: 60,
    borderColor: '#303030',
    shadowColor: '#303030',
    borderRadius: 2,
    elevation: 0.5,
  },
  pickerStyle1: {
    height: 60,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
  top: {
    backgroundColor: "#E0E0E0",
    width: '100%',
    borderColor: '#E0E0E0',
    borderWidth: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tittleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
