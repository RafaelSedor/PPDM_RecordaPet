import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { fetchHouses } from '../database/db';

type HousesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Houses'>;
type HousesScreenRouteProp = RouteProp<RootStackParamList, 'Houses'>;

type HousesScreenProps = {
  navigation: HousesScreenNavigationProp;
  route: HousesScreenRouteProp;
};

const HousesScreen: React.FC<HousesScreenProps> = ({ navigation, route }) => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHouses();
        setHouses(data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView className="bg-blue-800 flex-1">
      <View className="m-4 p-4 rounded-lg bg-blue-900">
        <Text className="text-white text-center mb-4">Houses</Text>
        {houses.map((house, index) => (
          <View key={index} className="bg-blue-700 p-2 rounded mb-2">
            <Text className="text-white">Name: {house.name}</Text>
            <Text className="text-white">Address: {house.address}</Text>
          </View>
        ))}
        <TouchableOpacity
          className="bg-green-500 p-2 rounded mb-4"
          onPress={() => navigation.navigate('AddHouse', { onHouseAdded: fetchData })}
        >
          <Text className="text-center text-white">Add House</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HousesScreen;
