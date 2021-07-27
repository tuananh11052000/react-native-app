import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Constants from 'expo-constants'

import Home from './Screens/home'
import ProfileScreen from './Screens/profile'
import Authentication from './Screens/login'
import createPost from './Screens/createPost';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tài khoản" component={ProfileScreen}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="Authentication" component={Authentication}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}

const CreatePostStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Đăng tin" component={createPost}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}

export default function CustomeTabNav() {
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