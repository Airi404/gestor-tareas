import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; // Importamos el contexto global
import { TaskCard } from './TaskCard';

export const Column = ({ title, status }) => {
  // Extraemos el array de tareas del estado global
  const { tasks, moveTask, searchQuery } = useContext(TaskContext);

  // Filtramos las tareas según el estado de esta columna 
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = task.status === status;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;

  });
  const handleDragOver = (e) => e.preventDefault(); // Permite soltar elementos aquí
  const handleDrop = (e) => {
    const taskId = e.dataTransfer.getData("taskId");
    moveTask(Number(taskId), status); // Llama a la función que ya creaste en el Contexto
  };
  return (
    <div 
          className="column"
          onDragOver={handleDragOver} // Detecta cuando algo pasa por encima
          onDrop={handleDrop}         // Ejecuta la lógica al soltar
        >      
        <h2>{title}</h2>
      <div className="task-list">
        {/* Usamos map() para generar las tarjetas y una key única obligatoria */}
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};