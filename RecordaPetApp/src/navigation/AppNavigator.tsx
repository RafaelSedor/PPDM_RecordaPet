import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import AddAnimalScreen from '../screens/AddAnimalScreen';
import AddHouseScreen from '../screens/AddHouseScreen';
import AddHouseByIdScreen from '../screens/AddHouseByIdScreen';
import AnimalDetailsScreen from '../screens/AnimalDetailsScreen';
import AnimalsScreen from '../screens/AnimalsScreen';
import HousesScreen from '../screens/HousesScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LogoutButton from '../components/LogoutButton';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Houses"
          component={HousesScreen}
          options={{
            headerRight: () => <LogoutButton />
          }}
        />
        <Stack.Screen
          name="Animals"
          component={AnimalsScreen}
          options={{
            headerRight: () => <LogoutButton />
          }}
        />
        <Stack.Screen
          name="AnimalDetails"
          component={AnimalDetailsScreen}
          options={{
            headerRight: () => <LogoutButton />
          }}
        />
        <Stack.Screen
          name="AddHouse"
          component={AddHouseScreen}
          options={{
            headerRight: () => <LogoutButton />
          }}
        />
        <Stack.Screen
          name="AddAnimal"
          component={AddAnimalScreen}
          options={{
            headerRight: () => <LogoutButton />
          }}
        />
        <Stack.Screen
          name="AddHouseById"
          component={AddHouseByIdScreen}
          options={{
            headerRight: () => <LogoutButton />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

