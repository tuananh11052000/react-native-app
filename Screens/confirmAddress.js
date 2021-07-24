import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import RNPickerDialog from 'rn-modal-picker';
import { TextInput } from 'react-native-paper';
import db from '../db.json';

export default function confirmAddress(props) {
  const selectedValue = (index, item) => {
    // console.log(item)
    // this.setState({ selectedText: item.name });
  }
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [data1, setData1] = useState(db.province);
  const [data2, setData2] = useState(db.district);
  const [data3, setData3] = useState(db.commune);

  const temp = () => {
    return data2
  }

  return (
    <View style={Styles.border}>
      <View style={Styles.containermain}>
        <View style={Styles.top}>
          <Text style={Styles.tittleText}>Xác nhận địa chỉ</Text>
        </View>
        <View>
          <RNPickerDialog
            data={temp()}
            labelText={'Tỉnh/thành phố'}
            showSearchBar={true}
            showPickerTitle={true}
            listTextStyle={Styles.listTextStyle}
            pickerStyle={Styles.pickerStyle1}
            selectedText={province.name}
            // placeHolderText={this.state.placeHolderText}
            searchBarPlaceHolder={'Search.....'}
            searchBarPlaceHolderColor={'#9d9d9d'}
            selectedTextStyle={Styles.selectedTextStyle1}
            placeHolderTextColor={'black'}
            dropDownIconStyle={Styles.dropDownIconStyle1}
            searchBarStyle={Styles.searchBarStyle}
            //dropDownIcon={require('../assets/pin.png')}
            selectedValue={(index, item) => setData2(data3)}
          />

          <RNPickerDialog
            data={data2}
            labelText={'Quận/huyện'}
            showSearchBar={true}
            showPickerTitle={true}
            listTextStyle={Styles.listTextStyle}
            pickerStyle={Styles.pickerStyle1}
            selectedText={district.name}
            // placeHolderText={this.state.placeHolderText}
            searchBarPlaceHolder={'Search.....'}
            searchBarPlaceHolderColor={'#9d9d9d'}
            selectedTextStyle={Styles.selectedTextStyle1}
            placeHolderTextColor={'black'}
            dropDownIconStyle={Styles.dropDownIconStyle1}
            searchBarStyle={Styles.searchBarStyle}
            //dropDownIcon={require('../assets/pin.png')}
            selectedValue={(index, item) => setDistrict(item)}
          />
          <RNPickerDialog
            data={data3}
            labelText={'Phường/xã/thị trấn'}
            showSearchBar={true}
            showPickerTitle={true}
            listTextStyle={Styles.listTextStyle}
            pickerStyle={Styles.pickerStyle1}
            // selectedText={this.state.selectedText}
            // placeHolderText={this.state.placeHolderText}
            searchBarPlaceHolder={'Search.....'}
            searchBarPlaceHolderColor={'#9d9d9d'}
            selectedTextStyle={Styles.selectedTextStyle1}
            placeHolderTextColor={'black'}
            dropDownIconStyle={Styles.dropDownIconStyle1}
            searchBarStyle={Styles.searchBarStyle}
            //dropDownIcon={require('../assets/pin.png')}
            selectedValue={(index, item) => selectedValue(index, item)}
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

const Styles = StyleSheet.create({
  inputAddress: {
    width: '95%',
  },
  styleLabel: {
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'gray',
    overflow: 'hidden',
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
