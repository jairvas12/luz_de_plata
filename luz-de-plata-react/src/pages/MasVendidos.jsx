import productos from "../data/productos";
import "../css/estilos.css";

function MasVendidos() {

  const masVendidos =
    productos
      .filter(
        producto =>
          producto.featured
      )
      .slice(0, 8);

  return (
    <main>

      <section className="pagina-encabezado">

        <div className="contenedor">

          <h1>
            Más vendidos
          </h1>

          <p className="bajada">
            Las piezas preferidas por nuestra comunidad.
          </p>

        </div>

      </section>

      <section className="seccion--corta">

        <div className="contenedor">

          <div className="productos-grid">

            {masVendidos.map(
              producto => (

                <article
                  className="producto-card"
                  key={producto.id}
                >

                  <div className="producto-card__imagen">

                    <img
                      src={producto.image}
                      alt={producto.name}
                    />

                  </div>

                  <div className="producto-card__cuerpo">

                    <span className="producto-card__categoria">
                      {producto.category}
                    </span>

                    <h3>
                      {producto.name}
                    </h3>

                    <p className="producto-card__precio">
                      $
                      {producto.price
                        .toLocaleString(
                          "es-CL"
                        )}
                    </p>

                  </div>

                </article>

              )
            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default MasVendidos;