import productos from "../data/productos";
import ProductoCard from "../components/ProductoCard";
import "../css/estilos.css";
function Home() {
  const destacados = productos.filter((producto) => producto.featured);
  return (
    <>
      <section className="hero">
        <video className="hero__video" autoPlay muted loop playsInline>
          <source src="/video/inicio.mp4" type="video/mp4" />
        </video>
        <div className="contenedor hero__contenido">
          <p>PLATA 925 · DISEÑO ATEMPORAL</p>
          <h1>Joyas que iluminan cada momento</h1>
          <p>
            Descubre piezas seleccionadas para regalar, celebrar y acompañarte
            todos los días.
          </p>
          <a className="boton boton--claro" href="catalogo.html">
            Ver catálogo
          </a>
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor">
          <h2 className="titulo-seccion">Selección destacada</h2>

          <p className="bajada">Una muestra de nuestras joyas más elegidas.</p>
          <div className="productos-grid">
            {destacados.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </section>
      <div className="contenedor beneficios">
        <article className="beneficio">
          <strong>Compra segura</strong>
          <span>
            Tu selección se conserva localmente durante la navegación.
          </span>
        </article>
        <article className="beneficio">
          <strong>Envíos a Chile</strong>
          <span>Opciones de despacho con seguimiento simulado.</span>
        </article>
        <article className="beneficio">
          <strong>Atención cercana</strong>
          <span>Escríbenos desde el formulario de contacto.</span>
        </article>
      </div>
    </>
  );
}

export default Home;
