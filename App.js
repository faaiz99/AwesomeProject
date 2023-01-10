import React from 'react';
import Root from './components/Root';
import SplashScreen from './screens/SplashScreen';
import Signin from './components/Signin';
import Signup from './components/Signup';
import ListPlaylist from './components/ListPlaylist';
import Playlist from './components/Playlist';
import PlaylistSongs from './components/PlaylistSongs';
import LikedSongs from './screens/LikedSongs'
import LoginPage from './screens/LoginPage'
import ForgotPassword from './screens/ForgotPassword'
import Profile from './screens/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          options={{
            headerShown: false,
            tabBarStyle: {
              display: 'none',
            },
          }}
          component={SplashScreen}
        />
        <Stack.Screen
          name="Login Page"
          component={LoginPage}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Forgot Password"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
            tabBarStyle: {
              display: 'none',
            },
          }}
          component={Signin}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            tabBarStyle: {
              display: 'none',
            },
          }}
          name="Root"
          component={Root}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            tabBarStyle: {
              display: 'none',
            },
          }}
          name="Signup"
          component={Signup}
        />
        <Stack.Screen name="ListPlaylists" 
        options={{
          headerTitle:"Playlists"
        }}
        component={ListPlaylist} />
        <Stack.Screen
          name="Playlist"
          component={Playlist}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PlaylistSongs"
          component={PlaylistSongs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Liked Songs"
          component={LikedSongs}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            headerTitleStyle:{
              color:"white"
            },
            headerStyle: {
              backgroundColor: 'black',
           },
           headerTintColor: 'white'

          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
