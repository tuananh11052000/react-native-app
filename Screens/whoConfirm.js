import React from 'react';
import { FlatList, Image, StyleSheet, View, Text, StatusBar } from 'react-native';

import WhoConfirm from '../components/WhoConfirm.component';
import PriorityImg from '../assets/priority_preview.png'

const heightStatusBar = StatusBar.currentHeight;//get status bar height

export default class whoConfirms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whoconfirm: [
        { id: 1, title: 'Người nghèo' },
        { id: 2, title: 'Quỹ/ Nhóm từ thiện' },
        { id: 3, title: 'Tổ chức công ích' },
      ]
    }
  }

  render() {
    const { navigation } = this.props;
    const { whoconfirm } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={whoconfirm}
          renderItem={({ item }) => <WhoConfirm who={item}
            onPress={() => navigation.navigate('ConfirmAddress')} />}
          keyExtractor={item => `${item.id}`}
          style={styles.flatList}
        />
        <View style={styles.row}>
          <Image source={PriorityImg} style={{ width: 26, height: 26 }} />
          <Text style={styles.textNote}> Lưu ý</Text>
        </View>
        <Text style={styles.textContent}>
          Tổ chức công ích bao gồm: Trường học, bệnh viện, UBND, Hội Chữ Thập Đỏ, Nhà thờ, ... cần quyên góp xây dựng "đường, cầu cống, nhà tình thương".
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    marginTop: heightStatusBar,
    paddingTop: 0
  },
  flatList: {
    flexGrow: 0,
    marginTop: 0,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
  },
  textNote: {
    fontSize: 20,
  },
  textContent: {
    padding: 16,
  }
});

