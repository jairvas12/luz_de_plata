import { apiRequest } from "./api.js";

// Adaptar un usuario del backend al formato de React
export function adaptarUsuario(usuario) {
  return {
    id: String(usuario.id),
    run: usuario.run ?? "",
    name: usuario.nombre ?? "",
    lastName: usuario.apellidos ?? "",
    email: usuario.email ?? "",
    birthDate: usuario.fechaNacimiento ?? "",
    role: usuario.rol ?? "CLIENTE",
    region: usuario.region ?? "",
    commune: usuario.comuna ?? "",
    address: usuario.direccion ?? "",
    active: usuario.activo === true,
  };
}

// Obtener todos los usuarios registrados en MySQL
export async function listarUsuariosApi() {
  const respuesta = await apiRequest("/usuarios");

  if (!Array.isArray(respuesta)) {
    throw new Error("La API no devolvió una lista de usuarios");
  }

  return respuesta.map(adaptarUsuario);
}

// Buscar un usuario por ID
export async function buscarUsuarioApi(id) {
  const respuesta = await apiRequest(`/usuarios/${encodeURIComponent(id)}`);

  return adaptarUsuario(respuesta);
}

// Crear un usuario
export async function crearUsuarioApi(datos) {
  const respuesta = await apiRequest("/usuarios", {
    method: "POST",
    body: JSON.stringify(datos),
  });

  return adaptarUsuario(respuesta);
}

// Actualizar un usuario existente
export async function actualizarUsuarioApi(id, datos) {
  const respuesta = await apiRequest(`/usuarios/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  });

  return adaptarUsuario(respuesta);
}

// Eliminar un usuario
export async function eliminarUsuarioApi(id) {
  return apiRequest(`/usuarios/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
