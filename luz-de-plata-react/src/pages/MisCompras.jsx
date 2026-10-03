function MisCompras() {
    return (
        <>
            <main>
                <section className="pagina-encabezado">
                    <div className="contenedor">
                        <h1>
                            Mis compras
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
                                <a aria-current="page" href="/MisCompras">
                                    MIS COMPRAS
                                </a>
                            </li>
                            <li>
                                <a href="mis_envios.html">
                                    MIS ENVÍOS
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <section className="seccion--corta">
                    <div className="contenedor historial">
                        <div className="mensaje-vacio">
                            Aún no registras compras.
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}
export default MisCompras