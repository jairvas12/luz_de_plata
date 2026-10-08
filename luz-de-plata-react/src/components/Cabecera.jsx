import "../css/estilos.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerCarrito } from "../utils/carrito";

function Cabecera() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  useEffect(() => {
    function actualizarContador() {
      const carrito = obtenerCarrito();

      const cantidadTotal = carrito.reduce(
        (total, item) => total + item.cantidad,
        0,
      );

      setCantidadCarrito(cantidadTotal);
    }

    actualizarContador();

    window.addEventListener("carritoActualizado", actualizarContador);

    return () => {
      window.removeEventListener("carritoActualizado", actualizarContador);
    };
  }, []);

  return (
    <>
      <header>
        <div className="cabecera">
          <Link className="logo" to="/">
            <img alt="Luz de Plata joyas" src="/img/logo/logo-lp.png" />
          </Link>

          <div className="buscador" role="search">
            <label className="oculto" htmlFor="busqueda-index">
              Buscar productos
            </label>

            <input
              aria-label="Buscar productos"
              id="busqueda-index"
              maxLength="80"
              placeholder="¿QUÉ BUSCAS?"
              type="search"
            />

            <button type="button" aria-label="Buscar">
              ⌕
            </button>
          </div>

          <div className="acciones">
            <a className="accion" href="favoritos.html">
              <span className="accion__icono">♡</span>

              <span className="accion__texto">Favoritos</span>
            </a>

            <Link className="accion" to="/Login">
              <span className="accion__icono">♙</span>

              <span className="usuario-estado">Cuenta</span>
            </Link>

            <Link className="accion" to="/Carrito">
              <span className="accion__icono">🛒</span>

              <span className="accion__texto">Carrito</span>

              <span className="contador">{cantidadCarrito}</span>
            </Link>

            <button
              className="accion accion--boton oculto"
              title="Cerrar sesión"
              type="button"
            >
              <span className="accion__icono">↪</span>

              <span className="accion__texto">Salir</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Cabecera;
