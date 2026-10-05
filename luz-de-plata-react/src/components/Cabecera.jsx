import "../css/estilos.css";


function Cabecera() {
  return (
    <>
      <header>
        <div className="cabecera">
          <a className="logo" href="/">
            <img alt="Luz de Plata joyas" src="/img/logo/logo-lp.png" />
          </a>
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
            <button aria-label="Buscar">⌕</button>
          </div>
          <div className="acciones">
            <a className="accion" href="favoritos.html">
              <span className="accion__icono">♡</span>
              <span className="accion__texto">Favoritos</span>
            </a>
            <a className="accion" href="/Login">
              <span className="accion__icono">♙</span>
              <span className="usuario-estado" data-user-state="">
                Cuenta
              </span>
            </a>
            <a className="accion" href="carrito.html">
              <span className="accion__icono">🛒</span>
              <span className="accion__texto">Carrito</span>
              <span className="contador" data-cart-count="">
                0
              </span>
            </a>
            <button
              className="accion accion--boton oculto"
              data-logout=""
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
