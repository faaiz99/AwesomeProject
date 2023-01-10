import {View,ImageBackground, StatusBar } from 'react-native';
import auth from "@react-native-firebase/auth";
import SystemNavigationBar from 'react-native-system-navigation-bar';

import { useEffect } from 'react';
const SplashScreen = ({ navigation }) => {
  SystemNavigationBar.setNavigationColor('#140c0b');
  useEffect(() => {
    setTimeout(() => {
      // Check if currentUser is set or not
      // If not then send for Authentication
      // else send to Home Screen
      navigation.replace(
        auth().currentUser ? "Root" : "Login Page"
      );
    }, 1000);
  }, []);
  return (
    <View style={{ backgroundColor: '#140c0b',height:'100%',width:'100%' }}>
        <ImageBackground
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: '80%',
            borderRadius: 20,
          }}
          resizeMode="contain"
          source={require('../assets/images/Spotify_App_Logo.svg.png')}
        />
        <StatusBar
        animated={true}
        backgroundColor="#140c0b"/>
    </View>
  );
};
export default SplashScreen;
