import "../css/estilos.css";
function Blog1() {
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
                        Cómo cuidar tus joyas de plata 925
                    </h1>
                    <p className="bajada">
                        Consejos sencillos para conservar el brillo y el buen estado de tus piezas.
                    </p>
                    <figure>
                        <img alt="Cadena de plata 925" src="img/cadena/59.webp" />
                    </figure>
                    <h2>
                        Guárdalas por separado
                    </h2>
                    <p>
                        La fricción con otras piezas puede producir marcas. Usa bolsas suaves o compartimentos individuales y procura mantenerlas secas.
                    </p>
                    <h2>
                        Limpieza suave
                    </h2>
                    <p>
                        Para la rutina diaria basta un paño de microfibra limpio y seco. Evita productos abrasivos o cepillos duros.
                    </p>
                    <h2>
                        Cuándo quitarse las joyas
                    </h2>
                    <p>
                        Retíralas antes de nadar, ducharte o aplicar perfumes y cremas. Esto ayuda a disminuir residuos sobre la superficie.
                    </p>
                </article>
            </main>
        </>
    )
}

export default Blog1