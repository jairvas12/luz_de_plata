import {Link} from "react-router-dom";import {obtenerUltimaCompra} from "../utils/compras";
import "../css/estilos.css";

function Compra_Exitosa() {

    const compra = obtenerUltimaCompra();

    return (
        <main>
            <section className="compra-exitosa">
                <h1>
                    ¡Tu compra ha sido realizada!
                </h1>
                <div className="check">
                    ✓
                </div>
                <p>
                    Tu compra se ha registrado con éxito.
                    Gracias por comprar en Luz de Plata.
                </p>
                {compra && (
                    <div className="compra-exitosa__resumen">
                        <p>
                            <strong>
                                Orden:
                            </strong>
                            {" "}
                            {compra.orden}
                        </p>
                        <p>
                            <strong>
                                Fecha:
                            </strong>
                            {" "}
                            {compra.fecha}
                        </p>
                        <p>
                            <strong>
                                Total:
                            </strong>
                            {" $"}
                            {compra.total.toLocaleString(
                                "es-CL"
                            )}
                        </p>
                    </div>
                )}
                <div className="compra-exitosa__acciones">
                    <Link
                        className="boton"
                        to="/MisCompras"
                    >
                        Ver mis compras
                    </Link>
                    <Link
                        className="boton boton--claro"
                        to="/"
                    >
                        Regresar al inicio
                    </Link>
                </div>
            </section>
        </main>
    );
}
export default Compra_Exitosa