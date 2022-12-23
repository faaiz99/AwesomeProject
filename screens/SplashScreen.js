import {View,ImageBackground } from 'react-native';
import auth from "@react-native-firebase/auth";
import { useEffect } from 'react';
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      // Check if currentUser is set or not
      // If not then send for Authentication
      // else send to Home Screen
      navigation.replace(
        auth().currentUser ? "Root" : "Login"
      );
    }, 1000);
  }, []);
  return (
    <View style={{ backgroundColor: '#1b1413',height:'100%',width:'100%' }}>
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
    </View>
  );
};
export default SplashScreen;
