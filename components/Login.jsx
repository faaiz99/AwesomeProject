import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { authorize, refresh } from 'react-native-app-auth';

const Login = ({ navigation }) => {

  return (
    <View>
      <Text>Login</Text>
      <Button title='Login' onPress={()=>navigation.navigate('Root')} />
      
    </View>
  )
}

export default Login