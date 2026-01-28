import { Column } from './components/column';
import { TaskForm } from './components/Taskform';
function App() {
  return (
    <div className="container">
      <h1>Gestor de Tareas</h1>
      <TaskForm />
      <div className="kanban-board" style={{ display: 'flex', gap: '20px' }}>
        <Column title="Pendientes" status="To Do" />
        <Column title="En Progreso" status="In Progress" />
        <Column title="Completadas" status="Done" />
      </div>
    </div>
  );
}
export default App;