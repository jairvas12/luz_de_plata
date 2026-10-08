const CLAVE_COMPRAS = "compras";
const CLAVE_ULTIMA_COMPRA = "ultimaCompra";

export function obtenerCompras() {
  const comprasGuardadas = localStorage.getItem(CLAVE_COMPRAS);

  if (!comprasGuardadas) {
    return [];
  }

  return JSON.parse(comprasGuardadas);
}

export function guardarCompra(carrito, total) {
  const compras = obtenerCompras();

  const nuevaCompra = {
    orden: `LP-${Date.now()}`,
    fecha: new Date().toLocaleDateString("es-CL"),
    productos: carrito,
    total: total,
  };

  compras.push(nuevaCompra);

  localStorage.setItem(CLAVE_COMPRAS, JSON.stringify(compras));

  localStorage.setItem(CLAVE_ULTIMA_COMPRA, JSON.stringify(nuevaCompra));

  return nuevaCompra;
}

export function obtenerUltimaCompra() {
  const compraGuardada = localStorage.getItem(CLAVE_ULTIMA_COMPRA);

  if (!compraGuardada) {
    return null;
  }

  return JSON.parse(compraGuardada);
}
