import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar
} from 'react-native';
import { useState } from 'react';
import getSongs from '../getTracks';
import TrackPlayer from 'react-native-track-player';
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export default function Library({ navigation, route }) {
  const [songsList, setSongsList] = useState([])
  useEffect(() => {
      const populate = async () => {
        var songs = await getSongs()
       // console.log("Library", songs)
        setSongsList(songs)
      }
      populate()
  },[songsList])
  const playSong = async(name,path)=>{
    TrackPlayer.reset()
    navigation.navigate('Home',{
      title: `${name}`,
      url: `file://${path}`
    })
    //console.log("Added Song")
  }
  const Item = ({ name, path }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={()=>playSong(name,path)}>
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} path = {item.path} />
  );
  return (
    
    <View style={styles.container}>
        <StatusBar
        animated={true}
        backgroundColor="#191414"/>
      <FlatList
        data={songsList}
        renderItem={renderItem}
        extraData={songsList}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19141"
  },
  item: {
    backgroundColor: "#191414",
    padding: 5,
  },
  title: {
    fontSize: 15,
    color: "white"
  },
});
