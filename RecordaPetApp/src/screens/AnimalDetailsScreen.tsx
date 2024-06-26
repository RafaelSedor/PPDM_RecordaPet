import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { fetchFeedings, addFeeding } from '../database/db';

type AnimalDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AnimalDetails'>;
type AnimalDetailsScreenRouteProp = RouteProp<RootStackParamList, 'AnimalDetails'>;

type AnimalDetailsScreenProps = {
  navigation: AnimalDetailsScreenNavigationProp;
  route: AnimalDetailsScreenRouteProp;
};

const AnimalDetailsScreen: React.FC<AnimalDetailsScreenProps> = ({ navigation, route }) => {
  const { animalId } = route.params;
  const [feedings, setFeedings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeedings(animalId);
        setFeedings(data);
      } catch (error) {
        console.error('Error fetching feedings:', error);
      }
    };

    fetchData();
  }, [animalId]);

  const handleAddFeeding = async (time: string) => {
    try {
      await addFeeding(time, 0, 0, 0, 0, animalId);
      const data = await fetchFeedings(animalId);
      setFeedings(data);
    } catch (error) {
      console.error('Error adding feeding:', error);
      Alert.alert('Error', 'There was an error adding the feeding.');
    }
  };

  return (
    <ScrollView className="bg-blue-800 flex-1">
      <View className="m-4 p-4 rounded-lg bg-blue-900">
        <Text className="text-white text-center mb-4">Feedings</Text>
        {feedings.map((feeding, index) => (
          <View key={index} className="bg-blue-700 p-2 rounded mb-2">
            <Text className="text-white">Time: {feeding.time}</Text>
            <Text className="text-white">Morning: {feeding.morning ? 'Yes' : 'No'}</Text>
            <Text className="text-white">Afternoon: {feeding.afternoon ? 'Yes' : 'No'}</Text>
            <Text className="text-white">Night: {feeding.night ? 'Yes' : 'No'}</Text>
            <Text className="text-white">Dawn: {feeding.dawn ? 'Yes' : 'No'}</Text>
          </View>
        ))}
        <TouchableOpacity
          className="bg-green-500 p-2 rounded mb-4"
          onPress={() => handleAddFeeding(new Date().toISOString())}
        >
          <Text className="text-center text-white">Add Feeding</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AnimalDetailsScreen;
