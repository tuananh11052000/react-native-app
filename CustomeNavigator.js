import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Constants from 'expo-constants'

import Home from './Screens/home'
import ProfileScreen from './Screens/profile'
import Authentication from './Screens/login'
import createPost from './Screens/createPost';
import confirmAddress from './Screens/confirmAddress'

const Stack = createStackNavigator();
const heightStatusBar = StatusBar.currentHeight;
//Tao stack navigator cho Home
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="Detail" component={confirmAddress}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}
export { HomeStack }
//Tao stack navigator cho trang ca nhan
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
export { ProfileStack }
//Tao stack navigator cho trang dang tin
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
export { CreatePostStack }
