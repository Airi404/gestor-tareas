import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  // Carga inicial desde localStorage 
  const [tasks, setTasks] = useState(() => {
    // 1. Intentamos obtener las tareas guardadas en el navegador
    const savedTasks = localStorage.getItem('kanban-tasks');
    // 2. Si existen, las transformamos de texto a Array de JS; si no, empezamos con []
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode === 'true'; // Devuelve true si estaba guardado como oscuro
  });
  useEffect(() => {
    localStorage.setItem('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Guardar en localStorage cada vez que cambien las tareas 
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

 // Función para añadir tareas usando useContext en otros componentes
  const addTask = (task) => {
    // Uso de Spread Operator para mantener la inmutabilidad 
    setTasks([...tasks, { ...task, id: Date.now(), status: 'To Do' }]);
  };

  //Borrar tarea permanentemente
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };
 return (
    // Un solo Provider con todos los valores necesarios
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      deleteTask, 
      moveTask, 
      searchQuery, 
      setSearchQuery,
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </TaskContext.Provider>
  );
};