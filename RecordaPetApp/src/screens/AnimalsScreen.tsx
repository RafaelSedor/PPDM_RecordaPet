import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { fetchAnimals } from '../database/db';

type AnimalsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Animals'>;
type AnimalsScreenRouteProp = RouteProp<RootStackParamList, 'Animals'>;

type AnimalsScreenProps = {
  navigation: AnimalsScreenNavigationProp;
  route: AnimalsScreenRouteProp;
};

const AnimalsScreen: React.FC<AnimalsScreenProps> = ({ navigation, route }) => {
  const { houseId } = route.params;
  const [animals, setAnimals] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const data = await fetchAnimals(houseId);
      setAnimals(data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [houseId]);

  return (
    <ScrollView className="bg-blue-800 flex-1">
      <View className="m-6 p-6 rounded-lg bg-blue-900">
        <Text className="text-white text-center mb-6 text-2xl">Animais</Text>
        {animals.map((animal, index) => (
          <TouchableOpacity
            key={index}
            className="bg-blue-700 p-4 rounded mb-4"
            onPress={() => navigation.navigate('AnimalDetails', { animalId: animal.id })}
          >
            <Text className="text-white text-lg">Name: {animal.name}</Text>
            <Text className="text-white text-lg">type: {animal.type}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          className="bg-green-500 p-4 rounded mb-4"
          onPress={() => navigation.navigate('AddAnimal', { houseId, onAnimalAdded: fetchData })}
        >
          <Text className="text-center text-white text-lg">Adicionar Animal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AnimalsScreen;
