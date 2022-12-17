import * as React from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: '#1b1413',height:'100%',width:'100%' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
      </TouchableOpacity>
    </View>
  );
};
export default SplashScreen;
