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
import { addHouseById } from "../database/db";
import { UserContext } from "../context/UserContext";

type AddHouseByIdScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddHouseById"
>;
type AddHouseByIdScreenRouteProp = RouteProp<
  RootStackParamList,
  "AddHouseById"
>;

type AddHouseByIdScreenProps = {
  navigation: AddHouseByIdScreenNavigationProp;
  route: AddHouseByIdScreenRouteProp;
};

const AddHouseByIdScreen: React.FC<AddHouseByIdScreenProps> = ({
  navigation,
}) => {
  const [houseId, setHouseId] = useState("");
  const [housePassword, setHousePassword] = useState("");
  const { userId } = React.useContext(UserContext);

  const handleAddHouseById = () => {
    addHouseById(houseId, housePassword, userId)
      .then(() => {
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
      <View className="m-4 p-8 rounded-lg bg-blue-900">
        <TextInput
          className="text-white mb-4 bg-blue-700 p-4 rounded text-lg"
          placeholder="House ID"
          placeholderTextColor="white"
          onChangeText={setHouseId}
        />
        <TextInput
          className="text-white mb-4 bg-blue-700 p-4 rounded text-lg"
          placeholder="House Password"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText={setHousePassword}
        />
        <TouchableOpacity
          className="bg-green-500 p-4 rounded"
          onPress={handleAddHouseById}
        >
          <Text className="text-center text-white text-lg">Add House</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddHouseByIdScreen;
