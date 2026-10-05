import "../css/estilos.css";
function Blog2() {
    return (
        <>
            <main>
                <article className="seccion articulo-blog">
                    <p>
                        <a href="/Blog">
                            ← Volver al blog
                        </a>
                    </p>
                    <h1 className="titulo-seccion">
                        Elegir una joya según la ocasión
                    </h1>
                    <p className="bajada">
                        Ideas para convertir una pieza de plata en un regalo con intención.
                    </p>
                    <figure>
                        <img alt="Aros de plata 925" src="img/aros/8.webp" />
                    </figure>
                    <h2>
                        Para uso diario
                    </h2>
                    <p>
                        Los aros pequeños, cadenas finas y pulseras discretas son opciones fáciles de combinar y acompañan distintos estilos.
                    </p>
                    <h2>
                        Para una celebración
                    </h2>
                    <p>
                        Una pieza con mayor presencia puede transformarse en el centro del conjunto. Considera formas que conecten con la personalidad de quien recibe el regalo.
                    </p>
                    <h2>
                        El detalle también importa
                    </h2>
                    <p>
                        Incluye una nota o una historia breve sobre por qué elegiste esa joya. El significado hace que el regalo sea más memorable.
                    </p>
                </article>
            </main>
        </>
    )
}
export default Blog2