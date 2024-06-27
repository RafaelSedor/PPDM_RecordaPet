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

  const handleLogin = async () => {
    if (!username || !password) {
      console.error('Username or Password is missing');
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }
  
    console.log(`Tentando logar com username: ${username} e password: ${password}`);
  
    try {
      const data = await loginUser(username, password);
      console.log(`Data = ${data}`);
      if (data && data.id) {
        console.log('Login successful, user id:', data.id);
        setUserId(data.id);
        Alert.alert('Login Successful', 'You have logged in successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('Houses') },
        ]);
      } else {
        console.error('Invalid response from server:', data);
        Alert.alert('Error', 'Invalid response from server.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Invalid credentials or server error.');
    }
  };
  
  return (
    <View className="bg-blue-800 flex-1 justify-center items-center">
      <View className="bg-blue-900 p-8 rounded-lg w-4/5">
        <TextInput
          className="text-white mb-4 bg-blue-700 p-4 rounded text-lg"
          placeholder="Username"
          placeholderTextColor="white"
          onChangeText={setUsername}
        />
        <TextInput
          className="text-white mb-4 bg-blue-700 p-4 rounded text-lg"
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity
          className="bg-green-500 p-4 rounded mb-4"
          onPress={handleLogin}
        >
          <Text className="text-center text-white text-lg">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-center text-white text-lg">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
