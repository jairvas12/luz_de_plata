import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { obtenerProductos } from "../../services/productosService";
import { apiRequest } from "../../services/api";

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

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [eliminando, setEliminando] = useState(null);

  const esAdministrador = obtenerRolActual() === "ADMINISTRADOR";

  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      setCargando(true);
      setError("");

      try {
        const datos = await obtenerProductos();

        if (activo) {
          setProductos(datos);
        }
      } catch (err) {
        if (activo) {
          setError(err.message || "No se pudieron cargar los productos.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(precio);
  }

  function stockEsCritico(producto) {
    return (
      producto.criticalStock !== "" &&
      producto.criticalStock != null &&
      producto.stock <= Number(producto.criticalStock)
    );
  }

  async function eliminarProducto(producto) {
    if (!esAdministrador || eliminando !== null) {
      return;
    }

    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar "${producto.name}"?\n\n` +
        "Esta acción eliminará el producto de MySQL.",
    );

    if (!confirmar) {
      return;
    }

    setError("");
    setMensaje("");
    setEliminando(producto.id);

    try {
      await apiRequest(`/productos/${encodeURIComponent(producto.id)}`, {
        method: "DELETE",
      });

      setProductos((actuales) =>
        actuales.filter((item) => item.id !== producto.id),
      );

      setMensaje("Producto eliminado correctamente.");
    } catch (err) {
      setError(
        err.message ||
          "No se pudo eliminar el producto. Puede estar asociado a una compra.",
      );
    } finally {
      setEliminando(null);
    }
  }

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Productos</h1>

          <p className="muted">
            {esAdministrador
              ? "Consulta y administra los productos de MySQL."
              : "Consulta los productos disponibles y su stock."}
          </p>
        </div>

        {esAdministrador && (
          <Link className="boton" to="/admin/productos/nuevo">
            + Nuevo producto
          </Link>
        )}
      </div>

      {mensaje && <p role="status">{mensaje}</p>}

      {error && (
        <p role="alert" style={{ color: "#a33" }}>
          {error}
        </p>
      )}

      {cargando && <p>Cargando productos desde MySQL...</p>}

      {!cargando && !error && productos.length === 0 && (
        <p>No hay productos registrados.</p>
      )}

      {!cargando && productos.length > 0 && (
        <div className="tabla-wrap">
          <table className="tabla">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <img
                      src={producto.image}
                      alt={producto.name}
                      style={{
                        width: "65px",
                        height: "65px",
                        objectFit: "cover",
                      }}
                    />
                  </td>

                  <td>{producto.code}</td>

                  <td>{producto.name}</td>

                  <td>{producto.category}</td>

                  <td>{formatearPrecio(producto.price)}</td>

                  <td
                    className={stockEsCritico(producto) ? "stock-critico" : ""}
                  >
                    {producto.stock}
                  </td>

                  <td>
                    <div className="tabla-acciones">
                      <Link
                        className="boton boton--claro"
                        to={`/producto/${producto.id}`}
                      >
                        Ver
                      </Link>

                      {esAdministrador && (
                        <>
                          <Link
                            className="boton boton--claro"
                            to={`/admin/productos/editar/${producto.id}`}
                          >
                            Editar
                          </Link>

                          <button
                            className="boton boton--peligro"
                            type="button"
                            disabled={eliminando !== null}
                            onClick={() => eliminarProducto(producto)}
                          >
                            {eliminando === producto.id
                              ? "Eliminando..."
                              : "Eliminar"}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ProductosAdmin;
