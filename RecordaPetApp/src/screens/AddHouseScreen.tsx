import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { insertHouse } from "../database/db";
import { UserContext } from "../context/UserContext";

type AddHouseScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddHouse"
>;
type AddHouseScreenRouteProp = RouteProp<RootStackParamList, "AddHouse">;

type AddHouseScreenProps = {
  navigation: AddHouseScreenNavigationProp;
  route: AddHouseScreenRouteProp;
};

const generateHouseId = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const generateHousePassword = () => {
  return Math.random().toString(36).slice(-8);
};

const AddHouseScreen: React.FC<AddHouseScreenProps> = ({
  navigation,
  route,
}) => {
  const { onHouseAdded } = route.params;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const { userId } = React.useContext(UserContext);
  const houseId = generateHouseId();
  const housePassword = generateHousePassword();

  const handleAddHouse = () => {
    insertHouse(name, address, userId, houseId, housePassword)
      .then(() => {
        if (onHouseAdded) {
          onHouseAdded();
        }
        Alert.alert(
          "Casa adicionada!",
          `A casa foi adicionada com sucesso.\nID: ${houseId}\nSenha: ${housePassword}`,
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível adicionar a casa.");
      });
  };

  return (
    <ScrollView className="bg-blue-800 flex-1">
      <View className="m-4 p-8 rounded-lg bg-blue-900">
        <TextInput
          className="text-white mb-4 bg-blue-700 p-4 rounded text-lg"
          placeholder="Nome"
          placeholderTextColor="white"
          onChangeText={setName}
        />
        <TextInput
          className="text-white mb-4 bg-blue-700 p-4 rounded text-lg"
          placeholder="Endereço"
          placeholderTextColor="white"
          onChangeText={setAddress}
        />
        <TouchableOpacity
          className="bg-green-500 p-4 rounded"
          onPress={handleAddHouse}
        >
          <Text className="text-center text-white text-lg">Adicionar Casa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddHouseScreen;
