import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { createTask } from "./firebase";

const CreateTaskScreen = ({ navigation }) => {
  const route = useRoute();
  const group = route.params.group;
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState(null);

  const handleCreateTask = async () => {
    if (taskName.trim() === "") {
      setError("Task name cannot be empty");
      return;
    }
    setError(null);

    await createTask(taskName, group);
    navigation.navigate("TaskList", { group, newTask: taskName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Task for {group.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
        <Text style={styles.buttonText}>Create Task</Text>
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
  errorText: {
    color: "red",
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

export default CreateTaskScreen;
