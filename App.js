import React from 'react'
import Root from './components/Root';
import SplashScreen from './screens/SplashScreen'
import Signin from './components/Signin'
import Login from './components/Login'
import Signup from './components/Signup';
import ForgotPassword from './screens/ForgotPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LikedSongs from './screens/LikedSongs';
import ListPlaylist from './components/ListPlaylist'
import PlayList from './components/Playlist'
import Player from './components/Player';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash"
          options={{
            headerShown: false,
            tabBarStyle: {
              display: "none"
            },
          }}
          component={SplashScreen} />
        <Stack.Screen name="Login" options={{
          headerShown: false,
          tabBarStyle: {
            display: "none"
          },
        }} component={Signin} />
        <Stack.Screen options={{
          headerShown: false,
          tabBarStyle: {
            display: "none"
          },
        }} name="Root" component={Root} />
        <Stack.Screen options={{
          headerShown: false,
          tabBarStyle: {
            display: "none"
          },
        }} name="Signup" component={Signup} />
        <Stack.Screen options={{
          headerShown: false,
          tabBarStyle: {
            display: "none"
          },
        }} name="Liked Songs" component={LikedSongs} />
        <Stack.Screen options={{
          headerShown: false,
          tabBarStyle: {
            display: "none"
          },
        }} name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen options={{
          headerShown: false,
          tabBarStyle: {
            display: "none"
          },
        }} name="ListPlaylists" component={ListPlaylist} />
             <Stack.Screen options={{
          headerShown: false,
          tabBarStyle: {
            display: "none"
          },
        }} name="Playlist" component={PlayList} />
          {/* <Stack.Screen options={{
          headerShown: false,
          tabBarStyle: {
            display: "none"
          },
        }} name="Player" component={Player} />  */}
               

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App