import { Link, useLocation } from "react-router-dom";
import "../css/estilos.css";

// Formatear precios en pesos chilenos
function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(valor ?? 0));
}

// Formatear fecha de la compra
function formatearFecha(valor) {
  if (!valor) {
    return "No disponible";
  }

  const fecha = new Date(valor);

  if (Number.isNaN(fecha.getTime())) {
    return String(valor);
  }

  return fecha.toLocaleString("es-CL");
}

function Compra_Exitosa() {
  const location = useLocation();

  // Boleta enviada desde Carrito.jsx después del POST exitoso
  const boleta = location.state?.boleta ?? null;

  // Si alguien abre esta URL directamente,
  // no debemos mostrar una compra que no se confirmó.
  if (!boleta?.id) {
    return (
      <main>
        <section className="compra-exitosa">
          <h1>Información de compra</h1>

          <p>No hay una compra recién confirmada para mostrar.</p>

          <p>
            Si ya realizaste una compra, puedes revisar tu historial en Mis
            Compras.
          </p>

          <div className="compra-exitosa__acciones">
            <Link className="boton" to="/MisCompras">
              Ver mis compras
            </Link>

            <Link className="boton boton--claro" to="/Catalogo">
              Volver al catálogo
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="compra-exitosa">
        <h1>¡Tu compra ha sido realizada!</h1>

        <div className="check" aria-hidden="true">
          ✓
        </div>

        <p>Tu compra se ha registrado correctamente en Luz de Plata.</p>

        <div className="compra-exitosa__resumen">
          <p>
            <strong>Número de orden:</strong>{" "}
            {boleta.numeroOrden ?? `#${boleta.id}`}
          </p>

          <p>
            <strong>Fecha:</strong> {formatearFecha(boleta.fecha)}
          </p>

          <p>
            <strong>Estado:</strong> {boleta.estado ?? "No disponible"}
          </p>

          <p>
            <strong>Total:</strong> {formatearPrecio(boleta.total)}
          </p>
        </div>

        <div className="compra-exitosa__acciones">
          <Link className="boton" to="/MisCompras">
            Ver mis compras
          </Link>

          <Link className="boton boton--claro" to="/">
            Regresar al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Compra_Exitosa;
