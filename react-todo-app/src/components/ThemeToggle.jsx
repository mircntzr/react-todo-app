// src/components/ThemeToggle.js
import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {darkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeToggle;
