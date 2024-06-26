import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { insertAnimal } from '../database/db';
import { UserContext } from '../context/UserContext';

type AddAnimalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddAnimal'
>;
type AddAnimalScreenRouteProp = RouteProp<RootStackParamList, 'AddAnimal'>;

type AddAnimalScreenProps = {
  navigation: AddAnimalScreenNavigationProp;
  route: AddAnimalScreenRouteProp;
};

const AddAnimalScreen: React.FC<AddAnimalScreenProps> = ({
  navigation,
  route,
}) => {
  const { houseId, onAnimalAdded } = route.params;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const { userId } = useContext(UserContext);

  const handleAddAnimal = () => {
    insertAnimal(name, type, houseId)
      .then(() => {
        if (onAnimalAdded) {
          onAnimalAdded();
        }
        Alert.alert('Success', 'Animal added successfully.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      })
      .catch((error) => {
        console.error('Error inserting animal:', error);
        Alert.alert('Error', 'Failed to add animal.');
      });
  };

  return (
    <ScrollView className="bg-blue-800 flex-1">
      <View className="m-4 p-4 rounded-lg bg-blue-900">
        <TextInput
          className="text-white mb-4 bg-blue-800 p-2 rounded"
          placeholder="Nome"
          placeholderTextColor="white"
          onChangeText={setName}
        />
        <TextInput
          className="text-white mb-4 bg-blue-800 p-2 rounded"
          placeholder="Tipo"
          placeholderTextColor="white"
          onChangeText={setType}
        />
        <TouchableOpacity
          className="bg-green-500 p-2 rounded"
          onPress={handleAddAnimal}
        >
          <Text className="text-center text-white">Adicionar Animal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddAnimalScreen;
