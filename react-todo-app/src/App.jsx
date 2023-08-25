import React, { useState } from "react";
import DarkTheme from "./assets/images/bg-desktop-dark.jpg";
import LightTheme from "./assets/images/bg-desktop-light.jpg";
import Moon from "./assets/images/icon-moon.svg";
import Sun from "./assets/images/icon-sun.svg";
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("all");
  const [errorText, setErrorText] = useState("");

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const themeImage = theme === "light" ? LightTheme : DarkTheme;
  const themeIcon = theme === "light" ? Sun : Moon;

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== "") {
      setTodos([...todos, { text: inputText, completed: false }]);
      setInputText("");
      setErrorText("");
    } else {
      setErrorText("Please enter a todo.");
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

  let content;
  if (todos.length === 0) {
    content = <p>You haven't entered any todos yet. Please add a todo.</p>;
  } else {
    content = (
      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <input
              className="checkbox"
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
    );
  }

  return (
    <div className={`App ${theme}`}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${themeImage})` }}
      >
        <div className="container">
          <div className="header">
            <h1>TODO</h1>
            <button className="theme-toggle" onClick={handleThemeChange}>
              <img src={themeIcon} alt="Theme Icon" />
            </button>
          </div>

          <div className="main">
            <div className="input-group">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleInputChange}
                placeholder="Enter a todo"
              />
            </div>

            {errorText && <p className="error-text">{errorText}</p>}

            <div className="todo-box">{content}</div>

            <div className="footer">
              <div className="item-count">{activeItemCount} items left</div>

              <div className="filter-options">
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

              <button
                className="clear-completed"
                onClick={handleClearCompleted}
              >
                Clear Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
