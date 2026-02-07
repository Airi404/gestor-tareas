import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
// Componente para la barra de búsqueda
export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(TaskContext);

  return (
    <div className="search-container">
     <span style={{color: 'var(--neon-pink)', fontSize: '0.8rem'}}>SCANNING_SYSTEM...</span>
      <input
        type="text"
        placeholder=" Buscar tarea por título..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};