import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { useState } from 'react';
import getSongs from '../getTracks'
const Item = ({ name }) => (
  <View style={styles.item}>
    <TouchableOpacity>
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>

  </View>
);

export default function Library() {
  const [songsList, setSongsList] = useState([])
  useEffect(() => {
      const populate = async () => {
        var songs = await getSongs()
        console.log("Library", songs)
        setSongsList(songs)
      }
      populate()
  },[songsList])



  const renderItem = ({ item }) => (
    <Item name={item.name} />
  );
  return (
    <View style={styles.container}>
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
    backgroundColor: "black",
    color: "#19141",
    padding: 5,
  },
  title: {
    fontSize: 20,
    color: "white"
  },
});
