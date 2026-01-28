import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useForm } from '../hooks/useForm';

export const TaskForm = () => {
  const { addTask } = useContext(TaskContext);

  // Inicializamos el formulario con los campos requeridos
  const { values, handleChange, reset } = useForm({
    title: '',
    description: '',
    priority: 'Media'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title.trim()) return;

    // Pasamos los valores al contexto global
    addTask(values);
    reset(); // Limpia los inputs después de añadir
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Nueva Tarea</h3>
      
      <input
        name="title"
        type="text"
        placeholder="Título"
        value={values.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={values.description}
        onChange={handleChange}
      />

      <select name="priority" value={values.priority} onChange={handleChange}>
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>

      <button type="submit">Añadir a la lista</button>
    </form>
  );
};