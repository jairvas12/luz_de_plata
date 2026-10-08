import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { alternarFavorito, esFavorito } from "../utils/favoritos";

function ProductoCard({ producto }) {
  const [favorito, setFavorito] = useState(esFavorito(producto.id));

  useEffect(() => {
    function actualizarFavorito() {
      setFavorito(esFavorito(producto.id));
    }

    window.addEventListener("favoritosActualizados", actualizarFavorito);

    return () => {
      window.removeEventListener("favoritosActualizados", actualizarFavorito);
    };
  }, [producto.id]);

  function manejarFavorito() {
    alternarFavorito(producto);

    setFavorito(esFavorito(producto.id));
  }

  return (
    <article className="producto-card">
      <div className="producto-card__imagen">
        <Link to={`/producto/${producto.id}`}>
          <img src={producto.image} alt={producto.name} />
        </Link>

        <button
          type="button"
          className="producto-card__favorito"
          onClick={manejarFavorito}
          aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {favorito ? "♥" : "♡"}
        </button>
      </div>

      <div className="producto-card__cuerpo">
        <span className="producto-card__categoria">{producto.category}</span>

        <h3>{producto.name}</h3>

        <p className="producto-card__precio">
          ${producto.price.toLocaleString("es-CL")}
        </p>

        <div className="producto-card__acciones">
          <Link to={`/producto/${producto.id}`} className="boton boton--claro">
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductoCard;
