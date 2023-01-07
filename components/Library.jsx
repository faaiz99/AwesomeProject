import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  Button,
} from 'react-native';
import { useState } from 'react';
import getSongs from '../getTracks';
import TrackPlayer from 'react-native-track-player';
import { LogBox } from 'react-native';


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Library({ navigation, route }) {
  const [songsList, setSongsList] = useState([]);
  useEffect(() => {
    const populate = async () => {
      var songs = await getSongs();
      setSongsList(songs);
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
  const Item = ({ name, path, mtime }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => playSong(name, path, mtime)}>
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => {
    return <Item name={item.name} path={item.path} mtime={item.mtime} />;
  };

  const playlist = () => {
    var songsArray = [];
    songsArray = songsList.map(song => {
      return { title: song.name, url: song.path, timeAdded: song.mtime };
    });
    songsArray.shift();
    navigation.navigate('ListPlaylists', { songsQueue: songsArray });
  };

  return (
    <View style={styles.container}>      
    <Button title="Playlists" onPress={playlist} />
      <StatusBar animated={true} backgroundColor="#191414" />
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
    backgroundColor: '#19141',
  },
  item: {
    backgroundColor: '#191414',
    padding: 5,
  },
  title: {
    fontSize: 15,
    color: 'white',
  },
});
