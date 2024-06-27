import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { fetchFeedings, insertFeeding, resetFeedings, updateFeeding } from '../database/db';

type AnimalDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AnimalDetails'>;
type AnimalDetailsScreenRouteProp = RouteProp<RootStackParamList, 'AnimalDetails'>;

type AnimalDetailsScreenProps = {
  navigation: AnimalDetailsScreenNavigationProp;
  route: AnimalDetailsScreenRouteProp;
};

const AnimalDetailsScreen: React.FC<AnimalDetailsScreenProps> = ({ navigation, route }) => {
  const { animalId } = route.params;
  const [feedings, setFeedings] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const data = await fetchFeedings(animalId);
      setFeedings(data);
    } catch (error) {
      console.error('Error fetching feedings:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [animalId]);

  const handleAddFeeding = async (time: string, period: string) => {
    try {
      const existingFeeding = feedings.find(feeding => feeding.time.split('T')[0] === time.split('T')[0]);
      
      if (existingFeeding) {
        const updatedFeeding = { ...existingFeeding, [period]: 1 };
        await updateFeeding(
          existingFeeding.id,
          existingFeeding.time,
          updatedFeeding.morning,
          updatedFeeding.afternoon,
          updatedFeeding.night,
          updatedFeeding.dawn,
          animalId
        );
      } else {
        const newFeeding = {
          time,
          morning: period === 'morning' ? 1 : 0,
          afternoon: period === 'afternoon' ? 1 : 0,
          night: period === 'night' ? 1 : 0,
          dawn: period === 'dawn' ? 1 : 0,
          animalId
        };
        await insertFeeding(
          newFeeding.time,
          newFeeding.morning,
          newFeeding.afternoon,
          newFeeding.night,
          newFeeding.dawn,
          animalId
        );
      }

      fetchData();
      Alert.alert('Success', `Feeding for ${period} marked successfully.`);
    } catch (error) {
      console.error('Error adding feeding:', error);
      Alert.alert('Error', 'There was an error adding the feeding.');
    }
  };

  return (
    <ScrollView className="bg-blue-800 flex-1">
      <View className="m-4 p-4 rounded-lg bg-blue-900">
        <Text className="text-white text-center mb-4 text-lg">Feedings</Text>
        {feedings.map((feeding, index) => (
          <View key={index} className="bg-blue-700 p-4 rounded mb-2">
            <Text className="text-white">Time: {feeding.time}</Text>
            <Text className="text-white">Morning: {feeding.morning ? 'Yes' : 'No'}</Text>
            <Text className="text-white">Afternoon: {feeding.afternoon ? 'Yes' : 'No'}</Text>
            <Text className="text-white">Night: {feeding.night ? 'Yes' : 'No'}</Text>
            <Text className="text-white">Dawn: {feeding.dawn ? 'Yes' : 'No'}</Text>
          </View>
        ))}
        <TouchableOpacity
          className="bg-green-500 p-4 rounded mb-4"
          onPress={() => handleAddFeeding(new Date().toISOString(), 'morning')}
        >
          <Text className="text-center text-white text-lg">Mark Morning Feeding</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-4 rounded mb-4"
          onPress={() => handleAddFeeding(new Date().toISOString(), 'afternoon')}
        >
          <Text className="text-center text-white text-lg">Mark Afternoon Feeding</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-4 rounded mb-4"
          onPress={() => handleAddFeeding(new Date().toISOString(), 'night')}
        >
          <Text className="text-center text-white text-lg">Mark Night Feeding</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-4 rounded mb-4"
          onPress={() => handleAddFeeding(new Date().toISOString(), 'dawn')}
        >
          <Text className="text-center text-white text-lg">Mark Dawn Feeding</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 p-4 rounded mb-4"
          onPress={() => resetFeedings(animalId)}
        >
          <Text className="text-center text-white text-lg">Reset Feedings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  
};

export default AnimalDetailsScreen;
