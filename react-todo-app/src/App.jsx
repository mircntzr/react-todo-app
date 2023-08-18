import React, { useState } from "react";
import DarkTheme from "./assets/images/bg-desktop-dark.jpg";
import LightTheme from "./assets/images/bg-desktop-light.jpg";
import Moon from "./assets/images/icon-moon.svg";
import Sun from "./assets/images/icon-sun.svg";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("all");

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const themeImage = theme === "light" ? LightTheme : DarkTheme;
  const themeIcon = theme === "light" ? Sun : Moon;

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== "") {
      setTodos([...todos, { text: inputText, completed: false }]);
      setInputText("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleClearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleToggleAllComplete = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return true;
    }
  });

  const activeItemCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div
      className={`container ${theme}`}
      style={{ backgroundImage: `url(${themeImage})` }}
    >
      <header>
        <h1>Todo App</h1>
        <button className="theme-toggle" onClick={handleThemeChange}>
          {theme === "light" ? (
            <img src={themeIcon} alt="Light Theme" />
          ) : (
            <img src={themeIcon} alt="Dark Theme" />
          )}
        </button>
      </header>
      <div className="input-group">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter a todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span
              className={todo.completed ? "completed" : ""}
              onClick={() => handleToggleComplete(index)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="footer">
        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={todos.length > 0 && todos.every((todo) => todo.completed)}
            onChange={handleToggleAllComplete}
          />
          <label>Select All</label>
        </div>
        <p>{activeItemCount} items left</p>
        <div>
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => handleFilterChange("active")}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
        </div>
        <button onClick={handleClearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default App;
