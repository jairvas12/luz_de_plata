
export function iniciarSesion(
  email,
  password
) {

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

  return {
    id: usuario.id,
    name: usuario.name,
    surname: usuario.surname,
    email: usuario.email,
    role: usuario.role
  };

}