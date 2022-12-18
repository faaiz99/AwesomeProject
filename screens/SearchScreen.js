import * as React from 'react';
// import { Divider } from 'react-native-elements';
import { MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';

{/* <Divider style={{ backgroundColor: 'blue' }} />; */}
const PlaylistScreen = ({ navigation }) => {
  return (
    <ScrollView style={{backgroundColor:'#1b1413'}}>
      <Text
        style={{ margin: 20, marginTop: 50, fontWeight: 'bold', fontSize: 20 ,color:'white'}}>
        Search
      </Text>
      
      <TextInput
        style={{
          color: '#f6f6f6',
          backgroundColor: '#a1a1a1',
          borderColor: '#a1a1a1',
          borderRadius: 5,
          marginLeft: 20,
          marginRight: 20,
          padding: 15,
        }}
        placeholder="Artists,songs"
      />
      <Text style={{ margin: 20, fontWeight: '700', fontSize: 14 ,color:'white'}}>
        Your Top Genres
      </Text>
        <View style={{ flexDirection: 'row' ,justifyContent:'space-evenly'}}>
        
          <TouchableOpacity>
            <ImageBackground
              style={{
                width: 175,
                height: 100,
              }}
              resizeMode="cover"
              source={{
                uri: 'https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rhorizontal.w700.jpg',
              }}>
              <Text
                style={{
                  fontWeight: 'bolder',
                  marginTop: 13,
                  marginLeft: 10,
                  color: 'white',
                }}>
                Pop
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageBackground
              style={{
                width: 175,
                height: 100,         
              }}
              resizeMode="cover"
              source={{
                uri: 'https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rhorizontal.w700.jpg',
              }}>
              <Text
                style={{
                  fontWeight: 'bolder',
                  marginTop: 13,
                  marginLeft: 10,
                  color: 'white',
                }}>
                Bollywood
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      <Text style={{ margin: 20, fontWeight: '700', fontSize: 14,color:'white' }}>
        Browse All
      </Text>

        <View style={{ flexDirection: 'row' ,justifyContent:'space-evenly'}}>
        
          <TouchableOpacity>
            <ImageBackground
              style={{
                width: 175,
                height: 100,
              }}
              resizeMode="cover"
              source={{
                uri: 'https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rhorizontal.w700.jpg',
              }}>
              <Text
                style={{
                  fontWeight: 'bolder',
                  marginTop: 13,
                  marginLeft: 10,
                  color: 'white',
                }}>
                Pop
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageBackground
              style={{
                width: 175,
                height: 100,         
              }}
              resizeMode="cover"
              source={{
                uri: 'https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rhorizontal.w700.jpg',
              }}>
              <Text
                style={{
                  fontWeight: 'bolder',
                  marginTop: 13,
                  marginLeft: 10,
                  color: 'white',
                }}>
                Bollywood
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row',justifyContent:'space-evenly' }}>
          <TouchableOpacity>
            <ImageBackground
              style={{
                width: 175,
                height: 100,
                marginTop: 20,
              }}
              resizeMode="cover"
              source={{
                uri: 'https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rhorizontal.w700.jpg',
              }}>
              <Text
                style={{
                  fontWeight: 'bolder',
                  marginTop: 13,
                  marginLeft: 10,
                  color: 'white',
                }}>
                Pop
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageBackground
              style={{
                width: 175,
                height: 100,
                marginTop: 20,
              }}
              resizeMode="cover"
              source={{
                uri: 'https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rhorizontal.w700.jpg',
              }}>
              <Text
                style={{
                  fontWeight: 'bolder',
                  marginTop: 13,
                  marginLeft: 10,
                  color: 'white',
                }}>
                Bollywood
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row',justifyContent:'space-evenly' }}>
          <TouchableOpacity>
            <ImageBackground
              style={{
                width: 175,
                height: 100,
                marginTop: 20,
              }}
              resizeMode="cover"
              source={{
                uri: 'https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rhorizontal.w700.jpg',
              }}>
              <Text
                style={{
                  fontWeight: 'bolder',
                  marginTop: 13,
                  marginLeft: 10,
                  color: 'white',
                }}>
                Pop
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity >
            <ImageBackground
              style={{
                width: 175,
                height: 100,
                marginTop: 20,
                marginBottom:20
              }}
              resizeMode="cover"
              source={{
                uri: 'https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rhorizontal.w700.jpg',
              }}>
              <Text
                style={{
                  fontWeight: 'bolder',
                  marginTop: 13,
                  marginLeft: 10,
                  color: 'white',
                }}>
                Bollywood
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

    </ScrollView>
  );
};
export default PlaylistScreen;
