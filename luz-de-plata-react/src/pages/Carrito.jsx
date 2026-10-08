import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerCarrito,
  guardarCarrito,
  vaciarCarrito,
} from "../utils/carrito";
import { guardarCompra } from "../utils/compras";
import "../css/estilos.css";

function Carrito() {
  const [carrito, setCarrito] = useState(obtenerCarrito());

  const navigate = useNavigate();

  function actualizarCantidad(id, cambio) {
    const nuevoCarrito = carrito
      .map((item) => {
        if (item.id === id) {
          let nuevaCantidad = item.cantidad + cambio;

          if (nuevaCantidad > item.stock) {
            nuevaCantidad = item.stock;
          }

          return {
            ...item,
            cantidad: nuevaCantidad,
          };
        }

        return item;
      })
      .filter((item) => item.cantidad > 0);

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  }

  function eliminarProducto(id) {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  }

  const subtotal = carrito.reduce(
    (total, item) => total + item.price * item.cantidad,
    0,
  );

  function finalizarCompra() {
    if (carrito.length === 0) {
      return;
    }

    guardarCompra(carrito, subtotal);

    vaciarCarrito();

    setCarrito([]);

    navigate("/Compra_Exitosa");
  }

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>Carrito</h1>

          <p className="bajada">Revisa los productos antes de continuar.</p>
        </div>
      </section>

      <section className="seccion--corta">
        <div className="contenedor">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              <div className="carrito-lista">
                {carrito.map((item) => (
                  <article className="carrito-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="carrito-item__info">
                      <h3>{item.name}</h3>

                      <p>${item.price.toLocaleString("es-CL")}</p>

                      <div className="carrito-item__cantidad">
                        <button
                          type="button"
                          onClick={() => actualizarCantidad(item.id, -1)}
                        >
                          -
                        </button>

                        <span>{item.cantidad}</span>

                        <button
                          type="button"
                          onClick={() => actualizarCantidad(item.id, 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="boton boton--claro"
                        onClick={() => eliminarProducto(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="carrito-item__subtotal">
                      ${(item.price * item.cantidad).toLocaleString("es-CL")}
                    </div>
                  </article>
                ))}
              </div>

              <div className="carrito-resumen">
                <h2>Resumen</h2>

                <p>
                  Subtotal:
                  {" $"}
                  {subtotal.toLocaleString("es-CL")}
                </p>

                <p>
                  <strong>
                    Total:
                    {" $"}
                    {subtotal.toLocaleString("es-CL")}
                  </strong>
                </p>

                <button
                  type="button"
                  className="boton"
                  onClick={finalizarCompra}
                >
                  Finalizar compra
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Carrito;
