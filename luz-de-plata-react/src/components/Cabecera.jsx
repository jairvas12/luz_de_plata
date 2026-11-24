import "../css/estilos.css";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { obtenerCarrito } from "../utils/carrito";

function obtenerSesion() {
  try {
    const sesionGuardada =
      localStorage.getItem("lp_session_v1");

    if (!sesionGuardada) {
      return null;
    }

    return JSON.parse(sesionGuardada);
  } catch {
    return null;
  }
}

function Cabecera() {
  const location = useLocation();

  const [cantidadCarrito, setCantidadCarrito] =
    useState(0);

  const [sesion, setSesion] =
    useState(() => obtenerSesion());

  // ==========================================
  // ACTUALIZAR SESIÓN AL CAMBIAR DE PÁGINA
  // ==========================================

  useEffect(() => {
    setSesion(obtenerSesion());
  }, [location.pathname]);

  // ==========================================
  // CONTADOR DEL CARRITO
  // ==========================================

  useEffect(() => {
    function actualizarContador() {
      const carrito = obtenerCarrito();

      const cantidadTotal = carrito.reduce(
        (total, item) =>
          total + item.cantidad,
        0,
      );

      setCantidadCarrito(
        cantidadTotal,
      );
    }

    actualizarContador();

    window.addEventListener(
      "carritoActualizado",
      actualizarContador,
    );

    return () => {
      window.removeEventListener(
        "carritoActualizado",
        actualizarContador,
      );
    };
  }, []);

  // ==========================================
  // CERRAR SESIÓN
  // ==========================================

  function cerrarSesion() {
    localStorage.removeItem("token");

    localStorage.removeItem(
      "lp_session_v1",
    );

    localStorage.removeItem("sesion");

    window.location.replace("/Login");
  }

  // ==========================================
  // DESTINO SEGÚN ROL
  // ==========================================

  const rol = String(
    sesion?.role ?? "",
  )
    .trim()
    .toUpperCase();

  let rutaCuenta = "/Login";

  if (rol === "CLIENTE") {
    rutaCuenta = "/MisCompras";
  }

  if (
    rol === "ADMINISTRADOR"
    || rol === "VENDEDOR"
  ) {
    rutaCuenta = "/admin";
  }

  return (
    <>
      <header>
        <div className="cabecera">
          <Link
            className="logo"
            to="/"
          >
            <img
              alt="Luz de Plata joyas"
              src="/img/logo/logo-lp.png"
            />
          </Link>

          <div
            className="buscador"
            role="search"
          >
            <label
              className="oculto"
              htmlFor="busqueda-index"
            >
              Buscar productos
            </label>

            <input
              aria-label="Buscar productos"
              id="busqueda-index"
              maxLength="80"
              placeholder="¿QUÉ BUSCAS?"
              type="search"
            />

            <button
              type="button"
              aria-label="Buscar"
            >
              ⌕
            </button>
          </div>

          <div className="acciones">
            <Link
              className="accion"
              to="/Favoritos"
            >
              <span className="accion__icono">
                ♡
              </span>

              <span className="accion__texto">
                Favoritos
              </span>
            </Link>

            <Link
              className="accion"
              to={rutaCuenta}
            >
              <span className="accion__icono">
                ♙
              </span>

              <span className="usuario-estado">
                {sesion
                  ? sesion.name
                  : "Cuenta"}
              </span>
            </Link>

            <Link
              className="accion"
              to="/Carrito"
            >
              <span className="accion__icono">
                🛒
              </span>

              <span className="accion__texto">
                Carrito
              </span>

              <span className="contador">
                {cantidadCarrito}
              </span>
            </Link>

            {sesion && (
              <button
                className="accion accion--boton"
                title="Cerrar sesión"
                type="button"
                onClick={cerrarSesion}
              >
                <span className="accion__icono">
                  ↪
                </span>

                <span className="accion__texto">
                  Salir
                </span>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Cabecera;