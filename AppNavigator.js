import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeStack, ProfileStack, CreatePostStack } from './CustomeNavigator';
import Search from './Screens/seachScreen'
import ConfirmAddress from './Screens/confirmAddress';
import Category from './Screens/category';
import Description from './Screens/description';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function customeTabNav() {
    return (<Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
            activeTintColor: '#e91e63',
        }}
    >
        <Tab.Screen
            name="Feed"
            component={HomeStack}
            options={{
                tabBarLabel: 'Trang chủ',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Notifications"
            component={CreatePostStack}
            options={{
                tabBarLabel: 'Tin đăng',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="post" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
                tabBarLabel: 'Cá nhân',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>)
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={customeTabNav} options={{
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigator;