import { Column } from './components/column';
import { useContext, useEffect } from 'react'; 
import { TaskContext } from './context/TaskContext';
import { TaskForm } from './components/Taskform';
import { SearchBar } from './components/searchbar';
import {ThemeToggle} from './components/ThemeToggle';
import { use } from 'react';
function App() {
  const { darkMode } = useContext(TaskContext);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);
  return (
   <div className="container">
      <h1 className="title" style={{ 
        color: darkMode ? 'var(--progress-color)' : '#000',
        textShadow: darkMode ? '0 0 10px var(--progress-color)' : 'none'
      }}>Gestor de Tareas</h1>
      <ThemeToggle />
      <TaskForm />
      <SearchBar />
      <div className="kanban-board" style={{ display: 'flex', gap: '20px' }}>
        <Column title="Pendientes" status="To Do" />
        <Column title="En Progreso" status="In Progress" />
        <Column title="Completadas" status="Done" />
      </div>
    </div>
  );
}
export default App;