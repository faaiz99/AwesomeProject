import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Provider as PaperProvide,
  Appbar
} from 'react-native';
import {useState} from 'react';



const DATA = [
  {
    index: '1',
    id: '23465433',
    title: 'Prisoner',
    number: '2,344,55',
  },
  {
    index: '2',
    id: '23465434',
    title: 'Prisoner',
    number: '2,344,55',
  },
  {
    index: '3',
    id: '23465435',
    title: 'Prisoner',
    number: '2,344,55',
  },
  {
    index: '4',
    id: '23465436',
    title: 'Prisoner',
    number: '2,344,55',
  },
  {
    index: '5',
    id: '23465437',
    title: 'Prisoner',
    number: '2,344,55',
  },
  
];

const Item = ({item, onPress, backgroundColor, textColor}) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.songs}>
        <Text style={{color: 'white'}}>{item.index}</Text>
        <View style={{marginLeft: '2%'}}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{item.title}</Text>
          <Text style={{color: 'gray'}}>{item.number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Library() {
  const [selectedId, setSelectedId] = useState('');

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? 'white' : 'black';
    const textColor = item.id === selectedId ? 'black' : 'white';
    // console.log(backgroundColor)
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        color={{textColor}}
      />
    );
  };

  return (
    <View>
      {/* <View style={{backgroundColor: 'orange', height: '20%'}}>
        <ImageBackground
          style={{flex: 1, height: '100%', width: '100%'}}
          source={require('../assets/images/Header.jpg')}>
          <View style={styles.textView}>
            <Text style={{color: 'white', fontSize: 30}}>
              Dance Mateen Dance
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.container1}>
        <View style={{padding: '6%', alignItems: 'center'}}>
          <Text style={{color: 'gray'}}>1,03,234 MONTHLY LISTENERS</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              SHUFFLE PLAY
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height:"32%"}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            Popular
          </Text>
          <SafeAreaView style={{height:"90%"}}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </View>
        <View >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            Artist's Pick
          </Text>
          <View style={{flexDirection:"row"}}>
            <View
              style={{height: '45%', width: '33%', backgroundColor: 'orange'}}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={require('../assets/images/Header.jpg')}></Image>
            </View>

            <View style={styles.artist}>
              <TouchableOpacity style={styles.button2}>
                <Text style={{textAlign: 'center'}}>New SONG out now!</Text>
              </TouchableOpacity>
              <Text style={{color: 'white', marginLeft:"8%"}}>Strawberry's Wake</Text>
            </View>
          </View>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  textView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
    marginBottom: '2%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  container1: {
    backgroundColor: 'black',
  },

  text: {
    color: 'white',
  },

  songs: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3%',
  },

  button: {
    backgroundColor: 'green',
    width: '60%',
    color: 'white',
    fontWeight: 'bold',
    padding: '3%',
    borderRadius: 20,
    margin: '3%',
  },

  button2: {
    backgroundColor: 'white',
    width: '80%',
    color: 'black',
    fontWeight: 'bold',
    padding: '2%',
    borderRadius: 20,
    margin: '5%',
  },

  artist: {
    flexDirection: 'column',
    // backgroundColor: "pink"
  },
});
