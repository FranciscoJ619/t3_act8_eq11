
function Sidebar({ seccionActiva, cambiarSeccion }) {
  const opciones = [
    { id: 'inicio', nombre: 'Inicio', icono: '⌂' },
    { id: 'productos', nombre: 'Productos', icono: '▦' },
    { id: 'perfil', nombre: 'Perfil', icono: '◉' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Replay Club</h2>
        <span>ADMINISTRACIÓN</span>
      </div>

      <nav className="sidebar-nav" aria-label="Menú principal">
        {opciones.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            className={`sidebar-link ${
              seccionActiva === opcion.id ? 'active' : ''
            }`}
            onClick={() => cambiarSeccion(opcion.id)}
          >
            <span className="sidebar-icon">{opcion.icono}</span>
            {opcion.nombre}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span>Replay Club</span>
        <small>Panel de administración</small>
      </div>
    </aside>
  );
}

export default Sidebar;
