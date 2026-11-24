import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { obtenerProductoPorId } from "../services/productosService";
import { agregarAlCarrito } from "../utils/carrito";

import "../css/estilos.css";

function DetalleProducto() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Consultar el producto desde Spring Boot
  useEffect(() => {
    let activo = true;

    async function cargarProducto() {
      setCargando(true);
      setError("");
      setMensaje("");
      setProducto(null);

      try {
        const datos = await obtenerProductoPorId(id);

        if (activo) {
          setProducto(datos);
        }
      } catch (err) {
        if (activo) {
          setError(err.message || "No se pudo cargar el producto");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProducto();

    return () => {
      activo = false;
    };
  }, [id]);

  // Agregar producto al carrito local
  function manejarAgregarCarrito() {
    if (!producto || producto.stock <= 0) {
      return;
    }

    agregarAlCarrito(producto);

    setMensaje("Producto agregado al carrito correctamente.");
  }

  // Pantalla de carga
  if (cargando) {
    return (
      <main>
        <section className="seccion--corta">
          <div className="contenedor">
            <p>Cargando producto desde MySQL...</p>
          </div>
        </section>
      </main>
    );
  }

  // Producto inexistente o error de conexión
  if (error || !producto) {
    return (
      <main>
        <section className="seccion--corta">
          <div className="contenedor">
            <h1>No se pudo mostrar el producto</h1>

            <p role="alert">{error || "Producto no encontrado"}</p>

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
          {/* Imagen del producto */}
          <div className="detalle-producto__imagen">
            <img src={producto.image} alt={producto.name} />
          </div>

          {/* Información del producto */}
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

            {/* Botones */}
            <div className="detalle-producto__acciones">
              <button
                type="button"
                className="boton"
                disabled={producto.stock <= 0}
                onClick={manejarAgregarCarrito}
              >
                {producto.stock <= 0 ? "Sin stock" : "Añadir al carrito"}
              </button>

              <Link to="/Catalogo" className="boton boton--claro">
                Volver al catálogo
              </Link>
            </div>

            {mensaje && <p role="status">{mensaje}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}

export default DetalleProducto;
