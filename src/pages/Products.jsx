
import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';

function Products() {
  const {
    productos,
    categorias,
    busqueda,
    categoria,
    pagina,
    limite,
    totalFiltrado,
    totalPaginas,
    cargando,
    error,
    cambiarBusqueda,
    cambiarCategoria,
    cambiarLimite,
    setPagina,
    crearProducto,
    editarProducto,
    borrarProducto,
  } = useProducts();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoriaNueva, setCategoriaNueva] = useState('');
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [errorAccion, setErrorAccion] = useState('');
  const [guardando, setGuardando] = useState(false);

  function abrirFormulario(producto = null) {
    setProductoEnEdicion(producto);
    setTitulo(producto?.title ?? '');
    setPrecio(producto?.price != null ? String(producto.price) : '');
    setCategoriaNueva(producto?.category ?? categorias[0] ?? '');
    setMostrarFormulario(true);
    setMensaje('');
    setErrorAccion('');
  }

  function cerrarFormulario() {
    setMostrarFormulario(false);
    setProductoEnEdicion(null);
    setTitulo('');
    setPrecio('');
    setCategoriaNueva(categorias[0] ?? '');
  }

  async function guardarProducto(evento) {
    evento.preventDefault();
    setMensaje('');
    setErrorAccion('');

    const precioNumerico = Number(precio);

    if (!titulo.trim() || !precio.trim() || !categoriaNueva) {
      setErrorAccion('Completa todos los campos.');
      return;
    }

    if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) {
      setErrorAccion('Ingresa un precio mayor que cero.');
      return;
    }

    const datos = {
      title: titulo.trim(),
      price: precioNumerico,
      category: categoriaNueva,
    };

    try {
      setGuardando(true);

      if (productoEnEdicion) {
        const confirmar = window.confirm(
          `¿Deseas guardar los cambios de "${productoEnEdicion.title}"?`
        );

        if (!confirmar) return;

        await editarProducto(productoEnEdicion.id, datos);
        setMensaje('Producto actualizado correctamente.');
      } else {
        await crearProducto(datos);
        setMensaje('Producto agregado correctamente.');
      }

      cerrarFormulario();
    } catch (err) {
      setErrorAccion(err.message || 'No se pudo guardar el producto.');
    } finally {
      setGuardando(false);
    }
  }

  async function manejarEliminar(producto) {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar "${producto.title}"?`
    );

    if (!confirmar) return;

    setMensaje('');
    setErrorAccion('');

    try {
      await borrarProducto(producto.id);
      setMensaje('Producto eliminado correctamente.');
    } catch (err) {
      setErrorAccion(err.message || 'No se pudo eliminar el producto.');
    }
  }

  return (
    <section className="products-page">
      <div className="products-heading">
        <div>
          <h1>Productos</h1>
          <p>Consulta y administra el catálogo de productos.</p>
        </div>

        <button type="button" onClick={() => abrirFormulario()}>
          Agregar producto
        </button>
      </div>

      <div className="products-filters">
        <input
          type="search"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(evento) => cambiarBusqueda(evento.target.value)}
          aria-label="Buscar productos por nombre"
        />

        <select
          value={categoria}
          onChange={(evento) => cambiarCategoria(evento.target.value)}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>

          {categorias.map((item) => (
            <option key={item.slug ?? item} value={item.slug ?? item}>
              {item.name ?? item}
            </option>
          ))}
        </select>

        <label>
          Productos por página
          <select
            value={limite}
            onChange={(evento) => cambiarLimite(evento.target.value)}
          >
            {[10, 20, 40, 50].map((cantidad) => (
              <option key={cantidad} value={cantidad}>
                {cantidad}
              </option>
            ))}
          </select>
        </label>
      </div>

      {mensaje && <p role="status">{mensaje}</p>}
      {error && <p role="alert">Error de carga: {error}</p>}
      {errorAccion && <p role="alert">{errorAccion}</p>}

      {cargando ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <button type="button" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      ) : (
        <>
          <ProductTable
            productos={productos}
            onEditar={abrirFormulario}
            onEliminar={manejarEliminar}
          />

          <div className="products-pagination">
            <span>
              {totalFiltrado} productos encontrados
            </span>

            <button
              type="button"
              disabled={pagina <= 1}
              onClick={() => setPagina((actual) => actual - 1)}
            >
              Anterior
            </button>

            <span>
              Página {pagina} de {totalPaginas}
            </span>

            <button
              type="button"
              disabled={pagina >= totalPaginas}
              onClick={() => setPagina((actual) => actual + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      {mostrarFormulario && (
        <div className="product-form-overlay">
          <form className="product-form" onSubmit={guardarProducto}>
            <h2>
              {productoEnEdicion ? 'Editar producto' : 'Agregar producto'}
            </h2>

            <label htmlFor="product-title">Nombre</label>
            <input
              id="product-title"
              value={titulo}
              onChange={(evento) => setTitulo(evento.target.value)}
              required
            />

            <label htmlFor="product-price">Precio</label>
            <input
              id="product-price"
              type="number"
              min="0.01"
              step="0.01"
              value={precio}
              onChange={(evento) => setPrecio(evento.target.value)}
              required
            />

            <label htmlFor="product-category">Categoría</label>
            <select
              id="product-category"
              value={categoriaNueva}
              onChange={(evento) => setCategoriaNueva(evento.target.value)}
              required
            >
              {categorias.map((item) => (
                <option key={item.slug ?? item} value={item.slug ?? item}>
                  {item.name ?? item}
                </option>
              ))}
            </select>

            <div className="product-form-actions">
              <button type="submit" disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>

              <button
                type="button"
                onClick={cerrarFormulario}
                disabled={guardando}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default Products;
