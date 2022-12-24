import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import SoundPlayer from 'react-native-sound-player'
import storage from '@react-native-firebase/storage';



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
  const play = async ()=> {
    try {
      // play the file tone.mp3
      // SoundPlayer.playSoundFile('tone', 'mp3')
      // or play from url
      const reference = storage().ref('Kesariya - Brahmastra 128 Kbps.mp3');
    

      var path = await reference.getDownloadURL()
      SoundPlayer.loadUrl(path)
      SoundPlayer.play()

  } catch (e) {
      console.log(`cannot play the sound file`, e)
  }
  }
  const pause = async ()=> {
    try {
      SoundPlayer.pause()

    }catch(e){
      console.log(e)
    }
  }
  const resume = async ()=> {
    SoundPlayer.resume()
 
  }
  const getLoc = async () => {
    // var ref = await storage().app
    // console.log(ref)
  }



  return (
    <View>

      <Button onPress={play} title="Play"/>
      <Button onPress={pause} title="Pause"/>
      <Button onPress={resume} title="Resume"/>
      <Button title = "get path" onPress={getLoc}/>
      <Text>Hello {user.email}</Text>
      <Button title='Sign Out' onPress={signOut} />

    </View>
  )
}

export default Home;

