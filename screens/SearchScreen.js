import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';

const data = 
  [{"ctime": null, "mtime": '2020-11-30T13:24:07.000Z', "name": "[Official Release] Janett Suhh", "path": "/storage/emulated/0/Music/[Official Release] Janett Suhh - In Silence It's Okay To Not Be Okay OST Lyrics가사 [English Lyric.mp3", "size": 5202475}, {"ctime": null, "mtime": '2020-02-16T19:16:34.000Z', "name": "AADAT INSTRUMENTAL-BHANWARAY f", "path": "/storage/emulated/0/Music/AADAT INSTRUMENTAL-BHANWARAY feat. Goher Mumtaz _ NESCAFÉ Basement Season 5 _ 2019 (192  kbps).mp3", "size": 15259827}, {"ctime": null, "mtime": '2020-06-12T13:46:03.000Z', "name": "Aamir - Right Now Na Na Na Lyr", "path": "/storage/emulated/0/Music/Aamir - Right Now Na Na Na Lyrics (Akon) (192  kbps).mp3", "size": 3943582}, {"ctime": null, "mtime": '2020-11-11T18:42:56.000Z', "name": "Aitebar Vital Signs HIGH QUALI", "path": "/storage/emulated/0/Music/Aitebar Vital Signs HIGH QUALITY Full Song,ray channel.mp3", "size": 6026899}, {"ctime": null, "mtime": '2020-06-30T19:05:04.000Z', "name": "Akbari Asghari _ OST Song _ Fa", "path": "/storage/emulated/0/Music/Akbari Asghari _ OST Song _ Fawad Khan & Sanam Baloch _ HUM Entertainment (192  kbps).mp3", "size": 3029506}, {"ctime": null, "mtime": '2020-06-16T22:59:14.000Z', "name": "Ali Maula   Kurbaan Full HQ So", "path": "/storage/emulated/0/Music/Ali Maula   Kurbaan Full HQ Song   New Hindi Movie   Saif Ali Khan Kareena Kapoor   Bollywood 2009 (192  kbps).mp3", "size": 6882282}, {"ctime": null, "mtime": '2020-02-18T18:50:03.000Z', "name": "Alif - Full OST - Shuja Haider", "path": "/storage/emulated/0/Music/Alif - Full OST - Shuja Haider ft Momina Mushtesan - Lyrical (192  kbps).mp3", "size": 7339710},
  {"ctime": null, "mtime": '2019-11-13T14:51:57.000Z', "name": "Alif _ Full OST _ Hamza Ali Ab", "path": "/storage/emulated/0/Music/Alif _ Full OST _ Hamza Ali Abbasi _ Ahsan Khan _ Sajal Aly _ Kubra Khan _ Geo TV _ Har Pal Geo (192  kbps).mp3", "size": 6146018}, {"ctime": null, "mtime": '2020-11-19T21:56:27.000Z', "name": "Ankhon Se(Dil Harey).mp3", "path": "/storage/emulated/0/Music/Ankhon Se(Dil Harey).mp3", "size": 6390524}, {"ctime": null, "mtime": '2020-07-30T21:54:15.000Z', "name": "Atif Aslam - Aadat (192  kbps)", "path": "/storage/emulated/0/Music/Atif Aslam - Aadat (192  kbps).mp3", "size": 6426260}, {"ctime": null, "mtime": '2022-07-20T16:08:20.000Z', "name": "au_uu_SzH34yR2.mp3", "path": "/storage/emulated/0/Music/au_uu_SzH34yR2.mp3", "size": 1138},
]
const PlaylistScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [bytitle, setBytitle] = useState(data)
  const handleSearch = (text) => {
    setSearchTerm(text);
    const newData = data.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };

  return (
    <View style={{ backgroundColor: '#191414' }}>
      <StatusBar
        animated={true}
        backgroundColor="#191414" />
      <TextInput
        style={styles.search}
        placeholder="Songs"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        style={{ backgroundColor: '#191414' }}
        data={filteredData}
        renderItem={({ item }) => (
          <Text style={{color:"white"}}>{item.name}</Text>
        )}
        keyExtractor={(item) => item.path}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  search: {
    color: '#f6f6f6',
    backgroundColor: '#a1a1a1',
    borderColor: '#a1a1a1',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
  }

})
export default PlaylistScreen;
