import productos from "../data/productos";
const CLAVE_STOCK =
  "stockProductos";
export function obtenerStockGuardado() {
  const stock =
    localStorage.getItem(
      CLAVE_STOCK
    );
  if (!stock) {
    return {};
  }
  return JSON.parse(
    stock
  );
}

export function obtenerProductosConStock() {

  const stockGuardado = obtenerStockGuardado();

  return productos.map(
    (producto) => {const stockActual =  stockGuardado[producto.id];

      return {
        ...producto,
        stock:
          stockActual !== undefined
            ? stockActual
            : producto.stock,
      };
    }
  );
}

export function descontarStock(
  carrito
) {
  const productosActuales = obtenerProductosConStock();
  const nuevoStock = {...obtenerStockGuardado()
  };
  for (
    const item of carrito
  ) {
    const producto =
      productosActuales.find(
        (producto) =>
          producto.id === item.id
      );
    if (!producto) {
      return false;
    }
    if (
      item.cantidad
      >
      producto.stock
    ) {
      return false;
    }
    nuevoStock[
      producto.id
    ] =
      producto.stock
      -
      item.cantidad;
  }

  localStorage.setItem(
    CLAVE_STOCK,
    JSON.stringify(
      nuevoStock
    )
  );

  window.dispatchEvent(
    new Event(
      "stockActualizado"
    )
  );
  return true;
}