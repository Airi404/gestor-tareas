import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export const TaskCard = ({ task }) => {
  // 1. Extraemos las funciones del contexto global 
  const { deleteTask, moveTask } = useContext(TaskContext);

  // 2. REQUISITO 5: Estilado dinámico por prioridad 
  // Si la prioridad es "Alta", añadimos un estilo visual distintivo
  const cardStyle = {
    borderLeft: task.priority === 'Alta' ? '6px solid red' : '6px solid #ccc',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div className="task-card" style={cardStyle}>
      {/* Mostramos Título y Prioridad  */}
      <h4>{task.title}</h4>
      <p><strong>Prioridad:</strong> {task.priority}</p>
      
      {/* REQUISITO: Mostrar botones de acción  */}
      <div className="actions">
        {/* Borrar permanentemente */}
        <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        
        {/* Mover: Avanzar o retroceder el estado*/}
        {task.status === 'To Do' && (
          <button onClick={() => moveTask(task.id, 'In Progress')}>Empezar →</button>
        )}
        {task.status === 'In Progress' && (
          <button onClick={() => moveTask(task.id, 'Done')}>Finalizar →</button>
        )}
        {/* Permitir reabrir tareas completadas */}
        {task.status === 'Done' && (
          <button onClick={() => moveTask(task.id, 'In Progress')}>← Reabrir</button>
        )}
      </div>
    </div>
  );
};