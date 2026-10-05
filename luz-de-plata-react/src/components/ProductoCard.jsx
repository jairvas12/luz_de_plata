function ProductoCard({
  producto
}) {

  return (

    <article className="producto-card">

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

  );

}

export default ProductoCard;