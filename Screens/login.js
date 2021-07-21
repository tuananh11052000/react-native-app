import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text } from 'react-native';
import { TabView, SceneMap, TabBar,Tabs  } from 'react-native-tab-view';
import Login from '../components/login.component'
import SignUp from '../components/signUp.component'

export default function TabViewExample(props) {
  const {navigation} = props;
  const FirstRoute = () => (
    <View style={styles.scene}>
      <Login onPress_={() => navigation.navigate('Home')}/>
    </View>
  );
  
  const SecondRoute = () => (
    <View style={styles.scene}>
      <SignUp onPress_={() => navigation.navigate('Home')} />
    </View>
  );
  
  const initialLayout = { width: Dimensions.get('window').width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'ĐĂN NHẬP' },
    { key: 'second', title: 'ĐĂNG KÝ' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={props => (
        <TabBar
          {...props}
          renderLabel={({ route, color }) => (
            <Text style={{ color: 'black', margin: 8 }}>
              {route.title}
            </Text>
          )}
          style={{backgroundColor: 'white', tabBarInactiveTextColor: 'red'}}
          underlineColor="#000"
        />
      )}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
  },
  scene: {
    flex: 1,
  }
});