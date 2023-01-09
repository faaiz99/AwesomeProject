import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LikedSongs({ navigation }) {
  let user = auth().currentUser;
  const [list, setlist] = useState([]);
  useEffect(() => {

    AsyncStorage.getItem(`${user.email}`)
      .then(arrayString => {
        var array = JSON.parse(arrayString);
        console.log("array inside get: ", array)
        setlist(array)
        console.log("list: ", list)
      })
      .catch(error => {
        console.log(error)
      }); 
  }, []);


  const Item = ({title, url}) => {
    let songsQueue = []
    songsQueue = list.map((song)=>{
      return ({title: song.title, url: song.url})
    })
    console.log("like Array: ", songsQueue)
    return (
      <TouchableOpacity>
        <Text>{title}</Text>
      </TouchableOpacity>
    )

  }

  const renderItem = ({ item }) => (
    <Item title={item.title} url={item.url} />
  )

  const test = () => {
    console.log("like songs array: ", list)
  }

  return (
    <View style={{ backgroundColor: 'black', height: '100%' }}>
      <Button title="test" onPress={test} />
      <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>Liked Songs ({user.email})</Text>
      <FlatList
        keyExtractor={item => item.id}
        data={list}
        renderItem={renderItem}></FlatList>
    </View>
  )
}
