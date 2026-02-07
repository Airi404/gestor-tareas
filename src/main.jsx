import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css';

import App from './App.jsx'
import { TaskProvider } from './context/TaskContext'
// Renderizamos la aplicación envuelta en el TaskProvider para que todo tenga acceso al contexto global
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </StrictMode>,
)
