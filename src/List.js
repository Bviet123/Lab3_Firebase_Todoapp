import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, View } from "react-native";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { FIREBASE_DB } from "../FireBaseConfig";

const List = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  const fetchTodos = async () => {
    try {
      const todosRef = query(collection(FIREBASE_DB, "todos"));
      const snapshot = await getDocs(todosRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodos(data);
      Alert.alert("Lấy dữ liệu", " Lấy dữ liệu từ data thành công");
    } catch (error) {
      console.error("Lỗi:", error);
      Alert.alert("Lỗi", "Lấy dữ liệu thất bại.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) {
      setMessage("Nhập vào công việc.");
      return;
    }

    try {
      const doc = await addDoc(collection(FIREBASE_DB, "todos"), {
        Title: newTodo,
        done: false, // Assuming done starts as false
      });
      console.log("Added todo:", doc.id);
      setMessage("Thêm thành công!");
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Thất bại:", error);
      setMessage("Thêm thất bại.");
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const todoDoc = doc(FIREBASE_DB, "todos", todoId);
      await deleteDoc(todoDoc);
      console.log("Deleted todo:", todoId);
      setMessage("Xóa thành công!");
      fetchTodos();
    } catch (error) {
      console.error("Thất bại:", error);
      setMessage("Xóa thất bại.");
    }
  };

  const toggleDone = async (todoId, done) => {
    try {
      const todoDoc = doc(FIREBASE_DB, "todos", todoId);
      await updateDoc(todoDoc, { done: !done }); // Toggle the done value
      console.log("Toggled done:", todoId);
      setMessage("Cập nhật trạng thái thành công!");
      fetchTodos();
    } catch (error) {
      console.error("Thất bại:", error);
      setMessage("Cập nhật trạng thái thất bại.");
    }
  };

    return (
        <View style={{ flex: 1 }}>
            {message && <Text>{message}</Text>}
            <TextInput
                placeholder="Nhập công việc"
                value={newTodo}
                onChangeText={(text) => setNewTodo(text)}
                style={{ width: 200, margin: 10 }}
            />
            <Button onPress={addTodo} title="Thêm công việc" />
            <Text>Danh sách công việc :</Text>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                      <View style={{ flex: 1 }}>
                        <Text key={item.id}>{item.Title}</Text>
                        <Text style={{ fontWeight: item.done ? "bold" : "normal" }}>{item.done ? "Xong" : "Chưa xong"}</Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "flex-end"}}>
                        <Button title="Hoàn thành" onPress={() => toggleDone(item.id, item.done)} color={item.done ? "gray" : "blue"} />
                        <Button title="Xóa" onPress={() => handleDeleteTodo(item.id)} color="red" />
                    </View>
                </View>
                )}
                keyExtractor={(item) => item.id}
                style={{ flex: 1, padding: 10 }}
            />
        </View>
);
};
            
export default List;