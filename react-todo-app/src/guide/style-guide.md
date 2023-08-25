# Front-end Style Guide

## Layout

The designs were created to the following widths:

- Mobile: 375px
- Desktop: 1440px

## Colors

### Primary

- Bright Blue: hsl(220, 98%, 61%)
- Check Background: linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)

### Neutral

### Light Theme

- Very Light Gray: hsl(0, 0%, 98%)
- Very Light Grayish Blue: hsl(236, 33%, 92%)
- Light Grayish Blue: hsl(233, 11%, 84%)
- Dark Grayish Blue: hsl(236, 9%, 61%)
- Very Dark Grayish Blue: hsl(235, 19%, 35%)

### Dark Theme

- Very Dark Blue: hsl(235, 21%, 11%)
- Very Dark Desaturated Blue: hsl(235, 24%, 19%)
- Light Grayish Blue: hsl(234, 39%, 85%)
- Light Grayish Blue (hover): hsl(236, 33%, 92%)
- Dark Grayish Blue: hsl(234, 11%, 52%)
- Very Dark Grayish Blue: hsl(233, 14%, 35%)
- Very Dark Grayish Blue: hsl(237, 14%, 26%)

## Typography

### Body Copy

- Font size: 18px

### Font

- Family: [Josefin Sans](https://fonts.google.com/specimen/Josefin+Sans)
- Weights: 400, 700
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
setErrorText("Lütfen bir todo girin");
}
};

// Add todo butonunu kaldırdım

const handleToggleComplete = (index) => {
const updatedTodos = [...todos];
updatedTodos[index].completed = !updatedTodos[index].completed;
setTodos(updatedTodos);
};

const handleDeleteTodo = (index) => {
const updatedTodos = todos.filter((\_, i) => i !== index);
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

// Hiç todo yokken mesaj ekleme
let content;
if (todos.length === 0) {
content = <p>Henüz bir todo girmediniz. Lütfen bir todo ekleyin.</p>;
} else {
content = (
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
onClick={() => handleToggleComplete(index)} >
{todo.text}
</span>
<button onClick={() => handleDeleteTodo(index)}>Delete</button>
</li>
))}
</ul>
);
}

return (
<div
className={`App ${theme}`}
style={{ backgroundImage: `url(${themeImage})` }} >
<div className="container">
<header>
<h1>TODO</h1>
<button className="theme-toggle" onClick={handleThemeChange}>
<img src={themeIcon} alt="Theme Icon" />
</button>
</header>
<main>
<div className="input-group">
<input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleInputChange}
              placeholder="Bir todo girin"
            />
</div>
{errorText && <p className="error-text">{errorText}</p>}

          <div className="todo-box">{content}</div>

          <div className="footer">
            <div className="item-count">{activeItemCount} öğe kaldı</div>
            <div className="filter-options">
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => handleFilterChange("all")}
              >
                Tümü
              </button>
              <button
                className={filter === "active" ? "active" : ""}
                onClick={() => handleFilterChange("active")}
              >
                Aktif
              </button>
              <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => handleFilterChange("completed")}
              >
                Tamamlanan
              </button>
            </div>
            <button className="clear-completed" onClick={handleClearCompleted}>
              Tamamlananları Temizle
            </button>
          </div>
        </main>
      </div>
    </div>

);
};

export default App;
