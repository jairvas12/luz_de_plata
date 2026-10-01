import "../css/estilos.css";

function Blog() {
    return (
        <>
            <main>
                <section className="pagina-encabezado">
                    <div className="contenedor">
                        <h1>
                            Noticias y consejos
                        </h1>
                        <p className="bajada">
                            Datos útiles para conocer y cuidar tus joyas.
                        </p>
                    </div>
                </section>
                <section className="seccion--corta">
                    <div className="contenedor blog-grid">
                        <article className="blog-card">
                            <img alt="Cadena de plata" src="img/cadena/59.webp" />
                            <div className="blog-card__texto">
                                <p className="muted">
                                    GUÍA DE CUIDADO
                                </p>
                                <h2>
                                    Cómo cuidar tus joyas de plata 925
                                </h2>
                                <p>
                                    Hábitos simples para mantener su brillo y reducir el oscurecimiento natural.
                                </p>
                                <a className="boton boton--claro" href="/Blog1">
                                    Leer artículo
                                </a>
                            </div>
                        </article>
                        <article className="blog-card">
                            <img alt="Aros de plata" src="img/aros/8.webp" />
                            <div className="blog-card__texto">
                                <p className="muted">
                                    IDEAS PARA REGALAR
                                </p>
                                <h2>
                                    Elegir una joya según la ocasión
                                </h2>
                                <p>
                                    Una guía breve para encontrar un detalle significativo sin complicarte.
                                </p>
                                <a className="boton boton--claro" href="/Blog2">
                                    Leer artículo
                                </a>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        </>
    )
}
export default Blog