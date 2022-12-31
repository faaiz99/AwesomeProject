import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList
} from 'react-native';
import { useState } from 'react';
import getSongs from '../getTracks'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


const Item = ({ name }) => (
  <View style={styles.item}>
    <TouchableOpacity>
    <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>

  </View>
);

export default function Library() {
  const [songsList, setSongsList] = useState([])
  const populate = async () => {
    var songs = await getSongs()
    console.log(songs)
    setSongsList(songs)
  }


  const renderItem = ({ item }) => (
    <Item name={item.name} />
  );
  return (
    <View style={styles.container}>
      <Button title='Get' onPress={populate}/>
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
    flex:1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:"#19141"
  },
  item: {
    backgroundColor:"black",
    color:"#19141",
    padding: 5,
  },
  title: {
    fontSize: 20,
    color:"white"
  },
});
