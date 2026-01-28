import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; // Importamos el contexto global
import { TaskCard } from './TaskCard';

export const Column = ({ title, status }) => {
  // Extraemos el array de tareas del estado global
  const { tasks } = useContext(TaskContext);

  // Filtramos las tareas según el estado de esta columna 
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className="column">
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