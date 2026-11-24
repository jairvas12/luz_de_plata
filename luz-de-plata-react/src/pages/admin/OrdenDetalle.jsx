import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../../services/api";

function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(valor ?? 0));
}

function formatearFecha(valor) {
  if (!valor) return "Sin fecha";

  const fecha = new Date(valor);

  return Number.isNaN(fecha.getTime())
    ? String(valor)
    : fecha.toLocaleString("es-CL");
}

function OrdenDetalle() {
  const { id } = useParams();

  const [orden, setOrden] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarDetalle() {
      setCargando(true);
      setError("");
      setOrden(null);

      try {
        const respuesta = await apiRequest(
          `/boletas/${encodeURIComponent(id)}`,
        );

        if (activo) {
          setOrden(respuesta);
        }
      } catch (err) {
        if (activo) {
          setError(err.message || "No se pudo cargar la orden.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarDetalle();

    return () => {
      activo = false;
    };
  }, [id]);

  if (cargando) {
    return <p>Cargando detalle de la orden...</p>;
  }

  if (error || !orden) {
    return (
      <>
        <h1>Detalle de orden</h1>

        <p role="alert" style={{ color: "red" }}>
          {error || "No se encontró la orden."}
        </p>

        <Link className="boton boton--claro" to="/admin/ordenes">
          Volver a órdenes
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Orden {orden.numeroOrden ?? `#${orden.id}`}</h1>

          <p className="muted">Información de la compra registrada.</p>
        </div>

        <Link className="boton boton--claro" to="/admin/ordenes">
          Volver a órdenes
        </Link>
      </div>

      <div className="admin-card">
        <p>
          <strong>ID de la orden:</strong> {orden.id}
        </p>

        <p>
          <strong>Cliente:</strong> {orden.usuarioEmail ?? "Sin correo"}
        </p>

        <p>
          <strong>ID del cliente:</strong> {orden.usuarioId ?? "No disponible"}
        </p>

        <p>
          <strong>Fecha:</strong> {formatearFecha(orden.fecha)}
        </p>

        <p>
          <strong>Estado:</strong> {orden.estado ?? "Sin estado"}
        </p>

        <p>
          <strong>Total:</strong> {formatearPrecio(orden.total)}
        </p>
      </div>

      <section style={{ marginTop: "24px" }}>
        <h2>Productos comprados</h2>

        {!Array.isArray(orden.detalles) || orden.detalles.length === 0 ? (
          <p className="muted">No hay detalles de productos disponibles.</p>
        ) : (
          <div className="tabla-wrap">
            <table className="tabla">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {orden.detalles.map((detalle) => (
                  <tr key={detalle.id}>
                    <td>{detalle.nombreProducto}</td>

                    <td>{detalle.cantidad}</td>

                    <td>{formatearPrecio(detalle.precioUnitario)}</td>

                    <td>{formatearPrecio(detalle.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

export default OrdenDetalle;
