import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { fetchHouses } from '../database/db';
import { UserContext } from '../context/UserContext';

type HousesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Houses'>;
type HousesScreenRouteProp = RouteProp<RootStackParamList, 'Houses'>;

type HousesScreenProps = {
  navigation: HousesScreenNavigationProp;
  route: HousesScreenRouteProp;
};

const HousesScreen: React.FC<HousesScreenProps> = ({ navigation, route }) => {
  const [houses, setHouses] = useState([]);
  const { userId } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const data = await fetchHouses(userId);
      setHouses(data);
    } catch (error) {
      console.error('Error fetching houses:', error);
      Alert.alert('Error', 'Failed to fetch houses.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <ScrollView className="bg-blue-800 flex-1">
      <View className="m-4 p-8 rounded-lg bg-blue-900">
        <Text className="text-white text-center mb-4 text-lg">Houses</Text>
        {houses.map((house, index) => (
          <TouchableOpacity
          key={index}
          className="bg-blue-700 p-4 rounded mb-4"
          onPress={() => navigation.navigate('Animals', { houseId: house.id })}
        >
          <Text className="text-white">Name: {house.name}</Text>
          <Text className="text-white">Address: {house.address}</Text>
          <Text className="text-white">House ID: {house.houseId}</Text>
          <Text className="text-white">House Password: {house.housePassword}</Text>
        </TouchableOpacity>
        ))}
        <TouchableOpacity
          className="bg-green-500 p-4 rounded mb-4"
          onPress={() => navigation.navigate('AddHouse', { onHouseAdded: fetchData })}
        >
          <Text className="text-center text-white text-lg">Add House</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-4 rounded"
          onPress={() => navigation.navigate('AddHouseById', { onHouseAdded: fetchData })}
        >
          <Text className="text-center text-white text-lg">Add House by ID</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HousesScreen;
