import { useState } from "react";
import { Link } from "react-router-dom";
import regiones from "../data/regiones";
import { registrarUsuario } from "../utils/usuarios";
import "../css/estilos.css";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState("");

  const comunasDisponibles = region ? regiones[region] || [] : [];

  function validarFormulario() {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es requerido.";
    }

    if (!apellidos.trim()) {
      nuevosErrores.apellidos = "Los apellidos son requeridos.";
    }

    if (!email.trim()) {
      nuevosErrores.email = "El correo es requerido.";
    } else {
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

      if (!correoValido) {
        nuevosErrores.email = "Ingresa un correo válido.";
      }
    }

    if (!fechaNacimiento) {
      nuevosErrores.fechaNacimiento = "La fecha de nacimiento es requerida.";
    }

    if (!region) {
      nuevosErrores.region = "Selecciona una región.";
    }

    if (!comuna) {
      nuevosErrores.comuna = "Selecciona una comuna.";
    }

    if (!direccion.trim()) {
      nuevosErrores.direccion = "La dirección es requerida.";
    }

    if (!password) {
      nuevosErrores.password = "La contraseña es requerida.";
    } else if (password.length < 4 || password.length > 10) {
      nuevosErrores.password = "Debe tener entre 4 y 10 caracteres.";
    }

    if (!confirmPassword) {
      nuevosErrores.confirmPassword = "Debes confirmar la contraseña.";
    } else if (password !== confirmPassword) {
      nuevosErrores.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (!aceptaTerminos) {
      nuevosErrores.terminos = "Debes aceptar los términos.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  }

  function enviarRegistro(e) {
    e.preventDefault();

    setMensajeExito("");

    if (!validarFormulario()) {
      return;
    }

    const nuevoUsuario = {
      id: `USR-${Date.now()}`,
      name: nombre.trim(),
      lastName: apellidos.trim(),
      email: email.trim(),
      birthDate: fechaNacimiento,
      region,
      commune: comuna,
      address: direccion.trim(),
      password,
      role: "Cliente",
      active: true,
    };

    const resultado = registrarUsuario(nuevoUsuario);

    if (!resultado.ok) {
      setErrores({
        email: resultado.mensaje,
      });

      return;
    }

    setNombre("");
    setApellidos("");
    setEmail("");
    setFechaNacimiento("");
    setRegion("");
    setComuna("");
    setDireccion("");
    setPassword("");
    setConfirmPassword("");
    setAceptaTerminos(false);

    setErrores({});

    setMensajeExito("Cuenta creada correctamente.");
  }

  function cambiarRegion(e) {
    const nuevaRegion = e.target.value;

    setRegion(nuevaRegion);
    setComuna("");
  }

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>Crear cuenta</h1>

          <p className="bajada">
            Regístrate para guardar tus datos y revisar tus compras.
          </p>
        </div>
      </section>

      <section className="seccion--corta">
        <div className="contenedor">
          <form
            className="panel formulario"
            onSubmit={enviarRegistro}
            noValidate
          >
            <h2>Registro</h2>

            <div className="campo mb-3">
              <label htmlFor="registro-nombre" className="form-label">
                Nombre *
              </label>

              <input
                className="form-control"
                id="registro-nombre"
                maxLength="100"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <span className="error-campo">{errores.nombre}</span>
            </div>

            <div className="campo mb-3">
              <label htmlFor="registro-apellidos" className="form-label">
                Apellidos *
              </label>

              <input
                className="form-control"
                id="registro-apellidos"
                maxLength="100"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />

              <span className="error-campo">{errores.apellidos}</span>
            </div>

            <div className="campo mb-3">
              <label htmlFor="registro-email" className="form-label">
                Correo *
              </label>

              <input
                className="form-control"
                id="registro-email"
                type="email"
                maxLength="100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="error-campo">{errores.email}</span>
            </div>

            <div className="campo mb-3">
              <label htmlFor="registro-fecha" className="form-label">
                Fecha de nacimiento *
              </label>

              <input
                className="form-control"
                id="registro-fecha"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />

              <span className="error-campo">{errores.fechaNacimiento}</span>
            </div>

            <div className="campo mb-3">
              <label htmlFor="registro-region" className="form-label">
                Región *
              </label>

              <select
                className="form-select"
                id="registro-region"
                value={region}
                onChange={cambiarRegion}
              >
                <option value="">Selecciona una región</option>

                {Object.keys(regiones).map((nombreRegion) => (
                  <option key={nombreRegion} value={nombreRegion}>
                    {nombreRegion}
                  </option>
                ))}
              </select>

              <span className="error-campo">{errores.region}</span>
            </div>

            <div className="campo mb-3">
              <label htmlFor="registro-comuna" className="form-label">
                Comuna *
              </label>

              <select
                className="form-select"
                id="registro-comuna"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                disabled={!region}
              >
                <option value="">Selecciona una comuna</option>

                {comunasDisponibles.map((nombreComuna) => (
                  <option key={nombreComuna} value={nombreComuna}>
                    {nombreComuna}
                  </option>
                ))}
              </select>

              <span className="error-campo">{errores.comuna}</span>
            </div>

            <div className="campo mb-3">
              <label htmlFor="registro-direccion" className="form-label">
                Dirección *
              </label>

              <input
                className="form-control"
                id="registro-direccion"
                maxLength="150"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />

              <span className="error-campo">{errores.direccion}</span>
            </div>

            <div className="campo mb-3">
              <label htmlFor="registro-password" className="form-label">
                Contraseña *
              </label>

              <input
                className="form-control"
                id="registro-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span className="ayuda">Entre 4 y 10 caracteres.</span>

              <span className="error-campo">{errores.password}</span>
            </div>

            <div className="campo mb-3">
              <label htmlFor="registro-confirmar" className="form-label">
                Confirmar contraseña *
              </label>

              <input
                className="form-control"
                id="registro-confirmar"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <span className="error-campo">{errores.confirmPassword}</span>
            </div>

            <div className="campo mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  id="registro-terminos"
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                />

                <label className="form-check-label" htmlFor="registro-terminos">
                  Acepto los términos y condiciones
                </label>
              </div>

              <span className="error-campo">{errores.terminos}</span>
            </div>

            <button className="boton btn btn-dark w-100" type="submit">
              Crear cuenta
            </button>

            {mensajeExito && (
              <p className="mensaje-exito mt-3">{mensajeExito}</p>
            )}

            <p className="mt-3 mb-0">
              ¿Ya tienes cuenta? <Link to="/Login">Iniciar sesión</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Registro;
