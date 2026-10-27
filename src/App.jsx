
import { useState } from 'react';
import Login from './pages/Login';
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
    <main className="welcome-page">
      <section className="welcome-card">
        <h1>¡Bienvenido a Replay Club!</h1>

        {usuario.image && (
          <img
            className="welcome-avatar"
            src={usuario.image}
            alt="Foto de perfil"
          />
        )}

        <h2>
          {usuario.firstName || usuario.username}
          {usuario.lastName ? ` ${usuario.lastName}` : ''}
        </h2>

        <p>Has iniciado sesión correctamente.</p>
        <p>Usuario: {usuario.username}</p>

        <button onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </section>
    </main>
  );
}

export default App;
