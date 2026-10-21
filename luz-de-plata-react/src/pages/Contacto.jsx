import { useState } from "react";
import "../css/estilos.css";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [comentario, setComentario] = useState("");

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState("");

  function validarFormulario() {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es requerido.";
    } else if (nombre.trim().length > 100) {
      nuevosErrores.nombre = "Máximo 100 caracteres.";
    }

    if (email.trim()) {
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

      if (!correoValido) {
        nuevosErrores.email = "Ingresa un correo válido.";
      } else if (email.trim().length > 100) {
        nuevosErrores.email = "Máximo 100 caracteres.";
      }
    }

    if (!comentario.trim()) {
      nuevosErrores.comentario = "El comentario es requerido.";
    } else if (comentario.trim().length > 500) {
      nuevosErrores.comentario = "Máximo 500 caracteres.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  }

  function enviarFormulario(e) {
    e.preventDefault();

    setMensajeExito("");

    const formularioValido = validarFormulario();

    if (!formularioValido) {
      return;
    }

    const mensajesGuardados =
      JSON.parse(localStorage.getItem("mensajesContacto")) || [];

    const nuevoMensaje = {
      nombre: nombre.trim(),
      email: email.trim(),
      comentario: comentario.trim(),
      fecha: new Date().toLocaleString("es-CL"),
    };

    mensajesGuardados.push(nuevoMensaje);

    localStorage.setItem("mensajesContacto", JSON.stringify(mensajesGuardados));

    setNombre("");
    setEmail("");
    setComentario("");
    setErrores({});

    setMensajeExito("Mensaje enviado correctamente.");
  }

  return (
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
        <div className="contenedor">
          <div className="row g-4">
            <div className="col-12 col-lg-7">
              <form
                className="panel formulario"
                onSubmit={enviarFormulario}
                noValidate
              >
                <h2>Formulario de contacto</h2>

                <div className="campo">
                  <label htmlFor="contact-name">Nombre *</label>

                  <input
                    autoComplete="name"
                    id="contact-name"
                    maxLength="100"
                    name="name"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />

                  <span className="error-campo">{errores.nombre}</span>
                </div>

                <div className="campo">
                  <label htmlFor="contact-email">Correo</label>

                  <input
                    autoComplete="email"
                    id="contact-email"
                    maxLength="100"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <span className="error-campo">{errores.email}</span>
                </div>

                <div className="campo">
                  <label htmlFor="comment">Comentario *</label>

                  <textarea
                    id="comment"
                    maxLength="500"
                    name="comment"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />

                  <span className="ayuda">Máximo 500 caracteres.</span>

                  <span className="error-campo">{errores.comentario}</span>
                </div>

                <button className="boton" type="submit">
                  Enviar mensaje
                </button>

                {mensajeExito && (
                  <p className="mensaje-exito">{mensajeExito}</p>
                )}
              </form>
            </div>

            <div className="col-12 col-lg-5">
              <aside className="panel">
                <h2>Atención Luz de Plata</h2>

                <p>
                  Respondemos consultas sobre productos, disponibilidad y
                  envíos.
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
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contacto;
