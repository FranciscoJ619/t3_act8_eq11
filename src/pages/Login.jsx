import { useState } from 'react';
import { iniciarSesion } from '../services/authApi';
import '../styles/login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Completa todos los campos.');
      return;
    }

    try {
      setCargando(true);

      const usuario = await iniciarSesion(
        username.trim(),
        password
      );

      onLogin(usuario);
    } catch (error) {
      setError(error.message || 'Ocurrió un error al iniciar sesión.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={manejarEnvio}>
        <h1>Replay Club</h1>
        <p>Inicia sesión para continuar</p>

        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(evento) => setUsername(evento.target.value)}
          placeholder="Ingresa tu usuario"
          autoComplete="username"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(evento) => setPassword(evento.target.value)}
          placeholder="Ingresa tu contraseña"
          autoComplete="current-password"
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </main>
  );
}

export default Login;