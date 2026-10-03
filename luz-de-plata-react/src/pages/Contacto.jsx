import "../css/estilos.css";
function Contacto() {
  return (
    <>
      <main>
        <section className="pagina-encabezado">
          <div className="contenedor">
            <h1>Contacto</h1>
            <p className="bajada">
              Cuéntanos en qué podemos ayudarte. Los mensajes se guardan
              localmente como demostración.
            </p>
          </div>
        </section>
        <section className="seccion--corta">
          <div className="contenedor dos-columnas">
            <form className="panel formulario" id="contacto-form" noValidate="">
              <h2>Formulario de contacto</h2>
              <div className="campo">
                <label htmlFor="contact-name">Nombre *</label>
                <input
                  autoComplete="name"
                  id="contact-name"
                  maxLength="100"
                  name="name"
                  required=""
                />
                <span className="error-campo"></span>
              </div>
              <div className="campo">
                <label htmlFor="contact-email">Correo</label>
                <input
                  autoComplete="email"
                  id="contact-email"
                  maxLength="100"
                  name="email"
                  type="email"
                />
                <span className="error-campo"></span>
              </div>
              <div className="campo">
                <label htmlFor="comment">Comentario *</label>
                <textarea
                  id="comment"
                  maxLength="500"
                  name="comment"
                  required=""
                ></textarea>
                <span className="ayuda">Máximo 500 caracteres.</span>
                <span className="error-campo"></span>
              </div>
              <button className="boton" type="submit">
                Enviar mensaje
              </button>
            </form>
            <aside className="panel">
              <h2>Atención Luz de Plata</h2>
              <p>
                Respondemos consultas sobre productos, disponibilidad y envíos.
              </p>
              <p>
                <strong>Horario:</strong>
                <br />
                Lunes a viernes, 10:00 a 18:00.
              </p>
              <p>
                <strong>Correo:</strong>
                <br />
                contacto@luzdeplata.cl
              </p>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
export default Contacto;
