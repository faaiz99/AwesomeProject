import { View, Text, Button, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [getEmail, setEmail] = useState("")
  const [getPassword, setPassword] = useState("")
  const [visible, setVisible] = useState(true)
  const [authenticated, setAuthenticated] = useState(false);
  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(getEmail, getPassword)
      .then(() => {
        console.log('User account created & signed in!');
        setEmail("")
        setPassword("")
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  
  }
  const loginUser = () => {
    auth()
      .signInWithEmailAndPassword(getEmail, getPassword)
      .then(() => {
        setEmail("")
        setPassword("")
        console.log('User account created & signed in!');
        navigation.navigate("Root")
      })
      .catch(error => {
        console.error(error);
      });
  }


  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder='Email' onChangeText={(e) => setEmail(e)} />
      <TextInput placeholder='Password' secureTextEntry={true} onChangeText={(e) => setPassword(e)} />

      <Button title='Create User' onPress={createUser} />
      <Button title='Login' onPress={loginUser} />

    </View>
  )
}

export default Login