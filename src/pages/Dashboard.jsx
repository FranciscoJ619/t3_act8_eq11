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
          <div className="profile-container">
            <h1>Mi perfil</h1>
            <p>Usuario: {usuario.username}</p>
            <p>
              Nombre:{' '}
              {[usuario.firstName, usuario.lastName]
                .filter(Boolean)
                .join(' ') || usuario.username}
            </p>
            <p>Correo: {usuario.email || 'No disponible'}</p>
          </div>
        );

      default:
        return (
          <div className="home-dashboard-view">
            {/* 1. Banner Principal Hero */}
            <section className="hero-banner-card">
              <div className="hero-content">
                <span className="hero-tagline">COMPRA · VENDE · PRESTA · CONECTA</span>
                <h1 className="hero-title">Dale una segunda vida a tus videojuegos</h1>
                <p className="hero-desc">
                  Compra, comparte y descubre videojuegos físicos con otros jugadores.
                </p>
                <div className="hero-actions">
                  <button
                    type="button"
                    className="btn-hero-primary"
                    onClick={() => setSeccionActiva('productos')}
                  >
                    Explorar catálogo →
                  </button>
                  <button
                    type="button"
                    className="btn-hero-secondary"
                    onClick={() => setSeccionActiva('productos')}
                  >
                    Publicar videojuego
                  </button>
                </div>
              </div>
              <div className="hero-media-wrapper">
                <img
                  src="https://www.shutterstock.com/shutterstock/photos/2585730557/display_1500/stock-photo-dnipro-ukraine-dec-playstation-game-dualsense-and-xbox-one-controller-on-dark-2585730557.jpg"
                  alt="Videojuegos"
                  className="hero-image"
                />
              </div>
            </section>

            {/* 2. Tarjetas de métricas rápidas */}
            <section className="stats-row">
              <div className="stat-card">
                <div className="stat-icon">🎮</div>
                <div className="stat-info">
                  <span className="stat-number">128</span>
                  <span className="stat-label">Videojuegos disponibles</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✨</div>
                <div className="stat-info">
                  <span className="stat-number">24</span>
                  <span className="stat-label">Publicaciones recientes</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <span className="stat-number">842</span>
                  <span className="stat-label">Comunidad de jugadores</span>
                </div>
              </div>
            </section>

            {/* 3. Destacados de la semana */}
            <section className="section-block">
              <div className="section-header">
                <h2 className="section-title">Destacados de la semana</h2>
                <button
                  type="button"
                  className="link-see-more"
                  onClick={() => setSeccionActiva('productos')}
                >
                  Ver todo el catálogo →
                </button>
              </div>

              <div className="grid-cards-four">
                {[
                  {
                    id: 1,
                    title: 'Zelda: Tears of the Kingdom',
                    platform: 'Nintendo Switch',
                    price: '$950 MXN',
                    rating: '4.9',
                    img: 'https://www.gaming.net/wp-content/uploads/2023/05/The-Legend-of-Zelda-Tears-of-the-Kingdom.jpg',
                  },
                  {
                    id: 2,
                    title: 'Super Mario Bros. Wonder',
                    platform: 'Nintendo Switch',
                    price: '$850 MXN',
                    rating: '4.8',
                    img: 'https://th.bing.com/th/id/R.6ece3e43f0a702fbbaa2f53585a1cc33?rik=WHJRRtrJz1Yd1g&pid=ImgRaw&r=0',
                  },
                  {
                    id: 3,
                    title: 'God of War Ragnarök',
                    platform: 'PlayStation 5',
                    price: '$690 MXN',
                    rating: '4.9',
                    img: 'https://image.api.playstation.com/vulcan/ap/rnd/202503/2016/9c66234099a4c6dc39a12c4101746f7dc9d87babbca5efe4.jpg',
                  },
                  {
                    id: 4,
                    title: 'Halo Infinite',
                    platform: 'Xbox Series X',
                    price: '$480 MXN',
                    rating: '4.5',
                    img: 'https://mp1st.com/wp-content/uploads/2024/02/halo-infinite-new-title.png.webp',
                  },
                ].map((item) => (
                  <div key={item.id} className="game-card">
                    <div className="card-thumb-container">
                      <img src={item.img} alt={item.title} className="card-thumb" />
                    </div>
                    <div className="card-details">
                      <span className="card-platform">{item.platform}</span>
                      <h3 className="card-title">{item.title}</h3>
                      <div className="card-meta">
                        <span className="card-price">{item.price}</span>
                        <span className="card-rating">⭐ {item.rating}</span>
                      </div>
                      <button
                        type="button"
                        className="btn-card-details"
                        onClick={() => setSeccionActiva('productos')}
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Recién agregados */}
            <section className="section-block">
              <div className="section-header">
                <h2 className="section-title">Recién agregados</h2>
                <button
                  type="button"
                  className="link-see-more"
                  onClick={() => setSeccionActiva('productos')}
                >
                  Descubrir novedades →
                </button>
              </div>

              <div className="grid-recent-three">
                {[
                  {
                    id: 1,
                    title: 'Resident Evil 4',
                    info: 'PlayStation 5 · Hace 1 h',
                    price: '$750 MXN',
                    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=60',
                  },
                  {
                    id: 2,
                    title: 'Hollow Knight',
                    info: 'Nintendo Switch · Hace 2 h',
                    price: '$590 MXN',
                    img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=60',
                  },
                  {
                    id: 3,
                    title: 'Leyendas Pokémon: Arceus',
                    info: 'Nintendo Switch · Hace 3 h',
                    price: '$790 MXN',
                    img: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/pokemon-scarlet-and-violet-cover-art.jpg',
                  },
                ].map((item) => (
                  <div key={item.id} className="recent-card">
                    <img src={item.img} alt={item.title} className="recent-card-img" />
                    <div className="recent-card-info">
                      <h4 className="recent-title">{item.title}</h4>
                      <span className="recent-subtitle">{item.info}</span>
                      <span className="recent-price">{item.price}</span>
                    </div>
                    <span className="recent-arrow">↗</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Banner inferior de la comunidad */}
            <div className="community-banner">
              <div className="community-text">
                <span className="community-icon">💬</span>
                <span>Las mejores recomendaciones vienen de otros jugadores.</span>
              </div>
              <button
                type="button"
                className="btn-community"
                onClick={() => setSeccionActiva('productos')}
              >
                Únete a la conversación →
              </button>
            </div>
          </div>
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
