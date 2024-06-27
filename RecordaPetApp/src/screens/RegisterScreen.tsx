import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { registerUser } from '../database/db';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    try {
      await registerUser(username, password);
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to register user');
    }
  };

  return (
    <ScrollView className="bg-blue-800 flex-1">
      <View className="m-4 p-6 rounded-lg bg-blue-900">
        <TextInput
          className="text-white mb-4 bg-blue-700 p-4 rounded text-lg"
          placeholder="Nome"
          placeholderTextColor="white"
          onChangeText={setUsername}
        />
        <TextInput
          className="text-white mb-4 bg-blue-700 p-4 rounded text-lg"
          placeholder="Senha"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TextInput
          className="text-white mb-6 bg-blue-700 p-4 rounded text-lg"
          placeholder="Confirmação de senha"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity className="bg-green-500 p-4 rounded" onPress={handleRegister}>
          <Text className="text-center text-white text-lg">Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

};

export default RegisterScreen;
