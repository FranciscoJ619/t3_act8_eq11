
const API_URL = 'https://dummyjson.com/products';

async function solicitar(endpoint, opciones = {}) {
  const respuesta = await fetch(`${API_URL}${endpoint}`, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...opciones.headers,
    },
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.message || 'Error al consultar productos');
  }

  return datos;
}

export async function obtenerProductos(limite = 10, skip = 0) {
  return solicitar(`?limit=${limite}&skip=${skip}`);
}

export async function obtenerCategorias() {
  return solicitar('/categories');
}

export async function buscarProductos(texto) {
  const consulta = encodeURIComponent(texto);

  return solicitar(`/search?q=${consulta}`);
}

export async function agregarProducto(producto) {
  return solicitar('/add', {
    method: 'POST',
    body: JSON.stringify(producto),
  });
}

export async function actualizarProducto(id, cambios) {
  return solicitar(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(cambios),
  });
}

export async function eliminarProducto(id) {
  return solicitar(`/${id}`, {
    method: 'DELETE',
  });
}
