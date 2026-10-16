import { obtenerUsuarios } from "../utils/usuarios";

const CLAVE_SESION = "sesion";

export function iniciarSesion(email, password) {
  const usuarios = obtenerUsuarios();

  const usuario = usuarios.find(
    (usuario) =>
      usuario.email.toLowerCase() === email.trim().toLowerCase() &&
      usuario.password === password &&
      usuario.active !== false,
  );

  if (!usuario) {
    return null;
  }

  const sesion = {
    id: usuario.id,
    name: usuario.name,
    email: usuario.email,
    role: usuario.role,
  };

  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));

  return sesion;
}

export function obtenerSesion() {
  const sesionGuardada = localStorage.getItem(CLAVE_SESION);

  if (!sesionGuardada) {
    return null;
  }

  return JSON.parse(sesionGuardada);
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}
