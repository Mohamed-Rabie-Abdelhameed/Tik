import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { getTasks, deleteTask } from "./firebase";

const TaskListScreen = () => {
  const route = useRoute();
  const group = route.params.group;
  const newTask = route.params.newTask;
  const navigation = useNavigation();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const tasksData = await getTasks(group);
      setTasks(tasksData);
    }
    fetchTasks();
  }, [newTask]);

  const handleNewTask = () => {
    navigation.navigate("CreateTask", { group });
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId, group);
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.name} Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.newTaskButton} onPress={handleNewTask}>
        <Text style={styles.buttonText}>Create New Task</Text>
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
  taskItem: {
    backgroundColor: "#f2f3f5",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  newTaskButton: {
    backgroundColor: "black",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TaskListScreen;
