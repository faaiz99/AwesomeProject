import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LikedSongs() {
  let user = auth().currentUser;
  const [list, setlist] = useState([]);
  useEffect(() => {

    AsyncStorage.getItem(`${user.email}`)
      .then(arrayString => {
        const array = JSON.parse(arrayString);
        setlist(array)
      })
      .catch(error => {
        console.log(error)
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ margin: 20 }}>
      <Text style={{ color: 'white', fontSize: 15 }}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={{ backgroundColor: 'black', height: '100%' }}>
      <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>Liked Songs ({user.email})</Text>
      <FlatList
        keyExtractor={item => item.id}
        data={list}
        renderItem={renderItem}></FlatList>
    </View>
  )
}
