import "../css/estilos.css";

function MisEnvios() {
    return (
        <>
            <main>
                <section className="pagina-encabezado">
                    <div className="contenedor">
                        <h1>
                            Mis envíos
                        </h1>
                    </div>
                </section>
                <div className="contenedor">
                    <nav aria-label="Área de compras" className="sub-navegador">
                        <ul>
                            <li>
                                <a href="/Envios">
                                    ENVÍOS
                                </a>
                            </li>
                            <li>
                                <a href="/MisCompras">
                                    MIS COMPRAS
                                </a>
                            </li>
                            <li>
                                <a aria-current="page" href="/MisEnvios">
                                    MIS ENVÍOS
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <section className="seccion--corta">
                    <div className="contenedor">
                        <div className="mensaje-vacio">
                            Aún no registras envíos.
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
export default MisEnvios