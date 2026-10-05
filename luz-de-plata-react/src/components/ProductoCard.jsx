import { Link } from "react-router-dom";

function ProductoCard({ producto }) {
  return (
    <article className="producto-card">
      <div className="producto-card__imagen">
        <Link to={`/producto/${producto.id}`}>
          <img src={producto.image} alt={producto.name} />
        </Link>
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
