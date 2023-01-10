import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
export default function LikedSongs({ navigation }) {
  let user = auth().currentUser;
  const [list, setlist] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem(`liked Songs of ${user.email}`)
      .then((arrayString) => {
        const array = JSON.parse(arrayString);
        setlist(array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const removeItem = (id) => {
    let arr = list.filter(function (item) {
      return item.id !== id;
    });
    setlist(arr);
    AsyncStorage.setItem(
      `liked Songs of ${user.email}`,
      JSON.stringify(arr)
    ).catch((error) => {
      console.log(error);
    });
    AsyncStorage.getItem(`liked Songs of ${user.email}`)
      .then((arrayString) => {
        const array = JSON.parse(arrayString);
        console.log(array);
        setlist(array);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(arr);
    setlist(arr);

  };
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={{ margin: 20 }} onPress={() => {
        var songsArray = [];
        songsArray = list
        navigation.navigate('Home', {
          // array: songsList,
          title: item.title,
          url: item.url,
          songsQueue: songsArray,
        });
      }
      }>
        <Text style={{ color: "white", fontSize: 15 }}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ backgroundColor: "black", height: "100%" }}>
      <Text style={{ color: "white", alignSelf: "center", fontSize: 15 }}>
        Liked Songs ({user.email})
      </Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={list}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
}
