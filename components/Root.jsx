
import React, {useEffect} from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './Search';
import Library from './Library';
import Home from './Home';
import axios from "axios";
import Icon from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const Root = ({ navigation, route }) => {
  const { accessToken, typeToken, refreshToken } = route.params

  useEffect(() => {
    if (accessToken) {
      axios("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((response) => {
            // console.log(response)
        })
        .catch((error) => {
          console.log("error", error.message);
        });

      // setTimeout(
      //   () =>
      //     navigation.replace("Home", {
      //       token: token,
      //     }),
      //   500
      // );

    }
  })

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} initialParams = {{token:accessToken, refreshToken:refreshToken}}/>
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  )
}

export default Root