import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Carga inicial desde localStorage 
  const [tasks, setTasks] = useState(() => {
    // 1. Intentamos obtener las tareas guardadas en el navegador
    const savedTasks = localStorage.getItem('kanban-tasks');
    // 2. Si existen, las transformamos de texto a Array de JS; si no, empezamos con [] [cite: 56]
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Guardar en localStorage cada vez que cambien las tareas 
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

 // Función para añadir tareas usando useContext en otros componentes
  const addTask = (task) => {
    // Uso de Spread Operator para mantener la inmutabilidad 
    setTasks([...tasks, { ...task, id: Date.now(), status: 'To Do' }]);
  };
    return (
        // El Provider "emite" los datos (la nube)
        <TaskContext.Provider value={{ tasks, addTask }}>
        {children}
        </TaskContext.Provider>
    );
    };