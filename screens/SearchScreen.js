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
import TrackPlayer from 'react-native-track-player';

const PlaylistScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState();
  const [songsList, setSongsList] = useState([]);
  useEffect(() => {
    const populate = async () => {
      var songs = await getSongs();
      setSongsList(songs);
      setFilteredData(songs)
    };
    populate();
  }, [songsList]);

  const playSong = async (name, path, mtime) => {
    TrackPlayer.reset();
    var songsArray = [];
    songsArray = songsList.map(song => {
      return { title: song.name, url: song.path, timeAdded: song.mtime };
    });
    songsArray.shift();
    navigation.navigate('Home', {
      title: name,
      url: `file://${path}`,
      timeAdded: mtime,
      songsQueue: songsArray,
    });
};
  const handleSearch = (text) => {
    setSearchTerm(text);
    const newData = data.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };
const renderItem = ({ item }) => (
  <TouchableOpacity onPress={()=>playSong(item.name, item.path, item.mtime)}>
    <Text style={{color:"white"}}>{item.name}</Text>
  </TouchableOpacity>
  
)
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
        renderItem={renderItem}
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