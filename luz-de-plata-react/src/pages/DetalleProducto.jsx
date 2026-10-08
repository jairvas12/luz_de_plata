import { useParams, Link } from "react-router-dom";
import productos from "../data/productos";
import "../css/estilos.css";

function DetalleProducto() {
  const { id } = useParams();

  const producto = productos.find((producto) => producto.id === id);

  if (!producto) {
    return (
      <main>
        <section className="seccion--corta">
          <div className="contenedor">
            <h1>Producto no encontrado</h1>

            <Link to="/Catalogo">Volver al catálogo</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="seccion--corta">
        <div className="contenedor detalle-producto">
          <div className="detalle-producto__imagen">
            <img src={producto.image} alt={producto.name} />
          </div>

          <div className="detalle-producto__info">
            <span className="producto-card__categoria">
              {producto.category}
            </span>

            <h1 className="producto-card__categoria">{producto.name}</h1>

            <p>Código: {producto.code}</p>

            <p className="producto-card__precio">
              ${producto.price.toLocaleString("es-CL")}
            </p>

            <p>{producto.description}</p>

            <p>Stock disponible: {producto.stock}</p>

            <div className="detalle-producto__acciones">
              <button
                type="button"
                className="boton"
                disabled={producto.stock <= 0}
              >
                {producto.stock <= 0 ? "Sin stock" : "Añadir al carrito"}
              </button>

              <Link to="/Catalogo" className="boton boton--claro">
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DetalleProducto;
