
function Navbar({ usuario, onLogout }) {
  const nombreCompleto =
    [usuario.firstName, usuario.lastName]
      .filter(Boolean)
      .join(' ') || usuario.username;

  return (
    <header className="navbar">
      <div className="navbar-heading">
        <span className="navbar-eyebrow">REPLAY CLUB</span>
        <h2>Panel de administración</h2>
      </div>

      <div className="navbar-user">
        <img
          className="navbar-avatar"
          src={usuario.image}
          alt={`Foto de ${nombreCompleto}`}
        />

        <div className="navbar-user-info">
          <strong>{nombreCompleto}</strong>
          <span>Administrador</span>
        </div>

        <button
          className="logout-button"
          type="button"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Navbar;
