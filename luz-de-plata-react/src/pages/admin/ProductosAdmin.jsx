import {Link} from "react-router-dom";
import {obtenerProductosConStock} from "../../utils/stock";

function ProductosAdmin() {
  const productos = obtenerProductosConStock();
  function formatearPrecio(precio) {
    return new Intl.NumberFormat(
      "es-CL",
      {
        style: "currency",
        currency: "CLP"
      }
    ).format(precio);
  }
  function stockEsCritico(producto) {
    return (
      producto.criticalStock !== ""
      &&
      producto.criticalStock != null
      &&
      producto.stock <=
        Number(producto.criticalStock)
    );
  }

  return (

    <>
      <div className="admin-toolbar">
        <div>
          <h1>
            Productos
          </h1>
          <p className="muted">
            Listado completo de productos.
          </p>
        </div>
        <Link
          className="boton"
          to="/admin/productos/nuevo"
        >
          + Nuevo producto
        </Link>
      </div>
      <div className="tabla-wrap">
        <table className="tabla">
          <thead>
            <tr>
              <th>
                Imagen
              </th>
              <th>
                Código
              </th>
              <th>
                Nombre
              </th>
              <th>
                Categoría
              </th>
              <th>
                Precio
              </th>
              <th>
                Stock
              </th>
              <th>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              productos.map(
                producto => (
                  <tr key={producto.id}>
                    <td>
                      <img src={producto.image} alt={producto.name}/>
                    </td>
                    <td>
                      {producto.code}
                    </td>
                    <td>
                      {producto.name}
                    </td>
                    <td>
                      {producto.category}
                    </td>
                    <td>
                      {
                        formatearPrecio(
                          producto.price
                        )
                      }
                    </td>
                    <td
                      className={
                        stockEsCritico(
                          producto
                        )
                          ? "stock-critico"
                          : ""
                      }
                    >
                      {producto.stock}
                    </td>
                    <td>
                      <div className="tabla-acciones">

                        <Link
                          className="boton boton--claro"
                          to={
                            `/producto/${producto.id}`
                          }
                        >
                          Ver
                        </Link>
                        <Link
                          className="boton boton--claro"
                          to={
                            `/admin/productos/editar/${producto.id}`
                          }
                        >
                          Editar
                        </Link>
                        <button
                          className="boton boton--peligro"
                          type="button"
                        >
                          Eliminar
                        </button>

                      </div>
                    </td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ProductosAdmin;