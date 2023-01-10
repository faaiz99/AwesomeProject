import {View, Text, Button, FlatList} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default Playlist = ({navigation, route}) => {
  const [playlistName, setPlaylistName] = useState('');
  const [songsArray, setSongsArray] = useState([]);
  const {name, songsQueue} = route.params;

  useEffect(() => {
    setPlaylistName(name);
    setSongsArray(songsQueue);
  });

  const storeData = () => {
    return <View> </View>;
  };

  const Item = ({name, path, mtime}) => {
    return (
      <View>
        <TouchableOpacity onPress={storeData}>
          <Text>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={{margin: 5}}>
        <TouchableOpacity>
          <Item name={item.title} path={item.url} mtime={item.timeAdded} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Button title="test playlist" onPress={test} />
      <Text style={{fontWeight: 'bold', fontSize: 20}}>
        Select songs to add in {playlistName}
      </Text>
      <FlatList data={songsArray} renderItem={renderItem} />
    </View>
  );
};
