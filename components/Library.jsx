import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  Button,
  ToastAndroid
} from 'react-native';
import { useState } from 'react';
import getSongs from '../getTracks';
import TrackPlayer from 'react-native-track-player';
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Library({ navigation, route }) {
  const [songsList, setSongsList] = useState([]);

  useEffect(() => {
    const populate = async () => {
      var songs = await getSongs();
      // songs.shift();
      setSongsList(songs);
    };
    populate();
  }, []);

  const playSong = async (name, path, mtime) => {
    TrackPlayer.reset();
    var songsArray = [];
    songsArray = songsList.map(song => {
      return { title: song.name, url: song.path, timeAdded: song.mtime };
    });
    songsArray.shift();
    navigation.navigate('Home', {
      // array: songsList,
      title: name,
      url: `file://${path}`,
      timeAdded: mtime,
      songsQueue: songsArray,
    });
  };
  const storeSongs = async (playlistName, songName, path) => {
    console.log('playlist name: ', playlistName);
    console.log('item name: ', songName);
    let response = await AsyncStorage.getItem(playlistName);
    console.log('response get: ', response);
    if (!response) {
      console.log('inside if: ', response);
      response = [{ name: 'mifra', path: 'mifraa' }];
      response.push({ name: songName, path: path });
      console.log('response after if: ', response);
      response.shift();
    } else {
      console.log('inside else: ', response);

      response = JSON.parse(response);
      response.push({ name: songName, path: path });
    }
    response = JSON.stringify(response);
    console.log('response final: ', response);
    await AsyncStorage.setItem(playlistName, response);
    console.log('data saved');
    addToast();
  };
  const Item = ({ name, path, mtime }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => playSong(name, path, mtime)}>
        <Icon color="#1DB954" name="music" size={20}/>
        <Icon color="#1DB954" name="trash" size={20}/>
        <Icon color="#1DB954" name="plus" size={20}/>
        <Icon color="#1DB954" name="share" size={20}/>
        <Icon color="#1DB954" name="edit" size={20}/>      
        <Text style={styles.title}>{name}{'...'}</Text>
      </TouchableOpacity>
      {route.params.nav === '' ? (
        <View></View>
      ) : (
        <TouchableOpacity
          onPress={() => storeSongs(route.params.name, name, path)}>
          <Icon color="#1DB954" name="plus" size={20} />
        </TouchableOpacity>
      )}
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
    // songsArray.shift();
    navigation.navigate('ListPlaylists', { songsQueue: songsArray });
  };
  const renderElement = () => {
    if (route.params.nav === '') {
      return (
        <View>
          <Button title="Playlists" onPress={playlist} />
          <StatusBar animated={true} backgroundColor="#191414" />
          <FlatList
            data={songsList}
            renderItem={renderItem}
            extraData={songsList}
          />
        </View>
      );
    } else if (route.params.nav == 'navigated after creation') {
      return (
        <View>
          <View
            style={{
              backgroundColor: '#191414',
              display: 'flex',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ListPlaylists');
              }}
              style={styles.button}>
              <Text style={{color: 'white', textAlign: 'center'}}>Done</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={songsList}
            renderItem={renderItem}
            extraData={songsList}
          />
        </View>
      );
    }
  };
  const addToast = () => {
    ToastAndroid.show('Song added!', ToastAndroid.SHORT);
  };

  return (<View style={styles.container}>
    {renderElement()}
  </View>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19141',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#191414',
    padding: 5,
    justifyContent:"center",
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    color: 'white',
    fontWeight:"bold",

  },
});
