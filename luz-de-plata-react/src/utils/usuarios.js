const CLAVE_USUARIOS = "usuarios";

const USUARIOS_INICIALES = [
  {
    id: "USRADMIN",
    run: "190110222",
    name: "Admin",
    lastName: "Luz de Plata",
    email: "admin@duoc.cl",
    password: "admin123",
    birthDate: "",
    role: "Administrador",
    region: "Metropolitana de Santiago",
    commune: "Santiago",
    address: "Administración",
    active: true,
  },
  {
    id: "USRVENTA",
    run: "123456785",
    name: "Valentina",
    lastName: "Ventas",
    email: "vendedor@duoc.cl",
    password: "venta123",
    birthDate: "",
    role: "Vendedor",
    region: "Metropolitana de Santiago",
    commune: "Santiago",
    address: "Tienda",
    active: true,
  },
  {
    id: "USRCLIENTE",
    run: "111111111",
    name: "Cliente",
    lastName: "Demo",
    email: "cliente@gmail.com",
    password: "clave123",
    birthDate: "",
    role: "Cliente",
    region: "Valparaíso",
    commune: "Viña del Mar",
    address: "Dirección demo",
    active: true,
  },
];

export function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

export function obtenerUsuarios() {
  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS);

  if (!usuariosGuardados) {
    guardarUsuarios(USUARIOS_INICIALES);

    return [...USUARIOS_INICIALES];
  }

  const usuarios = JSON.parse(usuariosGuardados);

  console.log("Usuarios antes:", usuarios);
  console.log("Usuarios iniciales:", USUARIOS_INICIALES);

  let huboCambios = false;

  const usuariosActualizados = [...usuarios];

  USUARIOS_INICIALES.forEach((usuarioInicial) => {
    const existe = usuariosActualizados.some(
      (usuario) =>
        usuario.email.toLowerCase() === usuarioInicial.email.toLowerCase(),
    );

    if (!existe) {
      usuariosActualizados.push(usuarioInicial);
      huboCambios = true;
    }
  });

  if (huboCambios) {
    guardarUsuarios(usuariosActualizados);
  }

  console.log("Usuarios finales:", usuariosActualizados);

  return usuariosActualizados;
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

  const nuevosUsuarios = [...usuarios, usuario];

  guardarUsuarios(nuevosUsuarios);

  return {
    ok: true,
  };
}
