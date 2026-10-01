import productos from "../data/productos";

function Home() {
    const destacados = productos.filter((producto) => producto.featured);
    return (
        <>
            <section className="hero">
                <video
                    autoplay=""
                    loop=""
                    muted=""
                    playsinline=""
                    poster="img/aros/1.webp"
                >
                    <source src="video/inicio.mp4" type="video/mp4" />
                    Tu navegador no puede reproducir el video.
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
                            <article className="producto-card" key={producto.id}>
                                <div className="producto-card__imagen">
                                    <img src={producto.image} alt={producto.name} />
                                </div>

                                <div className="producto-card__cuerpo">
                                    <span className="producto-card__categoria">
                                        {producto.category}
                                    </span>

                                    <h3>{producto.name}</h3>

                                    <p className="producto-card__precio">
                                        ${producto.price.toLocaleString("es-CL")}
                                    </p>
                                </div>
                            </article>
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
    )
}

export default Home