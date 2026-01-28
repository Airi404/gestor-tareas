import { Column } from './components/column';

function App() {
  return (
    <div className="kanban-board" style={{ display: 'flex', gap: '20px' }}>
      {/* Reutilizamos el componente Column pasándole props distintas [cite: 33] */}
      <Column title="Pendientes" status="To Do" />
      <Column title="En Progreso" status="In Progress" />
      <Column title="Completadas" status="Done" />
    </div>
  );
}