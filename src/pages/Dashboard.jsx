import Products from './Products';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/dashboard.css';

function Dashboard({ usuario, onLogout }) {
  const [seccionActiva, setSeccionActiva] = useState('inicio');

  function mostrarContenido() {
    switch (seccionActiva) {
      case 'productos':
        return <Products />;
      case 'perfil':
        return (
          <>
            <h1>Mi perfil</h1>
            <p>Usuario: {usuario.username}</p>
            <p>
              Nombre: {[usuario.firstName, usuario.lastName]
                .filter(Boolean)
                .join(' ') || usuario.username}
            </p>
            <p>Correo: {usuario.email || 'No disponible'}</p>
          </>
        );

      default:
        return (
          <>
            <span className="welcome-label">BIENVENIDO A REPLAY CLUB</span>
            <h1>Inicio</h1>
            <p>
              Tu panel de administración está listo.
            </p>

            <div className="dashboard-card">
              <h3>Gestión de productos</h3>
              <p>
                Desde el menú lateral podrás acceder al apartado
                donde administraremos los productos.
              </p>

              <button
                type="button"
                onClick={() => setSeccionActiva('productos')}
              >
                Ir a productos
              </button>
            </div>
          </>
        );
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar
        seccionActiva={seccionActiva}
        cambiarSeccion={setSeccionActiva}
      />

      <div className="dashboard-main">
        <Navbar usuario={usuario} onLogout={onLogout} />

        <main className="dashboard-content">
          {mostrarContenido()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
