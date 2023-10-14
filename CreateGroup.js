import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createGroup } from "./firebase";

const CreateGroupScreen = () => {
  const [groupName, setGroupName] = useState("");
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  const handleCreateGroup = async () => {
    if (groupName.trim() === "") {
      setError("Group name cannot be empty");
      return;
    }
    setError(null);

    await createGroup(groupName);
    navigation.navigate("GroupList", { newGroup: groupName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Group</Text>
      <TextInput
        style={styles.input}
        placeholder="Group Name"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
        <Text style={styles.buttonText}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "black",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: "black",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateGroupScreen;
