import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { authorize, refresh } from 'react-native-app-auth';
const config = {
    clientId: '0b55fed81b0a45368f4c3ccbc0929e5f', // available on the app page
    clientSecret: 'c7de955731514543844da21b34daf8b6', // click "show client secret" to see this
    redirectUrl: 'com.awesomeproject://oauth', // the redirect you defined after creating the app
    scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "streaming",
        "user-modify-playback-state",
        "user-read-email",
        "user-read-private",
      ], // the scopes you need to access
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };

const Login = ({navigation}) => {
const [accessToken, setAccessToken] = useState('');
const [refreshToken, setRefreshToken] = useState('');
async function onLogin(){
    // use the client to make the auth request and receive the authState
try {
    const result = await authorize(config);
    // result includes accessToken, accessTokenExpirationDate and refreshToken
    setAccessToken(result.accessToken)
    setRefreshToken(result.refreshToken)
    console.log(result.accessToken)
    navigation.navigate('Root', {
      aToken: accessToken,
      rToken: refreshToken
    })

  } catch (error) {
    console.log(error);
  }
}
async function onRefresh(){
    try {
        const result = await refresh(config, {
            refreshToken: refreshToken,  
        })
        console.log(result.refreshToken)
    }catch(error){
        console.log(error)
    }
   
}
  return (
    <View>
      <Text>Login</Text>
      <Button title='Login' onPress={onLogin}/>
      {/* <Button title='Refresh Token' onPress={onRefresh}/> */}
    </View>
  )
}

export default Login