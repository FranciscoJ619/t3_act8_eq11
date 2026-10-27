
import { useEffect, useMemo, useState } from 'react';
import {
  obtenerProductos,
  obtenerCategorias,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
} from '../services/productsApi';

function leerParametrosURL() {
  const parametros = new URLSearchParams(window.location.search);

  const pagina = Number(parametros.get('page')) || 1;
  const limiteSolicitado = Number(parametros.get('limit')) || 10;
  const limitesValidos = [10, 20, 40, 50];

  return {
    pagina: Math.max(1, pagina),
    limite: limitesValidos.includes(limiteSolicitado)
      ? limiteSolicitado
      : 10,
  };
}

function useProducts() {
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const [pagina, setPagina] = useState(() => leerParametrosURL().pagina);
  const [limite, setLimite] = useState(() => leerParametrosURL().limite);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Cargar productos y categorías desde DummyJSON.
  useEffect(() => {
    async function cargarDatos() {
      try {
        setCargando(true);
        setError('');

        const [respuestaProductos, respuestaCategorias] =
          await Promise.all([
            obtenerProductos(0, 0),
            obtenerCategorias(),
          ]);

        setProductosOriginales(respuestaProductos.products);
        setCategorias(respuestaCategorias);
      } catch (err) {
        setError(err.message || 'No se pudieron cargar los datos.');
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  // Mantener page y limit sincronizados con la URL.
  useEffect(() => {
    const parametros = new URLSearchParams(window.location.search);
    parametros.set('page', String(pagina));
    parametros.set('limit', String(limite));

    const nuevaURL =
      `${window.location.pathname}?${parametros.toString()}` +
      window.location.hash;

    window.history.pushState({}, '', nuevaURL);
  }, [pagina, limite]);

  // Responder a los botones Atrás y Adelante del navegador.
  useEffect(() => {
    function sincronizarConURL() {
      const parametros = leerParametrosURL();
      setPagina(parametros.pagina);
      setLimite(parametros.limite);
    }

    window.addEventListener('popstate', sincronizarConURL);

    return () => {
      window.removeEventListener('popstate', sincronizarConURL);
    };
  }, []);

  // Aplicar búsqueda y categoría antes de paginar.
  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return productosOriginales.filter((producto) => {
      const coincideTexto =
        producto.title.toLowerCase().includes(texto);

      const coincideCategoria =
        !categoria || producto.category === categoria;

      return coincideTexto && coincideCategoria;
    });
  }, [productosOriginales, busqueda, categoria]);

  const totalFiltrado = productosFiltrados.length;

  const totalPaginas = Math.max(
    1,
    Math.ceil(totalFiltrado / limite)
  );

  // Evitar que la página actual quede fuera del rango.
  useEffect(() => {
    if (pagina > totalPaginas) {
      setPagina(totalPaginas);
    }
  }, [pagina, totalPaginas]);

  const productos = useMemo(() => {
    const inicio = (pagina - 1) * limite;

    return productosFiltrados.slice(inicio, inicio + limite);
  }, [productosFiltrados, pagina, limite]);

  function cambiarBusqueda(texto) {
    setBusqueda(texto);
    setPagina(1);
  }

  function cambiarCategoria(valor) {
    setCategoria(valor);
    setPagina(1);
  }

  function cambiarLimite(valor) {
    const nuevoLimite = Number(valor);

    if ([10, 20, 40, 50].includes(nuevoLimite)) {
      setLimite(nuevoLimite);
      setPagina(1);
    }
  }

  // Agregar un producto y actualizar el estado local.
  async function crearProducto(datos) {
    const nuevoProducto = await agregarProducto(datos);

    setProductosOriginales((actuales) => [
      nuevoProducto,
      ...actuales,
    ]);

    setPagina(1);
    return nuevoProducto;
  }

  // Actualizar un producto y actualizar el estado local.
  async function editarProducto(id, cambios) {
    const productoActualizado = await actualizarProducto(id, cambios);

    setProductosOriginales((actuales) =>
      actuales.map((producto) =>
        producto.id === id
          ? { ...producto, ...productoActualizado }
          : producto
      )
    );

    return productoActualizado;
  }

  // Eliminar un producto y actualizar el estado local.
  async function borrarProducto(id) {
    await eliminarProducto(id);

    setProductosOriginales((actuales) =>
      actuales.filter((producto) => producto.id !== id)
    );
  }

  return {
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
  };
}

export default useProducts;
