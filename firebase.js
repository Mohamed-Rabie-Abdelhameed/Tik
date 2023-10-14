import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-q6bwWV5SnHzWjda4UHoXY1KgYkUstkI",
  authDomain: "tik-app-63461.firebaseapp.com",
  projectId: "tik-app-63461",
  storageBucket: "tik-app-63461.appspot.com",
  messagingSenderId: "827337379282",
  appId: "1:827337379282:web:56828792e960e60bb04c0b",
};

const app = initializeApp(firebaseConfig);

// add group to firebase
export const createGroup = async (groupName) => {
  const docRef = await addDoc(collection(db, "groups"), {
    name: groupName,
  });
  console.log("Document written with ID: ", docRef.id);
};

// delete group from firebase
export const deleteGroup = async (group) => {
  await deleteDoc(doc(db, "groups", group.id));
};

// add task to firebase
export const createTask = async (taskName, group) => {
  const groupTasksRef = collection(db, "groups", group.id, "tasks");
  const docRef = await addDoc(groupTasksRef, {
    name: taskName,
  });
  console.log("Document written with ID: ", docRef.id);
};

// delete task from firebase
export const deleteTask = async (taskId, group) => {
  const taskRef = doc(db, "groups", group.id, "tasks", taskId);
  console.log(taskRef);
  await deleteDoc(taskRef);
};

// get groups from firebase
export const getGroups = async () => {
  const querySnapshot = await getDocs(collection(db, "groups"));
  const groups = [];
  querySnapshot.forEach((doc) => {
    groups.push({ ...doc.data(), id: doc.id });
  });
  return groups;
};

// get number of tasks in a group from firebase
export const getNumTasks = async (group) => {
  const tasksCollectionRef = collection(db, "groups", group.id, "tasks");
  const querySnapshot = await getDocs(tasksCollectionRef);
  return querySnapshot.size;
};

// get tasks from firebase
export const getTasks = async (group) => {
  const tasksCollectionRef = collection(db, "groups", group.id, "tasks");
  const querySnapshot = await getDocs(tasksCollectionRef);
  const tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push({ ...doc.data(), id: doc.id });
  });

  return tasks;
};

export const db = getFirestore(app);
