const CLAVE_FAVORITOS = "favoritos";

export function obtenerFavoritos() {
  const favoritosGuardados = localStorage.getItem(CLAVE_FAVORITOS);

  if (!favoritosGuardados) {
    return [];
  }

  return JSON.parse(favoritosGuardados);
}

export function guardarFavoritos(favoritos) {
  localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));

  window.dispatchEvent(new Event("favoritosActualizados"));
}

export function alternarFavorito(producto) {
  const favoritos = obtenerFavoritos();

  const existe = favoritos.some((item) => item.id === producto.id);

  let nuevosFavoritos;

  if (existe) {
    nuevosFavoritos = favoritos.filter((item) => item.id !== producto.id);
  } else {
    nuevosFavoritos = [...favoritos, producto];
  }

  guardarFavoritos(nuevosFavoritos);

  return nuevosFavoritos;
}

export function esFavorito(id) {
  const favoritos = obtenerFavoritos();

  return favoritos.some((item) => item.id === id);
}
