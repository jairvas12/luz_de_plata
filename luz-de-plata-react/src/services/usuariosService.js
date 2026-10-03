const CLAVE_USUARIOS =
  "lp_users_v1";

const CLAVE_SESION =
  "lp_session_v1";


export function obtenerUsuarios() {

  const datos =
    localStorage.getItem(
      CLAVE_USUARIOS
    );

  if (!datos) {
    return [];
  }

  return JSON.parse(datos);

}


export function iniciarSesion(
  email,
  password
) {

  const usuarios =
    obtenerUsuarios();

  const usuario =
    usuarios.find(
      usuario =>
        usuario.email
          .toLowerCase()
          ===
        email
          .trim()
          .toLowerCase()
        &&
        usuario.password
          === password
        &&
        usuario.active
          !== false
    );

  if (!usuario) {
    return null;
  }

  const sesion = {
    id: usuario.id,
    name: usuario.name,
    email: usuario.email,
    role: usuario.role
  };

  localStorage.setItem(
    CLAVE_SESION,
    JSON.stringify(sesion)
  );

  return sesion;

}


export function obtenerSesion() {

  const datos =
    localStorage.getItem(
      CLAVE_SESION
    );

  if (!datos) {
    return null;
  }

  return JSON.parse(datos);

}


export function cerrarSesion() {

  localStorage.removeItem(
    CLAVE_SESION
  );

}