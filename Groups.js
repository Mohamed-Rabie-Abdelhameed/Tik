import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getGroups } from "./firebase";

const GroupListScreen = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchGroups() {
      const groupsData = await getGroups();
      setGroups(groupsData);
    }
    fetchGroups();
  }, []);

  const handleGroupPress = (group) => {
    navigation.navigate("TaskList", { group });
  };

  const handleNewGroup = () => {
    navigation.navigate("CreateGroup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group List</Text>
      <FlatList
        data={groups}
        keyExtractor={(group) => group.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.groupItem} onPress={() => handleGroupPress(item)}>
            <Text style={styles.groupName}>{item.name}</Text>
          </TouchableOpacity>
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
    backgroundColor: "lightgray",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  groupName: {
    fontSize: 16,
    color: "black",
  },
  newGroupButton: {
    backgroundColor: "black",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GroupListScreen;
