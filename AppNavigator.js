import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Screens/home'
import Detail from './Screens/detail'
import TabViewExample from './Screens/login'

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={TabViewExample} 
                    options={{headerStyle: {
                        backgroundColor: '#f4511e',
                      }}}
                />
                <Stack.Screen name="Home" component={Home}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigator;