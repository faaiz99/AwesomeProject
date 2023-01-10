import {
  Text,
  View,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import React, {Children, Component} from 'react';
import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {set} from 'react-native-reanimated';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ListPlaylist = ({navigation, route}) => {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistList, setPlaylistList] = useState([]);
  const [editPlaylistName, setEditPlaylistName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  listPlaylist = route.params;
  // var playlistArray = [];
  // var response = [];

  useEffect(() => {
    // removeValue();
    getUser();
    // removeValue();
  }, []);

  // removeValue = async () => {
  //   console.log('triggered');
  //   try {
  //     await AsyncStorage.removeItem('Jawaria ');
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   console.log('removed');
  // };

  removePlaylist = async value => {
    console.log('inside remove playlist function');
    console.log('value: ', value);
    try {
      let response1 = await AsyncStorage.getItem(value);
      response1 = JSON.parse(response1);
      response1 = [];
      response1 = JSON.stringify(response1);
      await AsyncStorage.setItem(value, response1);
      console.log('inside try');
      let response = await AsyncStorage.getItem('playlist');
      response = JSON.parse(response);
      let found = response.find(playlist => playlist.name === value);
      console.log('found: ', found);
      console.log('found.name:', found.name);
      let response2 = [{name: 'mifra'}];
      response.forEach(element => {
        if (element.name != value) {
          response2.push(element);
        }
      });
      response2.shift();
      console.log('reponse2: ', response2);
      response2 = JSON.stringify(response2);
      await AsyncStorage.setItem('playlist', response2);
    } catch (e) {
      // remove error
    }

    console.log('Done.');
    deleteToast();
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
    navigation.navigate('Library', {
      nav: 'navigated after creation',
      name: playlistName,
      // songsQueue: listPlaylist.songsQueue,
    });
  };

  const editName = async (originalName, edittedName) => {
    console.log('inside editname');
    console.log('playlistName: ', playlistName);
    setPlaylistName('');
    console.log('playlistName: ', playlistName);

    setEditPlaylistName('');
    setModalVisible(!modalVisible);
    console.log('modal visible: ', modalVisible);
    console.log('original name: ', originalName);
    console.log('editted name: ', edittedName);
    if (edittedName != '') {
      let response = await AsyncStorage.getItem('playlist');
      response = JSON.parse(response);
      console.log('response: ', response);
      const index = response.findIndex(
        element => element.name === originalName,
      );
      console.log('index: ', index);
      response[index] = {name: edittedName};
      console.log('response after editting: ', response);
      response = JSON.stringify(response);
      await AsyncStorage.setItem('playlist', response);
      updateToast();
    }

    // alert('Playlist name has been changed');
  };

  const Item = ({name}) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          await TrackPlayer.reset();
          console.log('nameeeee: ', name);
          navigation.navigate('PlaylistSongs', {
            name: name,
          });
        }}>
        <View>
          <Text>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    let name2 = '';
    // console.log('item:', item);
    return (
      <View style={{display: 'flex'}}>
        {/* <Button title="test" onPress={test} /> */}
        <Modal transparent={true} visible={modalVisible} animationType="slide">
          {/* <Text>Modal</Text> */}
          <View
            style={{
              backgroundColor: 'white',
              height: 150,
              width: 170,
              marginTop: '65%',
              marginLeft: '28%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
            }}>
            <TextInput
              placeholder="Playlist Name"
              onChangeText={setEditPlaylistName}
              value={editPlaylistName}
            />

            <Pressable
              style={{
                backgroundColor: '#1DB954',
                width: '50%',
                height: '20%',
                borderRadius: 5,
                padding: 5,
              }}
              onPress={() => editName(playlistName, editPlaylistName)}>
              <Text style={{textAlign: 'center', color: 'white'}}>Done</Text>
            </Pressable>
          </View>
        </Modal>
        <View style={styles.playlist}>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Item name={item.name} />
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                style={{backgroundColor: 'green', padding: 10}}
                onPress={() => {
                  removePlaylist(item.name);
                }}>
                <Icon color="#1DB954" name="trash" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{backgroundColor: 'green', padding: 10}}
                onPress={() => {
                  console.log('name1 ', item.name);
                  setPlaylistName(item.name);
                  console.log('playlist name: ', playlistName);
                  setModalVisible(!modalVisible);

                  // name2 = item.name;
                  // console.log('name2: ', name2);
                  // editName(item.name, editPlaylistName);
                }}>
                <Icon color="#1DB954" name="edit" size={20} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const updateToast = () => {
    ToastAndroid.show('Playlist Name has been updated!', ToastAndroid.SHORT);
  };

  const deleteToast = () => {
    ToastAndroid.show('Playlist deleted!', ToastAndroid.SHORT);
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
      {/* <Button title="create" onPress={createPlaylist} /> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={createPlaylist} style={styles.button}>
          <Text style={{textAlign: 'center'}}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* <Button title="test" onPress={test} /> */}

      <FlatList data={playlistList} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'red',
  },
  modalView: {
    backgroundColor: 'red',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
  playlist: {
    backgroundColor: '#bababa',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },

  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    width: '25%',
    borderRadius: 10,
  },

  buttonContainer: {
    alignItems: 'center',
  },

  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '25%',
  },
});
