import '../css/estilos.css'
function Nav() {
  return (
    <nav aria-label="Navegación principal" className="menu-principal">
      <ul>
        <li>
          <a aria-current="page" href="index.html">
            INICIO
          </a>
        </li>
        <li>
          <a href="mas-vendidos.html">MÁS VENDIDOS</a>
        </li>
        <li>
          <a href="catalogo.html">CATÁLOGO</a>
        </li>
        <li>
          <a href="envios.html">ENVÍOS</a>
        </li>
        <li>
          <a href="conocenos.html">CONÓCENOS</a>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;