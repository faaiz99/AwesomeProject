import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LikedSongs() {
  let user = auth().currentUser;
  const [list, setlist] = useState([]);
  useEffect(() => {
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
