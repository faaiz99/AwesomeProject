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
    spotifyApi
      .play({
        context_uri: "spotify:album:1GknYqyoJ7ZHn8ch5PJipt"
      })
      .then(
        function () {
          console.log("playing: ");
        },
        function (err) {
          //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
          console.log("Something went wrong!", err);
        }
      );
  }, []);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "1%",
        }}
      >       
        <TouchableOpacity
          onPress={() =>
            spotifyApi.pause().then(
              function () {
                setPlaying(false);
                console.log("Playback paused");
              },
              function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log("Something went wrong!", err);
              }
            )
          }
          style={{
            display: playing ? "flex" : "none",
            paddingHorizontal: "10%",
            paddingTop: "5%",
          }}
        >
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            spotifyApi.play().then(
              function () {
                setPlaying(true);
                console.log("Playback resumed");
              },
              function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log("Something went wrong!", err);
              }
            )
          }
          style={{
            display: playing ? "none" : "flex",
            paddingHorizontal: "10%",
            paddingTop: "5%",
          }}
        >
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home;

