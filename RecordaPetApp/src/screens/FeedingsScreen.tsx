import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { fetchFeedings } from '../database/db';

type FeedingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feedings'>;
type FeedingsScreenRouteProp = RouteProp<RootStackParamList, 'Feedings'>;

type FeedingsScreenProps = {
  navigation: FeedingsScreenNavigationProp;
  route: FeedingsScreenRouteProp;
};

const FeedingsScreen: React.FC<FeedingsScreenProps> = ({ navigation, route }) => {
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
      </View>
    </ScrollView>
  );
};

export default FeedingsScreen;
