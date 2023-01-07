
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';

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

  return (
    <View style={{backgroundColor: 'black',height:'100%'}}>
      <Text style={{color: 'white',alignSelf:'center',fontSize:20}}>Liked Songs (`${user.email}`)</Text>
      <FlatList
        keyExtractor={item => item.id}
        data={list}
        renderItem={({item}) => (
          <TouchableOpacity style={{margin: 20}}>
       <Text style={{color:'white',fontSize:25}}>{item.title}</Text>     
          </TouchableOpacity>
        )}></FlatList>

    async () => {
      AsyncStorage.getAllKeys()
        .then(keys => {
          const filteredKeys = keys.filter(key =>
            key.startsWith(user.currentUser),
          );
          return AsyncStorage.multiGet(filteredKeys);
        })
        .then(values => {
          setlist(values)
        })
        .catch(error => {
          console.log(error);
        });
    };
  }, []);
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ margin: '10' }}>{item.title}</TouchableOpacity>
        )}
      />
      <Text>Hello</Text>

    </View>
  );
}
