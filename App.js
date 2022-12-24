import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import Login from './components/Login';
import Root from './components/Root';
import SplashScreen from './screens/SplashScreen'
import Signin from './components/Signin'
import Signup from './components/Signup';
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
        }} component = {Signin}/>
      <Stack.Screen options={{ 
        headerShown: false, 
        tabBarStyle:{ 
          display: "none" },
        }}name = "Root" component = {Root}/>
      <Stack.Screen options={{ 
        headerShown: false, 
        tabBarStyle:{ 
          display: "none" },
        }}name = "Signup" component = {Signup}/>
        
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App