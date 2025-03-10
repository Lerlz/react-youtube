import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { MongoClient } from 'mongodb';
import PropTypes from 'prop-types';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => todoIndex !== index);
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  useEffect(() => {
    const fetchTodosFromLocalStorage = () => {
      let localTodos = localStorage.getItem('todos');
      if (!localTodos) return;
      localTodos = JSON.parse(localTodos).todos;
      setTodos(localTodos);
    };
    fetchTodosFromLocalStorage();
  }, []);

  async function fetchData() {
    const uri = "mongodb://localhost:27017"; // Update with your MongoDB URI
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db("REACTJS-TODOLIST");
      const collection = database.collection("TO_DO_LIST"); // Replace with your collection
      const data = await collection.find({}).toArray();
      console.log(data);
      // You can update the state with MongoDB data here
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    } finally {
      await client.close();
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Empty array means this runs only once when the component mounts

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
      />
    </>
  );
}

App.propTypes = {
  todos: PropTypes.array,
  handleAddTodos: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
  handleEditTodo: PropTypes.func,
};

export default App;
