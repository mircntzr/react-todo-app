import React from "react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// import Moon from "../assets/images/icon-moon.svg";
// import Sun from "../assets/images/icon-sun.svg";
// import DarkTheme from "../assets/images/bg-desktop-dark.jpg";
// import LightTheme from "../assets/images/bg-desktop-light.jpg";
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState("");
  const [filter, setFilter] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch todos from the database
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddTodo = (text) => {
    // Add a new todo
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        text,
        user,
        tags,
      })
      .then((res) => {
        setTodos([...todos, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleTodo = (id) => {
    // Toggle the completion status of a todo
    axios
      .put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !todos[id].completed,
      })
      .then((res) => {
        setTodos(
          todos.map((todo) => {
            if (todo.id === id) {
              todo.completed = !todo.completed;
            }
            return todo;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteTodo = (id) => {
    // Delete a todo
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterChange = (e) => {
    // Filter todos by user
    setFilter(e.target.value);
  };

  const handleTagChange = (e) => {
    // Add a tag to a todo
    setTags([...tags, e.target.value]);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Add a todo"
        onChange={(e) => handleAddTodo(e.target.value)}
      />
      <ul>
        {todos.filter(
          (todo) =>
            filter === "" || (todo.user === user && todo.tags.includes(filter))
        )}
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleToggleTodo(todo.id)}>
              {todo.completed ? "Uncomplete" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <label for="user">User:</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div>
        <label for="filter">Filter:</label>
        <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        <label for="tags">Tags:</label>
        <input type="text" value={tags} onChange={handleTagChange} />
      </div>
    </div>
  );
};

export default Todos;
ReactDOM.render(<TodoApp />, document.getElementById("root"));
