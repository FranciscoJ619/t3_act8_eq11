
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);

  function manejarLogin(datosUsuario) {
    setUsuario(datosUsuario);
  }

  function cerrarSesion() {
    setUsuario(null);
  }

  if (!usuario) {
    return <Login onLogin={manejarLogin} />;
  }

  return (
    <Dashboard
      usuario={usuario}
      onLogout={cerrarSesion}
    />
  );
}

export default App;
