
import "../css/estilos.css";
function Envios() {
    return (
        <>
            <main>
                <section className="pagina-encabezado">
                    <div className="contenedor">
                        <h1>
                            Envíos
                        </h1>
                        <p className="bajada">
                            Elige la opción que más te acomode. La integración de despacho es simulada para esta entrega.
                        </p>
                    </div>
                </section>
                <div className="contenedor">
                    <nav aria-label="Área de compras" className="sub-navegador">
                        <ul>
                            <li>
                                <a aria-current="page" href="/Envios">
                                    ENVÍOS
                                </a>
                            </li>
                            <li>
                                <a href="/MisCompras">
                                    MIS COMPRAS
                                </a>
                            </li>
                            <li>
                                <a href="/MisEnvios">
                                    MIS ENVÍOS
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <section className="seccion--corta">
                    <div className="contenedor envios-grid">
                        <article className="envio-opcion">
                            <img alt="Starken" src="img/logo/STARKEN_LOGO.jpg" style={{maxWidth:'130px'}} />
                            <h2>
                                Starken
                            </h2>
                            <p>
                                Despacho a domicilio y retiro en sucursal.
                            </p>
                        </article>
                        <article className="envio-opcion">
                            <img alt="Blue Express" src="img/logo/Logo-BE.jpg" style={{maxWidth:'130px'}} />
                            <h2>
                                Blue Express
                            </h2>
                            <p>
                                Despacho a domicilio en comunas habilitadas.
                            </p>
                        </article>
                    </div>
                    <div className="contenedor pasos-envio">
                        <div className="paso-envios-cuadros">
                            <article className="paso">
                                <span className="paso__numero">
                                    1
                                </span>
                                <h3>
                                    Preparamos
                                </h3>
                                <p>
                                    Validamos stock y protegemos tu pedido.
                                </p>
                            </article>
                            <article className="paso">
                                <span className="paso__numero">
                                    2
                                </span>
                                <h3>
                                    Despachamos
                                </h3>
                                <p>
                                    Asignamos un código de seguimiento.
                                </p>
                            </article>
                            <article className="paso">
                                <span className="paso__numero">
                                    3
                                </span>
                                <h3>
                                    Acompañamos
                                </h3>
                                <p>
                                    Consulta el estado desde “Mis envíos”.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Envios