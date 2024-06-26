import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { UserContext } from '../context/UserContext';

type LogoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Logout'>;
type LogoutScreenRouteProp = RouteProp<RootStackParamList, 'Logout'>;

type LogoutScreenProps = {
  navigation: LogoutScreenNavigationProp;
  route: LogoutScreenRouteProp;
};

const LogoutScreen: React.FC<LogoutScreenProps> = ({ navigation, route }) => {
  const { setUserId } = useContext(UserContext);

  const handleLogout = () => {
    setUserId(null);
    Alert.alert('Logout Successful', 'You have logged out successfully.', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <View className="bg-blue-800 flex-1 justify-center items-center">
      <TouchableOpacity
        className="bg-red-500 p-2 rounded"
        onPress={handleLogout}
      >
        <Text className="text-center text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutScreen;
