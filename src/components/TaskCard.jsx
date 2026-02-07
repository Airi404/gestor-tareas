import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export const TaskCard = ({ task }) => {
  // 1. Extraemos las funciones del contexto global 
  const { deleteTask, moveTask } = useContext(TaskContext);

  const handleDragStart = (e) => {
    // Guardamos el ID de la tarea en el evento de arrastre
    e.dataTransfer.setData("taskId", task.id);
  };


  // Si la prioridad es "Alta", añadimos un estilo visual distintivo
  const cardStyle = {
   borderLeft: task.priority === 'Alta' ? '6px solid #ff4d4d' : '6px solid #ccc',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'grab'
  };

  return (
    
  <div 
      className={`task-card ${task.priority === 'Alta' ? 'priority-high' : ''}`}
      style={cardStyle} 
      draggable // <--- Permite que la tarjeta se pueda arrastrar
      onDragStart={handleDragStart}
    >      {/* Mostramos Título y Prioridad  */}
      <h4>{task.title}</h4>
      <p><strong>Prioridad:</strong> {task.priority}</p>
      
      {/* Mostrar botones de acción  */}
      <div className="actions">
        {/* Borrar permanentemente */}
        <button className="btn-delete" onClick={() => deleteTask(task.id)}>Eliminar</button>
        
        {/* Mover: Avanzar o retroceder el estado*/}
        {task.status === 'To Do' && (
          <button className="btn-move" onClick={() => moveTask(task.id, 'In Progress')}>Empezar →</button>
        )}
      {task.status === 'In Progress' && (
        <div className="move-controls">
          <button className="btn-move-back" onClick={() => moveTask(task.id, 'To Do')}>
            ← Volver
          </button>
          <button className="btn-move" onClick={() => moveTask(task.id, 'Done')}>
            Finalizar → 
          </button>
        </div>
      )}
        {/* Permitir reabrir tareas completadas */}
        {task.status === 'Done' && (
          <button className="btn-reopen" onClick={() => moveTask(task.id, 'In Progress')}>← Reabrir</button>
        )}
      </div>
    </div>
  );
};