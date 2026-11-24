import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  obtenerCarrito,
  guardarCarrito,
  vaciarCarrito,
} from "../utils/carrito";

import { apiRequest } from "../services/api";

import "../css/estilos.css";

// Mostrar precios en pesos chilenos
function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(precio ?? 0));
}

// Leer el rol del usuario autenticado
function obtenerRolActual() {
  try {
    const sesion = JSON.parse(localStorage.getItem("lp_session_v1") || "null");

    return String(sesion?.role ?? "")
      .trim()
      .toUpperCase();
  } catch {
    return "";
  }
}

function Carrito() {
  const navigate = useNavigate();

  const [carrito, setCarrito] = useState(() => obtenerCarrito());

  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  // Evitar envíos duplicados
  const enviandoRef = useRef(false);

  // Actualizar cantidad de un producto
  function actualizarCantidad(id, cambio) {
    if (enviandoRef.current) return;

    const nuevoCarrito = carrito
      .map((item) => {
        if (String(item.id) !== String(id)) {
          return item;
        }

        const cantidadActual = Number(item.cantidad) || 0;
        const stockDisponible = Number(item.stock);

        let nuevaCantidad = cantidadActual + cambio;

        if (Number.isFinite(stockDisponible)) {
          nuevaCantidad = Math.min(nuevaCantidad, stockDisponible);
        }

        return {
          ...item,
          cantidad: nuevaCantidad,
        };
      })
      .filter((item) => item.cantidad > 0);

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
    setError("");
  }

  // Eliminar producto del carrito
  function eliminarProducto(id) {
    if (enviandoRef.current) return;

    const nuevoCarrito = carrito.filter(
      (item) => String(item.id) !== String(id),
    );

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
    setError("");
  }

  // Total visual del carrito
  const subtotal = carrito.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.cantidad || 0),
    0,
  );

  // Confirmar compra mediante Spring Boot
  async function finalizarCompra() {
    if (enviandoRef.current || carrito.length === 0) {
      return;
    }

    setError("");

    // El backend exige un JWT válido
    const token = localStorage.getItem("token");
    const rol = obtenerRolActual();

    if (!token) {
      setError("Debes iniciar sesión como cliente para finalizar la compra.");
      return;
    }

    if (rol !== "CLIENTE" && rol !== "ADMINISTRADOR") {
      setError(
        "Esta cuenta no tiene permisos para realizar compras. " +
          "Ingresa con una cuenta de cliente.",
      );
      return;
    }

    // Preparar los datos exigidos por CompraRequest.java
    const items = carrito.map((item) => ({
      productoId: Number(item.id),
      cantidad: Number(item.cantidad),
    }));

    // Validar IDs y cantidades
    const datosValidos = items.every(
      (item) =>
        Number.isSafeInteger(item.productoId) &&
        item.productoId > 0 &&
        Number.isSafeInteger(item.cantidad) &&
        item.cantidad > 0,
    );

    if (!datosValidos) {
      setError(
        "El carrito contiene productos o cantidades inválidas. " +
          "Vuelve a agregarlos desde el catálogo.",
      );
      return;
    }

    enviandoRef.current = true;
    setProcesando(true);

    try {
      // POST /api/v1/boletas
      const boleta = await apiRequest("/boletas", {
        method: "POST",
        body: JSON.stringify({
          items,
        }),
      });

      // Confirmar que el servidor devolvió una boleta
      if (!boleta || !boleta.id) {
        throw new Error("El servidor no confirmó correctamente la compra.");
      }

      // Vaciar el carrito únicamente después de la respuesta exitosa
      vaciarCarrito();
      setCarrito([]);

      // Llevar al cliente a la página de confirmación
      navigate("/Compra_Exitosa", {
        replace: true,
        state: {
          boleta,
        },
      });
    } catch (err) {
      setError(
        err.message || "No se pudo completar la compra. Inténtalo nuevamente.",
      );
    } finally {
      enviandoRef.current = false;
      setProcesando(false);
    }
  }

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>Carrito</h1>

          <p className="bajada">Revisa los productos antes de continuar.</p>
        </div>
      </section>

      <section className="seccion--corta">
        <div className="contenedor">
          {error && (
            <p
              role="alert"
              style={{
                color: "#a33",
                marginBottom: "20px",
              }}
            >
              {error}
            </p>
          )}

          {carrito.length === 0 ? (
            <>
              <p>Tu carrito está vacío.</p>

              <button
                type="button"
                className="boton"
                onClick={() => navigate("/Catalogo")}
              >
                Ver catálogo
              </button>
            </>
          ) : (
            <>
              <div className="carrito-lista">
                {carrito.map((item) => (
                  <article className="carrito-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="carrito-item__info">
                      <h3>{item.name}</h3>

                      <p>{formatearPrecio(item.price)}</p>

                      <div className="carrito-item__cantidad">
                        <button
                          type="button"
                          disabled={procesando}
                          onClick={() => actualizarCantidad(item.id, -1)}
                        >
                          -
                        </button>

                        <span>{item.cantidad}</span>

                        <button
                          type="button"
                          disabled={
                            procesando ||
                            Number(item.cantidad) >= Number(item.stock)
                          }
                          onClick={() => actualizarCantidad(item.id, 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="boton boton--claro"
                        disabled={procesando}
                        onClick={() => eliminarProducto(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="carrito-item__subtotal">
                      {formatearPrecio(
                        Number(item.price) * Number(item.cantidad),
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <div className="carrito-resumen">
                <h2>Resumen</h2>

                <p>Subtotal: {formatearPrecio(subtotal)}</p>

                <p>
                  <strong>Total estimado: {formatearPrecio(subtotal)}</strong>
                </p>

                <p className="muted">
                  El precio final y el stock serán verificados por el servidor.
                </p>

                <button
                  type="button"
                  className="boton"
                  disabled={procesando}
                  onClick={finalizarCompra}
                >
                  {procesando ? "Procesando compra..." : "Finalizar compra"}
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Carrito;
