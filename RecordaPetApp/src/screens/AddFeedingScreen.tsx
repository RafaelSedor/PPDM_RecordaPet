import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { insertFeeding } from "../database/db";

type AddFeedingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddFeeding"
>;
type AddFeedingScreenRouteProp = RouteProp<RootStackParamList, "AddFeeding">;

type AddFeedingScreenProps = {
  navigation: AddFeedingScreenNavigationProp;
  route: AddFeedingScreenRouteProp;
};

const AddFeedingScreen: React.FC<AddFeedingScreenProps> = ({
  navigation,
  route,
}) => {
  const { animalId, onFeedingAdded } = route.params;

  const handleAddFeeding = (time: string) => {
    let morning = 0,
      afternoon = 0,
      night = 0,
      dawn = 0;

    switch (time) {
      case "morning":
        morning = 1;
        break;
      case "afternoon":
        afternoon = 1;
        break;
      case "night":
        night = 1;
        break;
      case "dawn":
        dawn = 1;
        break;
    }

    insertFeeding(
      currentTime,
      morning,
      afternoon,
      night,
      dawn,
      animalId,
      (error, result) => {
        if (error) {
          console.error("Error inserting feeding:", error);
          Alert.alert("Error", "Failed to add feeding.");
        } else {
          if (onFeedingAdded) {
            onFeedingAdded();
          }
          Alert.alert("Success", "Feeding added successfully.", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        }
      }
    );
  };

  return (
    <ScrollView className="bg-blue-800 flex-1">
      <View className="m-4 p-4 rounded-lg bg-blue-900">
        <TouchableOpacity
          className="bg-green-500 p-2 rounded mb-4"
          onPress={() => handleAddFeeding("morning")}
        >
          <Text className="text-center text-white">Manhã</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-2 rounded mb-4"
          onPress={() => handleAddFeeding("afternoon")}
        >
          <Text className="text-center text-white">Tarde</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-2 rounded mb-4"
          onPress={() => handleAddFeeding("night")}
        >
          <Text className="text-center text-white">Noite</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-2 rounded mb-4"
          onPress={() => handleAddFeeding("dawn")}
        >
          <Text className="text-center text-white">Madrugada</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddFeedingScreen;
