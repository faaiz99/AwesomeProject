import * as React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import auth from "@react-native-firebase/auth";
import SystemNavigationBar from 'react-native-system-navigation-bar';



const LoginPage = ({ navigation }) => {
  React.useEffect(() => {
    SystemNavigationBar.setNavigationColor('black');
  })

  if (auth().currentUser) {
    navigation.replace("Root")
  }

  return (
    <View
      style={{
        backgroundColor: 'black',
        height: '100%',
        flexDirection: 'column',
      }}>
      <StatusBar
        animated={true}
        backgroundColor="#140c0b" />
      <Image style={styles.Logo} source={require('../assets/images/spotify.jpg')} />
      <Text style={{ textAlign: 'center', color: "white", fontWeight: "900", fontSize: 25 }}>Millons of songs </Text>
      <Text style={{ color: 'white', alignSelf: 'center', fontWeight: '900', fontSize: 25, marginBottom: '10%' }}>Free on Spotify.</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={{
          backgroundColor: '#1DB954',
          padding: 10,
          width: '80%',
          alignSelf: 'center',
          borderRadius: 30,
          marginBottom: '20%'
        }}>
        <Text
          style={{ alignSelf: 'center', fontWeight: 'bold', color: 'white', fontSize: 20 }}>
          Sign up free
        </Text>
      </TouchableOpacity>
      <Text style={{ color: 'grey', alignSelf: 'center', marginBottom: '5%', fontWeight: "bold" }}>
        Already have an Account?
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          backgroundColor: '#1DB954',
          padding: 10,
          width: '45%',
          alignSelf: 'center',
          borderRadius: 30,
        }}>
        <Text
          style={{ alignSelf: 'center', fontWeight: 'bold', color: 'white', fontSize: 20 }} >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  Logo: {
    width: 100,
    marginTop: '70%',
    alignSelf: 'center',
    height: 100,
    marginBottom: '10%'
  },
});

export default LoginPage;
