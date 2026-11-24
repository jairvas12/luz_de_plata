import { apiRequest } from "./api.js";

// Adaptar los productos del backend al formato de React
export function adaptarProducto(producto) {
  return {
    id: String(producto.id),
    code: producto.codigo ?? "",
    name: producto.nombre ?? "",
    description: producto.descripcion ?? "",
    price: Number(producto.precio ?? 0),
    stock: Number(producto.stock ?? 0),
    criticalStock: Number(producto.stockCritico ?? 0),
    category: producto.categoria?.nombre ?? "Sin categoría",
    image: producto.imagen || "/img/aros/1.webp",
    featured: Boolean(producto.destacado),
  };
}

// Obtener todos los productos de MySQL
export async function obtenerProductos() {
  const respuesta = await apiRequest("/productos");

  if (!Array.isArray(respuesta)) {
    throw new Error("La API no devolvió una lista de productos");
  }

  return respuesta.map(adaptarProducto);
}

// Obtener un producto específico por su ID
export async function obtenerProductoPorId(id) {
  const respuesta = await apiRequest(`/productos/${encodeURIComponent(id)}`);

  if (!respuesta || typeof respuesta !== "object") {
    throw new Error("El producto no existe");
  }

  return adaptarProducto(respuesta);
}
