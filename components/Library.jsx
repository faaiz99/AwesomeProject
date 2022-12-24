import { View, Text, Button, PermissionsAndroid } from 'react-native'
import React, {useState} from 'react'
import auth from '@react-native-firebase/auth';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import FilePicker from 'react-native-document-picker';

const Library = ({navigation, route}) => {
  const [song, setSong] = useState(null);
  const reference = storage().ref('song');


  //Get current user through authentication
  const user = auth.currentUser;
  let result
  const pickDocument = async () => {
     result = await FilePicker.pick({
      presentationStyle:'fullScreen',
      allowMultiSelection:true,
      copyTo:'cachesDirectory'
    })
    // Fetch the photo with it's local URI
    console.log(result);

    // const response = fetch(result.uri);

    // const file = new Blob(
    //   [response.value], {
    //     type: 'audio/mpeg'
    //   });
    // console.log('do we see this?');

    // try {
    //   //Create the file reference
    //   const storage = getStorage();
    //   const storageRef = ref(storage, `songs/${user.uid}/${result.name}`);

    //   // Upload Blob file to Firebase
    //   const snapshot = uploadBytes(storageRef, file, 'blob').then((snapshot) => {
    //     console.log('Uploaded a song to firebase storage!');
    //   });

    //   setSong(result.uri);
    // } catch (error) {
    //   console.log(error);
    // }

  }
  return (
    <View>
      <Text>Library</Text>
      <Button onPress={pickDocument} title="select"/>
      <Button
        title='upload'
        onPress={async () => {
          // path to existing file on filesystem
          console.log("Path", result[0].uri)
          const pathToFile = result[0].fileCopyUri;
          console.log(pathToFile)
          // uploads file
          await reference.putFile(pathToFile);
        }}
      />
    </View>
  )
}

export default Library