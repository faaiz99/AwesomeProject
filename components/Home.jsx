import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi();
const Home = ({navigation, route}) => {
  const [playing, setPlaying] = useState(true);
  const {token, refreshToken} = route.params

  spotifyApi.setAccessToken(token);
  spotifyApi.setRefreshToken(refreshToken)


  useEffect(() => {

  }, []);
 

  return (
    <View>
      
      
    </View>
  )
}

export default Home;

