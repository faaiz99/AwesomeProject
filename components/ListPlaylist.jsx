import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {Children, Component} from 'react';
import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {set} from 'react-native-reanimated';

export default ListPlaylist = ({navigation, route}) => {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistList, setPlaylistList] = useState([]);

  listPlaylist = route.params;
  // var playlistArray = [];
  // var response = [];

  useEffect(() => {
    getUser();
    // removeValue();
  }, []);

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('playlist');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };

  const test = () => {
    console.log('inside test function');
    setPlaylistList([...playlistList, {name: response}]);
    console.log('playlistList: ', playlistList);
    // setPlaylistList(playlistArray);
    // console.log('playlistList: ', playlistList);
  };

  const storeUser = async value => {
    // value = JSON.parse(value);
    console.log('value: ', value);
    let response = await AsyncStorage.getItem('playlist');
    console.log('response: ', response);
    if (!response) {
      response = [{name: 'mifra'}];
      response.push({name: value});
      response.shift();
    } else {
      response = JSON.parse(response);
      response.push({name: value});
    }
    response = JSON.stringify(response);
    console.log('response final: ', response);
    await AsyncStorage.setItem('playlist', response);
  };

  const getUser = async () => {
    console.log('inside get function');
    let response = await AsyncStorage.getItem('playlist');
    response = JSON.parse(response);
    console.log('gotten response: ', response);
    setPlaylistList(response);
  };

  const createPlaylist = () => {
    console.log('hello');
    let playlistArray = [];
    playlistArray.push(playlistName);
    // setPlaylistList([...playlistList, {name: playlistName}]);
    storeUser(playlistName);
    // storeUser(playlistList);

    setPlaylistName('');
    navigation.navigate('Playlist', {
      name: playlistName,
      songsQueue: listPlaylist.songsQueue,
    });
  };

  const getData = () => {
    console.log('hello');
    // return (
    //   <View style={{color: 'black', backgroundColor: 'black'}}>
    //     <Text>hello</Text>
    //   </View>
    // );
  };

  const Item = ({name}) => {
    return (
      <TouchableOpacity onPress={getData}>
        <View>
          <Text>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    // console.log('item:', item);
    return (
      <View>
        {/* <Button title="test" onPress={test} /> */}
        <View style={{backgroundColor: 'grey', margin: 10}}>
          <TouchableOpacity onPress={() => alert('lanti')}>
            <Item name={item.name} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text>Playlist</Text>
      <TouchableOpacity style={{color: 'black'}}>
        <TextInput
          placeholder="Create Playlist"
          onChangeText={setPlaylistName}
          value={playlistName}
        />
      </TouchableOpacity>
      <Button title="create" onPress={createPlaylist} />
      <Button title="test" onPress={test} />

      <FlatList data={playlistList} renderItem={renderItem} />

      <View>{/* <Text>{playlistList}</Text> */}</View>
      {/* <Button title="Create Playlist" onPress={createPlaylist} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

