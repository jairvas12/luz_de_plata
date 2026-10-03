import '../css/estilos.css'
function Nav() {
  return (
    <nav aria-label="Navegación principal" className="menu-principal">
      <ul>
        <li>
          <a aria-current="page" href="/">
            INICIO
          </a>
        </li>
        <li>
          <a href="/MasVendidos">MÁS VENDIDOS</a>
        </li>
        <li>
          <a href="catalogo.html">CATÁLOGO</a>
        </li>
        <li>
          <a href="/Envios">ENVÍOS</a>
        </li>
        <li>
          <a href="conocenos.html">CONÓCENOS</a>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;