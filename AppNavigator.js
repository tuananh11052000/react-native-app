import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';

import Search from './Screens/seachScreen'
import ConfirmAddress from './Screens/confirmAddress';
import Category from './Screens/category';
import Description from './Screens/description';
import CustomeTabNav from './handleTabNav';
import ConfirmInforScreen from './Screens/confirmInfor'
import Completed from './Screens/completed';
import CreatePost from './Screens/createPost'
import PostType from './Screens/newpostType';
import WhoConfirm from './Screens/whoConfirm'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={CustomeTabNav} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="ConfirmAddress" component={ConfirmAddress} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="Category" component={Category} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="Description" component={Description} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="ConfirmInforScreen" component={ConfirmInforScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Completed" component={Completed} options={{
                    headerShown: false
                }} />
                {/* <Stack.Screen name="CreatePost" component={CreatePost} options={{
                    headerShown: false
                }} /> */}
                <Stack.Screen name="PostType" component={PostType} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="WhoConfirm" component={WhoConfirm} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigator;