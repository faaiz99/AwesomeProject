
import { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet
} from 'react-native';
import storage, { firebase } from '@react-native-firebase/storage';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import DocumentPicker from 'react-native-document-picker';
import auth from '@react-native-firebase/auth';


export default function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [username, setusername] = useState('');
  const [pathUpload, setpathUpload] = useState('')
  let user1 = auth().currentUser;
  useEffect(() => {
    SystemNavigationBar.setNavigationColor('black');
    const func = async () => {
      const ref = firebase.storage().ref(user1.email);
      const url = await ref.getDownloadURL();
      setImageUrl(url);
      console.log(imageUrl);
    };
    func();
  }, []);
  useEffect(() => {
    SystemNavigationBar.setNavigationColor('black');
  })
  let result;
  const updateState = () => {
    setIsEditable(!isEditable);
  };
  const reference = storage().ref(user1.email);
  const openDocument = async () => {
    result = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      allowMultiSelection: true,
      copyTo: 'cachesDirectory',
    });

    const response = await fetch(result.uri);
    console.log('response: ', response);
    setpathUpload(response)
    const file = await response.blob([response.value], {
      type: 'jpg/png/jpeg',
    });

    try {
      // Upload Blob file to Firebase
      const snapshot = uploadBytes(reference, file, 'blob').then(snapshot => {
        alert('Picture uploaded successfully');
      });
    } catch (error) {
      console.log(error);
    }
  };
  const uploadPicture = async () => {
    // path to existing file on filesystem
    console.log('Path', result[0].uri);

    const pathToFile = result[0].fileCopyUri;
    console.log('pathtofile: ', pathToFile);
   
    // uploads file
    await reference.putFile(pathToFile);
    const ref = firebase.storage().ref(user1.email);
    const url = await ref.getDownloadURL();
    setImageUrl(url);
  };
  const AddUsername = async () => {
    if (username && username.length > 0) {
      const update = {
        displayName: username,
      };
      console.log(update.displayName);
      await firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          console.log('success');
        });
      setusername('');
    }
  };
  return (
    <View
      style={styles.container}>
      <StatusBar animated={true} backgroundColor="black" />
      <View style={styles.imageContainer}>
        <Image
          onLoadStarts={() => { return <ActivityIndicator color="white" />; }}
          style={styles.displayPicture}
          source={{
            uri: imageUrl,
          }}>
        </Image>
      </View>
      <Text style={{ marginTop:10,textAlign: 'center', color: "white", fontWeight: "900", fontSize:20 }} >Username: {user1.displayName}</Text>
      <View
        style={{
          alignSelf:"center",
          backgroundColor: '#bababa',
          color: 'white',
          borderRadius: 10,
          width:"80%",
          marginTop: '3%',
        }}>
        <TouchableOpacity onPress={updateState}>
          <TextInput
            placeholder={isEditable ? 'Enter a new Username' : ''}
            underlineColorAndroid="transparent"
            style={{
              borderColor: isEditable ? 'black' : 'red',
              Color: isEditable ? 'black' : 'red',
              backgroundColor: ' #bababa',
              fontSize: 16,
              margin: 10,
              marginBottom: 0,
              marginTop: 0,
            }}
            onChangeText={username => setusername(username)}
            editable={isEditable}>
            {user1.displayName}
          </TextInput>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 50 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#1DB954',
            borderRadius: 10,
            width: '50%',
            padding:10
          }}
          onPress={() => AddUsername()}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Save
          </Text>
        </TouchableOpacity>

      </View>
      <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#1DB954',
          alignSelf: 'center',
          width: '50%',
          padding:10,
          borderRadius: 10,
          marginTop:"20%"

        }}
        onPress={() => openDocument()}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 20,
          }}>
          Choose picture
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#1DB954',
          alignSelf: 'center',
          width: '50%',
          borderRadius: 10,
          padding:10,
          marginTop:"20%"
        }}
        onPress={() => uploadPicture()}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 20,
          }}>
          Upload Picture
        </Text>     
      </TouchableOpacity>
      {/* <Image
         style={{height:100, width:100}}
         source={{
           uri: pathUpload,
         }}>
       </Image> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: "center"
  },
  displayPicture: {
    height: 200,
    width: 200,
  },
})
