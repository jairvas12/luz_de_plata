import { useEffect, useState } from "react";
import "../css/estilos.css";
import { obtenerProductos } from "../services/productosService";
import ProductoCard from "../components/ProductoCard";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [orden, setOrden] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      setCargando(true);
      setError("");

      try {
        const datos = await obtenerProductos();

        if (activo) {
          setProductos(datos);
        }
      } catch (err) {
        if (activo) {
          setError(err.message);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  let productosFiltrados = [...productos];

  // Filtrar por categoría
  if (categoria) {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.category === categoria,
    );
  }

  // Ordenar por precio de menor a mayor
  if (orden === "precio-asc") {
    productosFiltrados.sort((a, b) => a.price - b.price);
  }

  // Ordenar por precio de mayor a menor
  if (orden === "precio-desc") {
    productosFiltrados.sort((a, b) => b.price - a.price);
  }

  // Ordenar alfabéticamente
  if (orden === "nombre") {
    productosFiltrados.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>CATÁLOGO</h1>

          <p className="bajada">
            Explora nuestras joyas por categoría, precio o nombre.
          </p>

          <div className="categorias">
            <button
              type="button"
              className="categoria-chip"
              onClick={() => setCategoria("")}
            >
              Todas
            </button>

            <button
              type="button"
              className="categoria-chip"
              onClick={() => setCategoria("Aros")}
            >
              Aros
            </button>

            <button
              type="button"
              className="categoria-chip"
              onClick={() => setCategoria("Cadenas")}
            >
              Cadenas
            </button>

            <button
              type="button"
              className="categoria-chip"
              onClick={() => setCategoria("Pulseras")}
            >
              Pulseras
            </button>

            <button
              type="button"
              className="categoria-chip"
              onClick={() => setCategoria("Dijes")}
            >
              Dijes
            </button>
          </div>
        </div>
      </section>

      <section className="seccion--corta">
        <div className="contenedor">
          <div className="toolbar">
            <span>
              {cargando
                ? "Cargando productos..."
                : `${productosFiltrados.length} producto(s)`}
            </span>

            <div className="toolbar__grupo">
              <label>
                Categoría
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Todas</option>
                  <option value="Aros">Aros</option>
                  <option value="Cadenas">Cadenas</option>
                  <option value="Pulseras">Pulseras</option>
                  <option value="Dijes">Dijes</option>
                </select>
              </label>

              <label>
                Orden
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                >
                  <option value="">Recomendados</option>
                  <option value="precio-asc">Precio menor a mayor</option>
                  <option value="precio-desc">Precio mayor a menor</option>
                  <option value="nombre">Nombre A-Z</option>
                </select>
              </label>
            </div>
          </div>

          {cargando && <p>Cargando productos desde MySQL...</p>}

          {!cargando && error && (
            <p role="alert">Error al cargar productos: {error}</p>
          )}

          {!cargando && !error && productosFiltrados.length === 0 && (
            <p>No hay productos disponibles para esta categoría.</p>
          )}

          {!cargando && !error && (
            <div className="productos-grid">
              {productosFiltrados.map((producto) => (
                <ProductoCard key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Catalogo;
