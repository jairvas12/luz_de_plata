import '../css/estilos.css'

function Cabecera() {
  return (
    <header>
      <div className="cabecera">
        <a className="logo" href="index.html">
          <img alt="Luz de Plata joyas" src="img/logo/logo-lp.png" />
        </a>
        <htmlFor className="buscador" data-search-htmlFor="" role="search">
          <label className="oculto" for="busqueda-index">
            Buscar productos
          </label>
          <input
            aria-label="Buscar productos"
            id="busqueda-index"
            maxlength="80"
            placeholder="¿QUÉ BUSCAS?"
            type="search"
          />
          <button aria-label="Buscar">⌕</button>
        </htmlFor>
        <div className="acciones">
          <a className="accion" href="favoritos.html">
            <span className="accion__icono">♡</span>
            <span className="accion__texto">Favoritos</span>
          </a>
          <a className="accion" href="login.html">
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
  );
}

export default Cabecera;
