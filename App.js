import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import Login from './components/Login';
import Root from './components/Root';
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
      <Stack.Screen name = "Login"  options={{ 
        headerShown: false, 
        tabBarStyle:{ 
          display: "none" },
        }} component = {Login}/>
      <Stack.Screen options={{ 
        headerShown: false, 
        tabBarStyle:{ 
          display: "none" },
        }}name = "Root" component = {Root}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App