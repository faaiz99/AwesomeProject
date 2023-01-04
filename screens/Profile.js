import storage, {
  firebase,
} from '@react-native-firebase/storage';

import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import auth from '@react-native-firebase/auth';

export default function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const updateState = () => {
    setIsEditable(!isEditable);
  };
  const [imageUrl, setImageUrl] = useState();
  const [username, setusername] = useState('');

  useEffect(() => {
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

  let user1 = auth().currentUser;
  const reference = storage().ref(user1.email);
  const openDocument = async () => {
    result = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      allowMultiSelection: true,
      copyTo: 'cachesDirectory',
    });

    const response = await fetch(result.uri);
    console.log('response: ', response);
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
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          height="20"
          width="20"
          style={{ marginLeft: '8%', marginTop: '7%' }}
          source={require('../assets/images/back.png')}></Image>
        <TouchableOpacity onPress={() => setShouldShow(true)}>
          <ImageBackground
            onLoadStarts={() => {
              return <ActivityIndicator />;
            }}
            style={{
              height: 200,
              width: 200,
              marginTop: '5%',
              marginLeft: '11%',
            }}
            imageStyle={{ borderRadius: 100 }}
            source={{
              uri: imageUrl,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#ededeb',
                alignSelf: 'center',
                width: '60%',
                borderRadius: 10,
                margin: '50%',
                marginBottom: '0%',
              }}
              onPress={() => openDocument()}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '500',
                  color: 'black',
                  fontSize: 18,
                }}>
                Choose a picture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#ededeb',
                alignSelf: 'center',
                width: '70%',
                borderRadius: 10,
                margin: '25%',
                marginTop: '5%',
              }}
              onPress={() => uploadPicture()}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '500',
                  color: 'black',
                  fontSize: 18,
                }}>
                Upload the Picture
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          color: 'white',
          borderRadius: 20,
          padding: 5,
          margin: 30,
          marginTop: '10%',
          marginBottom: 0,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            marginLeft: 13,
            fontSize: 20,
          }}>
          Username:
        </Text>

        <TouchableOpacity onPress={updateState}>
          <TextInput
            placeholder={isEditable ? 'Enter a new Username' : ''}
            underlineColorAndroid="transparent"
            style={{
              borderColor: isEditable ? 'black' : 'red',
              Color: isEditable ? 'black' : 'red',
              backgroundColor: 'grey',
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
      <TouchableOpacity
        style={{
          backgroundColor: 'brown',
          alignSelf: 'center',
          padding: 5,
          marginTop: '5%',
          borderRadius: 10,
        }}
        onPress={() => AddUsername()}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 20,
            padding: 10,
          }}>
          Update Username
        </Text>
      </TouchableOpacity>
    </View>
  );
}
