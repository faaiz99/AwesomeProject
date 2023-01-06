
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Library from './Library';
import Home from './Home';
import SearchScreen from '../screens/SearchScreen'
import Icon from 'react-native-vector-icons/FontAwesome';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Button, StyleSheet } from 'react-native';

function MyTabBar({ navigation }) {
  return (
    <Button
      title="Player"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('SomeScreen');
      }}
    />
  );
}
const Tab = createBottomTabNavigator();
const Root = ({ navigation, route }) => {
const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    SystemNavigationBar.setNavigationColor('black');
  }, [])

  return (

    <Tab.Navigator screenOptions={({ route }) => ({
      headerStyle: {
        backgroundColor: '#191414',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '900',
      },
      tabBarStyle: { backgroundColor: 'black', padding: 5 },
      tabBarIcon: ({ focused, color }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search';
        } else if (route.name === 'Library') {
          iconName = focused ? 'list' : 'list';
        }
        return <Icon name={iconName} size={30} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#5A5A5A',
    })}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  floatingMusic: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  }
})
export default Root