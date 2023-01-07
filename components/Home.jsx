import { View,StatusBar, TouchableOpacity, Text } from 'react-native'
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
      <View style={{ backgroundColor: "#191414", flexDirection: "row", justifyContent: "space-around", height: "15%", }}>
                <TouchableOpacity style={{ backgroundColor: "#FF9001", padding: 10, borderRadius: 10, justifyContent: "center" }} onPress={()=>navigation.navigate('Liked Songs')}>
                    <Text style={{ color: "white", fontWeight: "900" }}>Liked</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#015D57", padding: 10, borderRadius: 10, justifyContent: "center" }}>
                    <Text style={{ color: "white", fontWeight: "900" }}>Playlists</Text>
                </TouchableOpacity>
            </View>
      <Player LibrarySong = {route.params} />
    </View>
  )
}

export default Home;

