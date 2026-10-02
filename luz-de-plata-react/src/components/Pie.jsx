import "../css/estilos.css";
function Pie() {
  return (
    <>
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
              <a href="contacto.html">Contacto</a>
              <br />
              <a href="/Envios">Envíos</a>
              <br />
              <a href="/Blog">Blog</a>
            </p>
          </section>
          <section>
            <h3>Mi cuenta</h3>
            <p>
              <a href="login.html">Iniciar sesión</a>
              <br />
              <a href="registro.html">Crear cuenta</a>
              <br />
              <a href="mis_compras.html">Mis compras</a>
            </p>
          </section>
        </div>
        <div className="pie__base">© 2026 Luz de Plata</div>
      </footer>
    </>
  )
}
export default Pie
