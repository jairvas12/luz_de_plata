import {Link, useParams} from "react-router-dom";

function OrdenDetalle() {
    const {id} = useParams();
    const ordenes = [];
    const orden =
        ordenes.find(
            orden =>
                orden.id === id
        );

    function formatearPrecio(precio) {
        return new Intl.NumberFormat(
            "es-CL",
            {
                style: "currency",
                currency: "CLP"
            }
        ).format(precio);
    }

    function formatearFecha(fecha) {
        return new Date(
            fecha
        ).toLocaleString(
            "es-CL"
        );
    }

    if (!orden) {
        return (
            <>
                <p>
                    <Link to="/admin/ordenes">
                        ← Volver a órdenes
                    </Link>
                </p>
                <div className="admin-card">
                    <div className="mensaje-vacio">

                        Orden no encontrada.
                    </div>
                </div>
            </>
        );
    }
    return (
        <>

            <p>
                <Link to="/admin/ordenes">
                    ← Volver a órdenes
                </Link>
            </p>
            <div className="admin-card">
                <h1>
                    Orden {orden.id}
                </h1>
                <p>
                    <strong>
                        Cliente:
                    </strong>
                    {" "}
                    {orden.cliente || "Usuario"}
                    {" · "}
                    <strong>
                        Fecha:
                    </strong>
                    {" "}

                    {
                        formatearFecha(
                            orden.date
                        )
                    }
                </p>
                <div className="tabla-wrap">
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th>
                                    Producto
                                </th>

                                <th>
                                    Cantidad
                                </th>

                                <th>
                                    Precio
                                </th>

                                <th>
                                    Subtotal
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orden.items.map(
                                    item => (
                                        <tr
                                            key={
                                                item.productId
                                                ||
                                                item.id
                                            }
                                        >
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>
                                                {item.qty}
                                            </td>
                                            <td>
                                                {
                                                    formatearPrecio(
                                                        item.price
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {
                                                    formatearPrecio(
                                                        item.price
                                                        *
                                                        item.qty
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <p
                    style={{
                        fontSize: "1.2rem",
                        marginTop: "20px"
                    }}
                >
                    <strong>
                        Total:
                        {" "}
                        {
                            formatearPrecio(
                                orden.total
                            )
                        }
                    </strong>
                </p>
            </div>
        </>
    );
}
export default OrdenDetalle;