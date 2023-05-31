import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import DecibelScreen from './DecibelScreen.js';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'Decibel') {
        iconName = 'sound';
      }

      return <AntDesign name={iconName} size={size} color={color} />;
      },
      })}
      tabBarActiveTintColor="tomato"
      tabBarInactiveTintColor="gray"
      tabBarStyle={{
        display: 'flex',
      }}
      >

        <Tab.Screen name="Decibel" component={DecibelScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

