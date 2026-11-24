import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../services/api";

import "../css/estilos.css";

function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(valor ?? 0));
}

function formatearFecha(valor) {
  if (!valor) {
    return "Sin fecha";
  }

  const fecha = new Date(valor);

  if (Number.isNaN(fecha.getTime())) {
    return String(valor);
  }

  return fecha.toLocaleString("es-CL");
}

function MisCompras() {
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [compraAbierta, setCompraAbierta] = useState(null);
  const [detalle, setDetalle] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [errorDetalle, setErrorDetalle] = useState("");

  const tieneToken = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    let activo = true;

    async function cargarCompras() {
      if (!localStorage.getItem("token")) {
        setCargando(false);
        return;
      }

      setCargando(true);
      setError("");

      try {
        const respuesta = await apiRequest("/boletas/mis");

        if (!Array.isArray(respuesta)) {
          throw new Error("El servidor no devolvió una lista de compras.");
        }

        const comprasOrdenadas = [...respuesta].sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha),
        );

        if (activo) {
          setCompras(comprasOrdenadas);
        }
      } catch (err) {
        if (activo) {
          setError(err.message || "No se pudieron cargar tus compras.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarCompras();

    return () => {
      activo = false;
    };
  }, []);

  async function cambiarBoleta(id) {
    if (cargandoDetalle) {
      return;
    }

    if (compraAbierta === id) {
      setCompraAbierta(null);
      setDetalle(null);
      setErrorDetalle("");
      return;
    }

    setCompraAbierta(id);
    setDetalle(null);
    setErrorDetalle("");
    setCargandoDetalle(true);

    try {
      const respuesta = await apiRequest(
        `/boletas/mis/${encodeURIComponent(id)}`,
      );

      setDetalle(respuesta);
    } catch (err) {
      setErrorDetalle(err.message || "No se pudo cargar la boleta.");
    } finally {
      setCargandoDetalle(false);
    }
  }

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>Mis compras</h1>

          <p className="bajada">
            Revisa tus compras y el detalle de cada boleta.
          </p>
        </div>
      </section>

      <div className="contenedor">
        <nav aria-label="Área de compras" className="sub-navegador">
          <ul>
            <li>
              <Link to="/Envios">ENVÍOS</Link>
            </li>

            <li>
              <Link to="/MisCompras" aria-current="page">
                MIS COMPRAS
              </Link>
            </li>

            <li>
              <Link to="/MisEnvios">MIS ENVÍOS</Link>
            </li>
          </ul>
        </nav>
      </div>

      <section className="seccion--corta">
        <div className="contenedor historial">
          {!tieneToken && (
            <div className="mensaje-vacio">
              <p>Debes iniciar sesión para consultar tus compras.</p>

              <Link className="boton" to="/Login">
                Iniciar sesión
              </Link>
            </div>
          )}

          {tieneToken && cargando && <p>Cargando compras desde MySQL...</p>}

          {tieneToken && error && (
            <p role="alert" style={{ color: "#a33" }}>
              {error}
            </p>
          )}

          {tieneToken && !cargando && !error && compras.length === 0 && (
            <div className="mensaje-vacio">
              <p>Aún no registras compras.</p>

              <Link className="boton" to="/Catalogo">
                Ver catálogo
              </Link>
            </div>
          )}

          {tieneToken && !cargando && !error && compras.length > 0 && (
            <div className="compras-lista">
              {compras.map((compra) => {
                const abierta = compraAbierta === compra.id;

                const productos = Array.isArray(detalle?.detalles)
                  ? detalle.detalles
                  : [];

                return (
                  <article className="compra-card" key={compra.id}>
                    <div className="compra-card__cabecera">
                      <div>
                        <span className="compra-card__estado">
                          {compra.estado}
                        </span>

                        <h2>{compra.numeroOrden ?? `#${compra.id}`}</h2>

                        <p>Fecha: {formatearFecha(compra.fecha)}</p>
                      </div>

                      <div className="compra-card__total">
                        <span>Total</span>

                        <strong>{formatearPrecio(compra.total)}</strong>
                      </div>
                    </div>

                    <button
                      className="boton boton--claro"
                      type="button"
                      disabled={cargandoDetalle}
                      onClick={() => cambiarBoleta(compra.id)}
                    >
                      {abierta ? "Ocultar boleta" : "Ver boleta"}
                    </button>

                    {abierta && (
                      <div className="boleta">
                        {cargandoDetalle && <p>Cargando detalle...</p>}

                        {errorDetalle && (
                          <p role="alert" style={{ color: "#a33" }}>
                            {errorDetalle}
                          </p>
                        )}

                        {!cargandoDetalle && detalle && (
                          <>
                            <div className="boleta__encabezado">
                              <div>
                                <h3>Luz de Plata</h3>
                                <p>Joyería online</p>
                              </div>

                              <div>
                                <strong>BOLETA</strong>

                                <p>{detalle.numeroOrden}</p>
                              </div>
                            </div>

                            <div className="boleta__datos">
                              <p>
                                <strong>Fecha:</strong>{" "}
                                {formatearFecha(detalle.fecha)}
                              </p>

                              <p>
                                <strong>Estado:</strong> {detalle.estado}
                              </p>
                            </div>

                            <div className="boleta__tabla-contenedor">
                              <table className="boleta__tabla">
                                <thead>
                                  <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {productos.length === 0 ? (
                                    <tr>
                                      <td colSpan={4}>
                                        No hay productos disponibles.
                                      </td>
                                    </tr>
                                  ) : (
                                    productos.map((producto) => (
                                      <tr key={producto.id}>
                                        <td>{producto.nombreProducto}</td>

                                        <td>{producto.cantidad}</td>

                                        <td>
                                          {formatearPrecio(
                                            producto.precioUnitario,
                                          )}
                                        </td>

                                        <td>
                                          {formatearPrecio(producto.subtotal)}
                                        </td>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </div>

                            <div className="boleta__total">
                              <span>Total pagado</span>

                              <strong>{formatearPrecio(detalle.total)}</strong>
                            </div>

                            <p className="boleta__nota">
                              Comprobante demostrativo. No corresponde a un
                              documento tributario.
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default MisCompras;
