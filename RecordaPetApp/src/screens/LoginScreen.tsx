import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { loginUser } from '../database/db';
import { UserContext } from '../context/UserContext';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { setUserId } = userContext;

  const handleLogin = () => {
    loginUser(username, password, (error, data) => {
      if (error) {
        console.error('Error logging in:', error);
        Alert.alert('Error', 'Invalid credentials or server error.');
      } else if (data && data.id) {
        setUserId(data.id);
        Alert.alert('Login Successful', 'You have logged in successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('Houses') },
        ]);
      } else {
        Alert.alert('Error', 'Invalid response from server.');
      }
    });
  };

  return (
    <View className="bg-blue-800 flex-1 justify-center items-center">
      <View className="m-4 p-4 rounded-lg bg-blue-900">
        <TextInput
          className="text-white mb-4 bg-blue-800 p-2 rounded"
          placeholder="Username"
          placeholderTextColor="white"
          onChangeText={setUsername}
        />
        <TextInput
          className="text-white mb-4 bg-blue-800 p-2 rounded"
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity
          className="bg-green-500 p-2 rounded"
          onPress={handleLogin}
        >
          <Text className="text-center text-white">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-500 p-2 rounded mt-4"
          onPress={() => navigation.navigate('Register')}
        >
          <Text className="text-center text-white">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
