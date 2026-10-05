import productos from "../data/productos";

function ProductosDestacados() {
  const destacados = productos.filter((producto) => producto.featured);

  return (
    <section className="seccion">
      <div className="contenedor">
        <h2 className="titulo-seccion">Selección destacada</h2>

        <p className="bajada">Una muestra de nuestras joyas más elegidas.</p>

        <div className="productos-grid">
          {destacados.map((producto) => (
            <article className="producto-card" key={producto.id}>
              <div className="producto-card__imagen">
                <img src={producto.image} alt={producto.name} />
              </div>

              <div className="producto-card__cuerpo">
                <span className="producto-card__categoria">
                  {producto.category}
                </span>

                <h3>{producto.name}</h3>

                <p className="producto-card__precio">
                  ${producto.price.toLocaleString("es-CL")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductosDestacados;
