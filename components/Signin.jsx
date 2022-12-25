import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
  StatusBar
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import SystemNavigationBar from 'react-native-system-navigation-bar';
SystemNavigationBar.setNavigationColor('black');

const Stack = createNativeStackNavigator();

export default Signin = ({ navigation }) => {
  const [getEmail, setEmail] = useState("")
  const [getPassword, setPassword] = useState("")
  const [visible, setVisible] = useState(true)

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
    <View style={{ flexDirection: 'column' }}>
                 <StatusBar
        animated={true}
        backgroundColor="black"/>
      <View style={{ backgroundColor: 'orange', height: '35%' }}>
        <ImageBackground
          style={{ flex: 1, height: '100%', width: '100%' }}
          source={require('../assets/images/Header.jpg')}>
          <View style={styles.textView}>
            <Text style={{ color: 'white', fontSize: 30, fontWeight: "900" }}>Sign In</Text>
            <Text style={{ color: 'white' }}>
              Welcome Back! It's time to listen what
            </Text>
            <Text style={{ color: 'white' }}>
              you want and enjoy the music...
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.container1}>
        <View style={styles.container3}>
          <View style={{ width: '100%' }}>
            <View style={styles.box}>
              <TouchableOpacity>
                {/* <Text>Email Address:</Text> */}
                <TextInput
                  placeholder="Email Address:"
                  onChangeText={e => setEmail(e)}></TextInput>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity>
                <TextInput
                  placeholder="Password:"
                  secureTextEntry={visible}
                  onChangeText={e => setPassword(e)}></TextInput>
                <Icon name='eye' size={15} color="black" onPress={()=>setVisible(!visible)} style={{
                  position: 'absolute',
                  right: 20,
                  marginTop:15
                }} />
              </TouchableOpacity>
            </View>
            <View style={styles.text}>
              <Text style={{ color: '#1DB954' }}>Forget Password?</Text>
            </View>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={loginUser}>
              <Text style={{ textAlign: 'center', color: "white", fontWeight: "900" }}>Sign in</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ color: 'white' }}>Create an account? </Text>
            <TouchableOpacity onPress={() =>
              navigation.navigate('Signup')}>
              <Text style={{ color: '#1DB954', fontWeight: "bold" }}> Sign up</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: '1%',
  },

  container2: {
    display: 'flex',
    backgroundColor: 'red',
  },

  container3: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    // backgroundColor: 'pink',
  },

  box: {
    backgroundColor: 'gray',
    width: '100%',
    marginTop: '7%',
    padding: '2%',
    borderRadius: 10,
    height: '24%',
  },

  text: {
    alignItems: 'flex-end',
    marginTop: '2%',
  },

  button: {
    backgroundColor: '#1DB954',
    padding: '4%',
    borderRadius: 10,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textView: {
    position: 'absolute',
    justifyContent: 'flex-end',
    marginLeft: '5%',
    marginBottom: '2%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
