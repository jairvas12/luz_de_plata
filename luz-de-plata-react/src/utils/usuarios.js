const CLAVE_USUARIOS = "usuarios";

export function obtenerUsuarios() {
  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS);

  if (!usuariosGuardados) {
    return [];
  }

  return JSON.parse(usuariosGuardados);
}

export function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

export function registrarUsuario(usuario) {
  const usuarios = obtenerUsuarios();

  const existeEmail = usuarios.some(
    (item) => item.email.toLowerCase() === usuario.email.toLowerCase(),
  );

  if (existeEmail) {
    return {
      ok: false,
      mensaje: "El correo ya está registrado.",
    };
  }

  usuarios.push(usuario);

  guardarUsuarios(usuarios);

  return {
    ok: true,
  };
}
