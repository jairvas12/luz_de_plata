import "../css/estilos.css";
function Conocenos() {
  return (
    <>
      <main>
        <section className="pagina-encabezado">
          <div className="contenedor">
            <h1>Conócenos</h1>
            <p className="bajada">
              Una tienda académica construida para mostrar una experiencia de
              compra clara, cercana y funcional.
            </p>
          </div>
        </section>
        <section className="seccion--corta">
          <div className="contenedor nosotros-grid">
            <img
              alt="Joya de plata de Luz de Plata"
              src="img/pulseras/35.webp"
            />
            <article>
              <h2 className="titulo-seccion">Nuestra historia</h2>
              <p>
                Luz de Plata nace como una propuesta de joyería enfocada en
                piezas de plata 925 con una estética limpia y atemporal. Este
                sitio integra catálogo, carrito, cuentas de usuario, historial
                de compra y un mantenedor administrativo.
              </p>
              <p>
                El proyecto fue desarrollado con HTML5 semántico, CSS externo y
                JavaScript puro. La persistencia de la demostración utiliza
                localStorage, sin servidor ni base de datos externa.
              </p>
              <a className="boton" href="/Catalogo">
                Descubrir joyas
              </a>
            </article>
          </div>
          <div className="contenedor valores">
            <article className="valor">
              <h3>Selección</h3>
              <p>
                Productos organizados por categoría, disponibilidad y precio.
              </p>
            </article>
            <article className="valor">
              <h3>Cercanía</h3>
              <p>Formularios con mensajes claros para apoyar al usuario.</p>
            </article>
            <article className="valor">
              <h3>Transparencia</h3>
              <p>
                Stock, precios y estado de compra visibles durante el recorrido.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
export default Conocenos;
