import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useState, useEffect} from 'react';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default PlaylistSongs = ({navigation, route}) => {
  const [songs, setSongs] = useState([]);
  //   const {playName} = route.params.playName;
  useEffect(() => {
    console.log('playlistsongs playlist name: ', route.params.name);
    getSongs();
  }, []);

  const getSongs = async () => {
    console.log('inside get songs function');
    let response = await AsyncStorage.getItem(route.params.name);
    response = JSON.parse(response);
    console.log('songs response: ', response);
    setSongs(response);
    // console.log('songssssssssss: ', songs);
  };

  const Item = ({name, path}) => {
    var songsArray = [];
    songsArray = songs.map(song => {
      //   console.log('song name : ', song.name);
      return {title: song.name, url: `file://${song.path}`};
    });
    console.log('playlistsongs songsArray: ', songsArray);
    return (
      <View>
        <TouchableOpacity
          onPress={async () => {
            // await TrackPlayer.reset();
            navigation.navigate('Home', {
              title: name,
              url: `file://${path}`,
              songsQueue: songsArray,
            });
            // <Player LibrarySong={songsQueue} />;
          }}>
          <Text>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.songs}>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Item name={item.name} path={item.path} />
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                style={{backgroundColor: 'green', padding: 10}}
                onPress={() => {
                  removeSong(route.params.name, item.name);
                }}>
                <Icon color="#1DB954" name="trash" size={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon color="#1DB954" name="share" size={20} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  removeSong = async (playlistName, song) => {
    console.log('inside remove song function');
    console.log('playlistname: ', playlistName);
    console.log('song: ', song);
    try {
      console.log('inside try');
      let response = await AsyncStorage.getItem(playlistName);
      response = JSON.parse(response);
      console.log('repsponse1: ', response);
      let found = response.find(element => element.name == song);
      console.log('found: ', found);
      console.log('found.name:', found.name);
      let response2 = [{name: 'mifra'}];
      response.forEach(element => {
        if (element.name != song) {
          response2.push(element);
        }
      });
      response2.shift();
      console.log('reponse2: ', response2);
      response2 = JSON.stringify(response2);
      await AsyncStorage.setItem(playlistName, response2);
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };

  const addSongs = () => {
    navigation.navigate('Library', {
      nav: 'navigated after creation',
      name: route.params.name,
    });
  };
  return (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>
        {route.params.name}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={addSongs} style={styles.button}>
          <Icon color="white" name="plus" size={20} />
          <Text style={{textAlign: 'center'}}>Add Songs</Text>
        </TouchableOpacity>
      </View>
      {/* <Button title="Add Songs" onPress={addSongs} /> */}
      <FlatList data={songs} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  songs: {
    backgroundColor: '#bababa',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    width: '40%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 10,
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
  },
});
