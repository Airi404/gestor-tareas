import { Column } from './components/column';
import { useContext, useEffect } from 'react'; 
import { TaskContext } from './context/TaskContext';
import { TaskForm } from './components/Taskform';
import { SearchBar } from './components/searchbar';
import { ThemeToggle } from './components/ThemeToggle';
import { jwtDecode } from "jwt-decode";
import googleOneTap from 'google-one-tap';

function App() {
  // 1. Extraemos TODO lo necesario del contexto (incluyendo user, login y logout)
  const { darkMode, user, login, logout } = useContext(TaskContext);

  // 2. Hook para Google One Tap
  useEffect(() => {
    const options = {
      client_id: '377587176686-ibi26b6tgsetc9fp839uuvcl0io8omm9.apps.googleusercontent.com', 
      auto_select: false,
      cancel_on_tap_outside: false,
    };

    // Solo activamos One Tap si no hay usuario
    if (!user) {
      googleOneTap(options, (response) => {
        login(response); 
      });
    }
  }, [user, login]); // Se ejecuta cuando el usuario cambia (login/logout)
  
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
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 className="title" style={{ 
          color: darkMode ? 'var(--progress-color)' : '#000',
          textShadow: darkMode ? '0 0 10px var(--progress-color)' : 'none'
        }}>Gestor de Tareas</h1>

        {user && (
            <div className="user-profile-cyber">
              <div className="user-info">
                <span className="user-status">AUTHORIZED_USER</span>
                <span className="user-name">{user.name}</span>
              </div>
              <div className="avatar-wrapper">
                <img src={user.picture} alt="perfil" className="user-avatar" />
                <div className="scan-line"></div>
              </div>
              <button onClick={logout} className="btn-logout-cyber">
                TERMINATE_SESSION
              </button>
            </div>
          )}
      </header>

      <ThemeToggle />

      {user ? (
        <>
          <TaskForm />
          <SearchBar />
          <div className="kanban-board" style={{ display: 'flex', gap: '20px' }}>
            <Column title="Pendientes" status="To Do" />
            <Column title="En Progreso" status="In Progress" />
            <Column title="Completadas" status="Done" />
          </div>
        </>
      ) : (
        <div className="login-message" style={{ textAlign: 'center', marginTop: '50px', padding: '40px', border: '2px dashed #ccc' }}>
          <h2>Bienvenido al Kanban</h2>
          <p>Por favor, utiliza el cuadro de Google para iniciar sesión y empezar a gestionar tus tareas.</p>
        </div>
      )}
    </div>
  );
}

export default App;