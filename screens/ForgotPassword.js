
import React, { useState, useEffect} from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar
} from 'react-native';
import auth from "@react-native-firebase/auth";
import SystemNavigationBar from 'react-native-system-navigation-bar';


const ForgotPassword = ({ navigation }) => {

  const [getEmail, setEmail] = useState("")
  const resetPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(getEmail);
      alert('Password Reseted');
      navigation.navigate('Login')
      setEmail('')
    } catch (e) {

      Alert.alert(
        e.message
      );
    }
  }
  useEffect(()=>{
    SystemNavigationBar.setNavigationColor('black');
  })
  return (
    <View height="100%" width="100%" style={{ backgroundColor: 'black' }}>
          <StatusBar
        animated={true}
        backgroundColor="black" />
      <Image
        style={{
          width: '100%',
          height: '40%',
          marginBottom: '5%',
          borderRadius: 10,
          borderBottomWidth: 1,
          borderColor: '#00FF38',
        }}
        resizeMode="stretch"
        source={require('../pictures/forgotPassword.png')}></Image>

      <ScrollView>
        <View style={{ justifyContent: 'space-evenly' }}>
          <View
            style={{
              backgroundColor: 'gray',
              color: 'white',
              borderRadius: 10,
              padding: 5,
              margin: 30,
              marginTop: '10%',
              marginBottom: 0,
            }}>
            <TextInput placeholder='Email' style={{ borderColor: 'transparent' }} onChangeText={(e) => setEmail(e)} />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#1DB954',
              marginTop: 80,
              marginLeft: 60,
              marginRight: 60,
              padding: '4%',
              borderRadius: 10,
              width: '70%',
            }}
            onPress={() => resetPassword()}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: '900',
      
              }}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    backgroundColor: 'gray',
    width: '100%',
    marginTop: '7%',
    padding: '2%',
    borderRadius: 10,
    height: '24%',
  },
})
export default ForgotPassword;
