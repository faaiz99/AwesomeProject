
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Library from './Library';
import Home from './Home';
import SearchScreen from '../screens/SearchScreen'
import Icon from 'react-native-vector-icons/FontAwesome';
import SystemNavigationBar from 'react-native-system-navigation-bar';




const Tab = createBottomTabNavigator();
const Root = ({ navigation, route }) => {
  useEffect(() => {
    SystemNavigationBar.setNavigationColor('black');

  }, [])

  return (

    <Tab.Navigator screenOptions={({ route }) => ({
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

        // You can return any component that you like here!
        return <Icon name={iconName} size={30} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#5A5A5A',
    })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  )
}

export default Root