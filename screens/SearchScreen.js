import * as React from 'react';
import {
  TextInput,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';
const PlaylistScreen = ({ navigation }) => {
  return (
    <ScrollView style={{backgroundColor:'#1b1413'}}>
       <StatusBar
        animated={true}
        backgroundColor="#191414"/>
              <TextInput
        style={styles.search}
        placeholder="Artists,songs"
      />
    </ScrollView>
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
