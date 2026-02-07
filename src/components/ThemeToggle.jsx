import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(TaskContext);

  return (
    // Botón para alternar entre modo oscuro y claro
    <button 
      onClick={toggleDarkMode}
      className={`theme-btn ${darkMode ? 'active' : ''}`}
    >
      {darkMode ? '🌙 NIGHT_MODE ON' : '☀️ DAY_LIGHT ON'}
    </button>
  );
};