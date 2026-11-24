import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { obtenerProductos } from "../../services/productosService";
import { listarUsuariosApi } from "../../services/adminUsuariosApi";
import { apiRequest } from "../../services/api";

function obtenerSesion() {
  try {
    return JSON.parse(localStorage.getItem("lp_session_v1") || "null");
  } catch {
    return null;
  }
}

function AdminInicio() {
  const sesion = obtenerSesion();

  const rol = String(sesion?.role ?? "")
    .trim()
    .toUpperCase();

  const esAdministrador = rol === "ADMINISTRADOR";

  const [cantidadProductos, setCantidadProductos] = useState(null);
  const [stockCritico, setStockCritico] = useState(null);
  const [cantidadUsuarios, setCantidadUsuarios] = useState(null);
  const [cantidadOrdenes, setCantidadOrdenes] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarResumen() {
      setCargando(true);
      setError("");

      const consultas = [obtenerProductos(), apiRequest("/boletas")];

      if (esAdministrador) {
        consultas.push(listarUsuariosApi());
      }

      const resultados = await Promise.allSettled(consultas);

      if (!activo) return;

      const resultadoProductos = resultados[0];
      const resultadoOrdenes = resultados[1];
      const resultadoUsuarios = esAdministrador ? resultados[2] : null;

      if (resultadoProductos.status === "fulfilled") {
        const productos = resultadoProductos.value;

        setCantidadProductos(productos.length);

        setStockCritico(
          productos.filter((producto) => {
            return (
              producto.criticalStock != null &&
              producto.stock <= Number(producto.criticalStock)
            );
          }).length,
        );
      } else {
        setError("No se pudo consultar el resumen de productos.");
      }

      if (
        resultadoOrdenes.status === "fulfilled" &&
        Array.isArray(resultadoOrdenes.value)
      ) {
        setCantidadOrdenes(resultadoOrdenes.value.length);
      }

      if (
        resultadoUsuarios?.status === "fulfilled" &&
        Array.isArray(resultadoUsuarios.value)
      ) {
        setCantidadUsuarios(resultadoUsuarios.value.length);
      }

      setCargando(false);
    }

    cargarResumen();

    return () => {
      activo = false;
    };
  }, [esAdministrador]);

  function mostrarCantidad(valor) {
    if (cargando) return "...";
    return valor === null ? "—" : valor;
  }

  return (
    <div>
      <h1>{esAdministrador ? "Hola, administrador" : "Panel de vendedor"}</h1>

      <p className="muted">
        {esAdministrador
          ? "Resumen general de Luz de Plata."
          : "Consulta los productos y las órdenes de la tienda."}
      </p>

      {error && (
        <p role="alert" style={{ color: "#a33" }}>
          {error}
        </p>
      )}

      <div className="metricas">
        <article className="metrica">
          Productos
          <strong>{mostrarCantidad(cantidadProductos)}</strong>
        </article>

        {esAdministrador && (
          <article className="metrica">
            Usuarios
            <strong>{mostrarCantidad(cantidadUsuarios)}</strong>
          </article>
        )}

        <article className="metrica">
          Órdenes
          <strong>{mostrarCantidad(cantidadOrdenes)}</strong>
        </article>

        <article className="metrica">
          Stock crítico
          <strong>{mostrarCantidad(stockCritico)}</strong>
        </article>
      </div>

      <section className="admin-card" style={{ marginTop: "24px" }}>
        <h2>
          {esAdministrador
            ? "Administración de Luz de Plata"
            : "Consultas del vendedor"}
        </h2>

        {esAdministrador ? (
          <p>
            Como administrador puedes gestionar productos, usuarios y consultar
            las órdenes del sistema.
          </p>
        ) : (
          <p>
            Como vendedor puedes consultar productos, órdenes y sus detalles,
            sin realizar modificaciones administrativas.
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <Link className="boton boton--claro" to="/admin/productos">
            Ver productos
          </Link>

          <Link className="boton boton--claro" to="/admin/ordenes">
            Ver órdenes
          </Link>

          {esAdministrador && (
            <Link className="boton" to="/admin/usuarios">
              Administrar usuarios
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminInicio;
