import {useState} from "react";
import {Link} from "react-router-dom";
import {obtenerCompras} from "../utils/compras";
import "../css/estilos.css";

function MisCompras() {
  const compras =[...obtenerCompras()].reverse();
  const [
    compraAbierta, setCompraAbierta] = useState(null);
  function cambiarBoleta(
    orden
  ) {
    if (compraAbierta === orden){
      setCompraAbierta(
        null
      );
      return;
    }
    setCompraAbierta(orden);
  }

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>
            Mis compras
          </h1>
          <p className="bajada">
            Revisa tus compras y el detalle
            de cada boleta.
          </p>
        </div>
      </section>
      <div className="contenedor">
        <nav
          aria-label="Área de compras"
          className="sub-navegador"
        >
          <ul>
            <li>
              <Link to="/Envios">
                ENVÍOS
              </Link>
            </li>
            <li>
              <Link
                aria-current="page"
                to="/MisCompras"
              >
                MIS COMPRAS
              </Link>
            </li>
            <li>
              <Link to="/MisEnvios">
                MIS ENVÍOS
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <section className="seccion--corta">
        <div className="contenedor historial">
          {
            compras.length === 0
              ? (
                <div className="mensaje-vacio">
                  Aún no registras compras.
                </div>
              )
              : (
                <div className="compras-lista">
                  {
                    compras.map(
                      (compra) => (
                        <article
                          className="compra-card"
                          key={compra.orden}
                        >
                          <div className="compra-card__cabecera">
                            <div>
                              <span className="compra-card__estado">
                                Compra confirmada
                              </span>
                              <h2>
                                {compra.orden}
                              </h2>
                              <p>
                                Fecha: {compra.fecha}
                              </p>
                            </div>
                            <div className="compra-card__total">
                              <span>
                                Total
                              </span>
                              <strong>
                                $
                                {
                                  compra.total
                                    .toLocaleString(
                                      "es-CL"
                                    )
                                }
                              </strong>
                            </div>
                          </div>
                          <button
                            className="boton boton--claro"
                            onClick={
                              () =>
                                cambiarBoleta(
                                  compra.orden
                                )
                            }
                            type="button"
                          >
                            {
                              compraAbierta
                              ===
                              compra.orden
                                ? "Ocultar boleta"
                                : "Ver boleta"
                            }
                          </button>
                          {
                            compraAbierta
                            ===
                            compra.orden
                            &&
                            (
                              <div className="boleta">
                                <div className="boleta__encabezado">
                                  <div>
                                    <h3>
                                      Luz de Plata
                                    </h3>
                                    <p>
                                      Joyería online
                                    </p>
                                  </div>
                                  <div>
                                    <strong>
                                      BOLETA
                                    </strong>
                                    <p>
                                      {compra.orden}
                                    </p>
                                  </div>
                                </div>
                                <div className="boleta__datos">
                                  <p>
                                    <strong>
                                      Fecha:
                                    </strong>
                                    {" "}
                                    {compra.fecha}
                                  </p>
                                  <p>
                                    <strong>
                                      Estado:
                                    </strong>
                                    {" "}
                                    Compra confirmada
                                  </p>
                                </div>
                                <div className="boleta__tabla-contenedor">
                                  <table className="boleta__tabla">
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
                                        compra.productos.map(
                                          (producto) => (
                                            <tr
                                              key={
                                                producto.id
                                              }
                                            >
                                              <td>
                                                {
                                                  producto.name
                                                }
                                              </td>
                                              <td>
                                                {
                                                  producto.cantidad
                                                }
                                              </td>
                                              <td>
                                                $
                                                {
                                                  producto.price
                                                    .toLocaleString(
                                                      "es-CL"
                                                    )
                                                }
                                              </td>
                                              <td>
                                                $
                                                {
                                                  (
                                                    producto.price
                                                    *
                                                    producto.cantidad
                                                  )
                                                    .toLocaleString(
                                                      "es-CL"
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
                                <div className="boleta__total">
                                  <span>
                                    Total pagado
                                  </span>
                                  <strong>
                                    $
                                    {
                                      compra.total
                                        .toLocaleString(
                                          "es-CL"
                                        )
                                    }
                                  </strong>
                                </div>
                                <p className="boleta__nota">
                                  Comprobante demostrativo.
                                  No corresponde a un
                                  documento tributario.
                                </p>
                              </div>
                            )
                          }
                        </article>
                      )
                    )
                  }
                </div>
              )
          }
        </div>
      </section>
    </main>
  );
}
export default MisCompras;