import React, { useContext } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

const LogoutButton: React.FC = () => {
  const { setUserId } = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    setUserId(null);
    Alert.alert("Logout Successful", "You have logged out successfully.", [
      {
        text: "OK",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
      <Text style={{ color: "red" }}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
