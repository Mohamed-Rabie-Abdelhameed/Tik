import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { getGroups, deleteGroup, getNumTasks } from "./firebase";

const GroupListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const newGroup = route.params?.newGroup;

  useEffect(() => {
    async function fetchGroups() {
      const groupsData = await getGroups();
      const updatedGroups = await Promise.all(
        groupsData.map(async (group) => {
          const numTasks = await getNumTasks(group);
          group.numTasks = numTasks;
          return group;
        })
      );
      setGroups(updatedGroups);
    }
    fetchGroups();
  }, [newGroup]);

  const handleGroupPress = (group) => {
    navigation.navigate("TaskList", { group });
  };

  const handleNewGroup = () => {
    navigation.navigate("CreateGroup");
  };

  const handleDeleteGroup = async (group) => {
    await deleteGroup(group);
    const updatedGroups = await getGroups();
    setGroups(updatedGroups);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups</Text>
      <FlatList
        data={groups}
        keyExtractor={(group) => group.id}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <TouchableOpacity onPress={() => handleGroupPress(item)}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.numTasks}>{item.numTasks} Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteGroup(item)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.newGroupButton} onPress={handleNewGroup}>
        <Text style={styles.buttonText}>Create New Group</Text>
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
  groupItem: {
    backgroundColor: "#f2f3f5",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupName: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  numTasks: {
    fontSize: 14,
    color: "gray",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  newGroupButton: {
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

export default GroupListScreen;
