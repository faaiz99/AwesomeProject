import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import Login from './components/Login';
import Home from './components/Home';
import SplashScreen from './screens/SplashScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name="Splash" 
        options={{ 
        headerShown: false, 
        tabBarStyle:{ 
          display: "none" },
        }} 
        component={SplashScreen} />
      <Stack.Screen name = "Login" component = {Login}/>
      <Stack.Screen name = "Home" component = {Home}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App