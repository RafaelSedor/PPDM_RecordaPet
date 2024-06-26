import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import AddAnimalScreen from '../screens/AddAnimalScreen';
import AddFeedingScreen from '../screens/AddFeedingScreen';
import AddHouseScreen from '../screens/AddHouseScreen';
import AnimalDetailsScreen from '../screens/AnimalDetailsScreen';
import AnimalsScreen from '../screens/AnimalsScreen';
import FeedingsScreen from '../screens/FeedingsScreen';
import HousesScreen from '../screens/HousesScreen';
import LoginScreen from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogoutScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Houses" component={HousesScreen} />
        <Stack.Screen name="Animals" component={AnimalsScreen} />
        <Stack.Screen name="AnimalDetails" component={AnimalDetailsScreen} />
        <Stack.Screen name="Feedings" component={FeedingsScreen} />
        <Stack.Screen name="AddHouse" component={AddHouseScreen} />
        <Stack.Screen name="AddAnimal" component={AddAnimalScreen} />
        <Stack.Screen name="AddFeeding" component={AddFeedingScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
