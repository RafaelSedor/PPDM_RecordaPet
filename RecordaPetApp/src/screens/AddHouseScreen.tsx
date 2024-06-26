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

const AddHouseScreen: React.FC<AddHouseScreenProps> = ({
  navigation,
  route,
}) => {
  const { onHouseAdded } = route.params;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const { userId } = React.useContext(UserContext);

  const handleAddHouse = () => {
    insertHouse(name, address, userId)
      .then(() => {
        if (onHouseAdded) {
          onHouseAdded();
        }
        Alert.alert("Casa adicionada!", "A casa foi adicionada com sucesso.", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível adicionar a casa.");
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
          placeholder="Endereço"
          placeholderTextColor="white"
          onChangeText={setAddress}
        />
        <TouchableOpacity
          className="bg-green-500 p-2 rounded"
          onPress={handleAddHouse}
        >
          <Text className="text-center text-white">Adicionar Casa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddHouseScreen;
