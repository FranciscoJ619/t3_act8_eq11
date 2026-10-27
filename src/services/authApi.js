const API_URL = 'https://dummyjson.com/auth/login';

export async function iniciarSesion(username, password) {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.message || 'No se pudo iniciar sesión');
  }

  return datos;
}
