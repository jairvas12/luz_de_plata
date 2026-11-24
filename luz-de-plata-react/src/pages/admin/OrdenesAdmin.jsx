import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    : fecha.toLocaleDateString("es-CL");
}

function OrdenesAdmin() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarOrdenes() {
      setCargando(true);
      setError("");

      try {
        const respuesta = await apiRequest("/boletas");

        if (!Array.isArray(respuesta)) {
          throw new Error("El backend no devolvió una lista de órdenes.");
        }

        if (activo) {
          setOrdenes(respuesta);
        }
      } catch (err) {
        if (activo) {
          setError(err.message || "No se pudieron cargar las órdenes.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarOrdenes();

    return () => {
      activo = false;
    };
  }, []);

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Órdenes</h1>
          <p className="muted">
            Compras registradas en la base de datos MySQL.
          </p>
        </div>
      </div>

      {cargando && <p>Cargando órdenes...</p>}

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!cargando && !error && (
        <div className="tabla-wrap">
          <table className="tabla">
            <thead>
              <tr>
                <th>Número de orden</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {ordenes.length === 0 ? (
                <tr>
                  <td colSpan={6}>Aún no hay órdenes registradas.</td>
                </tr>
              ) : (
                ordenes.map((orden) => (
                  <tr key={orden.id}>
                    <td>{orden.numeroOrden ?? `#${orden.id}`}</td>

                    <td>{orden.usuarioEmail ?? "Sin correo"}</td>

                    <td>{formatearFecha(orden.fecha)}</td>

                    <td>{orden.estado}</td>

                    <td>{formatearPrecio(orden.total)}</td>

                    <td>
                      <Link
                        className="boton boton--claro"
                        to={`/admin/ordenes/${orden.id}`}
                      >
                        Ver detalle
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default OrdenesAdmin;
