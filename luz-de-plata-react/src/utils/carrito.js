const CLAVE_CARRITO = "carrito";

export function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

  if (!carritoGuardado) {
    return [];
  }

  return JSON.parse(carritoGuardado);
}

export function guardarCarrito(carrito) {
  localStorage.setItem(
    CLAVE_CARRITO,
    JSON.stringify(carrito)
  );

  window.dispatchEvent(
    new Event("carritoActualizado")
  );
}

export function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();

  const productoExistente = carrito.find(
    (item) => item.id === producto.id
  );

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
  }

  guardarCarrito(carrito);
}

export function vaciarCarrito() {
  guardarCarrito([]);
}