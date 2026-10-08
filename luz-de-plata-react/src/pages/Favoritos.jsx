import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerFavoritos, guardarFavoritos } from "../utils/favoritos";
import "../css/estilos.css";

function Favoritos() {
  const [favoritos, setFavoritos] = useState(obtenerFavoritos());

  useEffect(() => {
    function actualizarFavoritos() {
      setFavoritos(obtenerFavoritos());
    }

    window.addEventListener("favoritosActualizados", actualizarFavoritos);

    return () => {
      window.removeEventListener("favoritosActualizados", actualizarFavoritos);
    };
  }, []);

  function eliminarFavorito(id) {
    const nuevosFavoritos = favoritos.filter((producto) => producto.id !== id);

    setFavoritos(nuevosFavoritos);
    guardarFavoritos(nuevosFavoritos);
  }

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>Favoritos</h1>

          <p className="bajada">
            Guarda tus joyas favoritas para verlas más tarde.
          </p>
        </div>
      </section>

      <section className="seccion--corta">
        <div className="contenedor">
          {favoritos.length === 0 ? (
            <div className="mensaje-vacio">No tienes productos favoritos.</div>
          ) : (
            <div className="productos-grid">
              {favoritos.map((producto) => (
                <article className="producto-card" key={producto.id}>
                  <div className="producto-card__imagen">
                    <Link to={`/producto/${producto.id}`}>
                      <img src={producto.image} alt={producto.name} />
                    </Link>
                  </div>

                  <div className="producto-card__cuerpo">
                    <span className="producto-card__categoria">
                      {producto.category}
                    </span>

                    <h3>{producto.name}</h3>

                    <p className="producto-card__precio">
                      ${producto.price.toLocaleString("es-CL")}
                    </p>

                    <div className="producto-card__acciones">
                      <Link
                        to={`/producto/${producto.id}`}
                        className="boton boton--claro"
                      >
                        Ver detalle
                      </Link>

                      <button
                        type="button"
                        className="boton"
                        onClick={() => eliminarFavorito(producto.id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Favoritos;
