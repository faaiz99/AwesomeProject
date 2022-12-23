
import React, {useEffect} from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './Search';
import Library from './Library';
import Home from './Home';
import axios from "axios";
import SearchScreen from '../screens/SearchScreen'
import Icon from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const Root = ({ navigation, route }) => {


  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  )
}

export default Root