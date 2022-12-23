import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
 

  return (
    <View>
      <Text>Login</Text>
      <Button title='Login' onPress={()=>navigation.navigate('Root')} />
    </View>
  )
}

export default Login