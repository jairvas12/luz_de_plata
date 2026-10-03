import "../css/estilos.css";
function Catalogo() {
  return (
    <>
      <main>
        <section className="pagina-encabezado">
          <div className="contenedor">
            <h1>Catálogo</h1>
            <p className="bajada">
              Explora nuestras joyas por categoría, precio o nombre.
            </p>
            <div className="categorias">
              <a className="categoria-chip" href="catalogo.html">
                Todas
              </a>
              <a className="categoria-chip" href="catalogo.html?categoria=Aros">
                Aros
              </a>
              <a className="categoria-chip" href="catalogo.html?categoria=Cadenas">
                Cadenas
              </a>
              <a className="categoria-chip" href="catalogo.html?categoria=Pulseras">
                Pulseras
              </a>
              <a className="categoria-chip" href="catalogo.html?categoria=Dijes">
                Dijes
              </a>
            </div>
          </div>
        </section>
        <section className="seccion--corta">
          <div className="contenedor">
            <div className="toolbar">
              <span data-result-count=""></span>
              <div className="toolbar__grupo">
                <label>
                  Categoría
                  <select id="filtro-categoria">
                    <option value="">Todas</option>
                    <option>Aros</option>
                    <option>Cadenas</option>
                    <option>Pulseras</option>
                    <option>Dijes</option>
                  </select>
                </label>
                <label>
                  Orden
                  <select id="orden-productos">
                    <option value="">Recomendados</option>
                    <option value="precio-asc">Precio menor a mayor</option>
                    <option value="precio-desc">Precio mayor a menor</option>
                    <option value="nombre">Nombre A-Z</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="productos-grid" data-catalog-grid=""></div>
          </div>
        </section>
      </main>
    </>
  );
}
export default Catalogo;
