import { View,StatusBar } from 'react-native'
import { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import Player from './Player';

const Home = ({ navigation, route }) => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        navigation.navigate('Login', { screen: "Login" })
      });
  }
  const user = auth().currentUser;
  if (user) {
    // console.log('User email: ', user);
  }
  return (
    <View>
      <StatusBar animated={true} backgroundColor="#191414"/>
      <Player LibrarySong = {route.params} />
    </View>
  )
}

export default Home;

