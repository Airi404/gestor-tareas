import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  // Carga inicial desde localStorage 
  // 1. ESTADO DEL USUARIO CON PERSISTENCIA 
  const [user, setUser] = useState(() => {
    // Intentamos recuperar el usuario guardado en localStorage al cargar la app
    const savedUser = localStorage.getItem('google-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

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
  
 
  // --- FUNCIONES DE AUTENTICACIÓN ---
  const login = (response) => {
    // Decodificamos el token JWT que nos envía Google
    const decoded = jwtDecode(response.credential);     
    setUser(decoded);
    localStorage.setItem('google-user', JSON.stringify(decoded));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('google-user');
  }; // Función para añadir tareas usando useContext en otros componentes


 const addTask = (task) => {
    // Usamos el nombre que viene del token de Google (user.name)
    const newTask = { 
      ...task, 
      id: Date.now(), 
      status: 'To Do',
      author: user ? user.name : 'Invitado' 
    };
    setTasks([...tasks, newTask]);
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
      toggleDarkMode,
      login,
      logout,
      user
      }}>
      {children}
    </TaskContext.Provider>
  );
};