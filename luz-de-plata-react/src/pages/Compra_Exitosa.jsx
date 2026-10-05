import "../css/estilos.css";
function Compra_Exitosa() {
    return (
        <>
            <main>
                <section className="compra-exitosa">
                    <h1>
                        ¡Tu compra ha sido realizada!
                    </h1>
                    <div className="check">
                        ✓
                    </div>
                    <p>
                        Tu compra se ha registrado con éxito. Gracias por comprar en Luz de Plata.
                    </p>
                    <p>
                        <strong>
                            Orden:
                        </strong>
                        <span data-last-purchase="">
                        </span>
                    </p>
                    <p>
                        <a className="boton" href="mis_compras.html">
                            Ver mis compras
                        </a>
                        <a className="boton boton--claro" href="/">
                            Regresar al inicio
                        </a>
                    </p>
                </section>
            </main>
        </>
    )
}
export default Compra_Exitosa