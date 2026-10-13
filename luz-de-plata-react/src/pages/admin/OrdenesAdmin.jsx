import {Link} from "react-router-dom";

function OrdenesAdmin() {
  const ordenes = [];

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
    ).toLocaleDateString(
      "es-CL"
    );
  }

  function contarProductos(items) {
    return (
      items || []
    ).reduce(
      (total, item) =>
        total + item.qty,
      0
    );
  }
  return (

    <>
      <div className="admin-toolbar">
        <div>
          <h1>
            Órdenes
          </h1>
          <p className="muted">
            Listado de compras registradas.
          </p>
        </div>
      </div>
      <div className="tabla-wrap">
        <table className="tabla">
          <thead>
            <tr>
              <th>
                Orden
              </th>
              <th>
                Cliente
              </th>
              <th>
                Fecha
              </th>
              <th>
                Productos
              </th>
              <th>
                Total
              </th>
              <th>
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {
              ordenes.length > 0
                ? ordenes.map(
                    orden => (
                      <tr key={orden.id}>
                        <td>
                          {orden.id}
                        </td>
                        <td>
                          {orden.cliente}
                        </td>
                        <td>
                          {
                            formatearFecha(
                              orden.date
                            )
                          }
                        </td>
                        <td>
                          {
                            contarProductos(
                              orden.items
                            )
                          }
                        </td>
                        <td>
                          {
                            formatearPrecio(
                              orden.total
                            )
                          }
                        </td>
                        <td>
                          <Link
                            className="boton boton--claro"
                            to={
                              `/admin/ordenes/${orden.id}`
                            }
                          >
                            Ver detalle
                          </Link>
                        </td>
                      </tr>
                    )
                  )
                : (
                    <tr>
                      <td colSpan="6">
                        Aún no hay órdenes registradas.
                      </td>
                    </tr>
                  )
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
export default OrdenesAdmin;