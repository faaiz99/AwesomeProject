import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
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
      <Player/>
    </View>
  )
}

export default Home;

