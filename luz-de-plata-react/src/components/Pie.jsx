import "../css/estilos.css";
import { Link } from "react-router-dom";

function Pie() {
  return (
    <footer>
      <div className="pie">
        <section>
          <h2>Luz de Plata</h2>

          <p>
            Joyas de plata 925 seleccionadas para acompañar tus momentos
            especiales.
          </p>
        </section>

        <section>
          <h3>Ayuda</h3>

          <p>
            <Link to="/Contacto">Contacto</Link>
            <br />

            <Link to="/Envios">Envíos</Link>
            <br />

            <Link to="/Blog">Blog</Link>
          </p>
        </section>

        <section>
          <h3>Mi cuenta</h3>

          <p>
            <Link to="/Login">Iniciar sesión</Link>
            <br />

            <Link to="/Registro">Crear cuenta</Link>
            <br />

            <Link to="/MisCompras">Mis compras</Link>
          </p>
        </section>
      </div>

      <div className="pie__base">
        © 2026 Luz de Plata
      </div>
    </footer>
  );
}

export default Pie;