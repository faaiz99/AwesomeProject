
import React from 'react'
import {Text, View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './Search';
function Home({navigation, route}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

function Library({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Library</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

const Root = ({navigation, route}) => {
  const {accessT, refreshT} = route.params
  console.log(route.params)
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  )
}

export default Root