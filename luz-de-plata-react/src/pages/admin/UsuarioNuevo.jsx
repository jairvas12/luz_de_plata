import { useState } from "react";
import { useNavigate } from "react-router-dom";
import regiones from "../../data/regiones";
import { obtenerUsuarios, guardarUsuarios } from "../../utils/usuarios";
import "../../css/estilos.css";

function UsuarioNuevo() {
  const navigate = useNavigate();

  const [run, setRun] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [rol, setRol] = useState("Cliente");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errores, setErrores] = useState({});

  const comunasDisponibles = region ? regiones[region] || [] : [];

  function validarFormulario() {
    const nuevosErrores = {};

    if (!run.trim()) {
      nuevosErrores.run = "El RUN es requerido.";
    }

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

    if (!rol) {
      nuevosErrores.rol = "Selecciona un rol.";
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

    const usuarios = obtenerUsuarios();

    const runExiste = usuarios.some((usuario) => usuario.run === run.trim());

    if (runExiste) {
      nuevosErrores.run = "El RUN ya está registrado.";
    }

    const emailExiste = usuarios.some(
      (usuario) => usuario.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (emailExiste) {
      nuevosErrores.email = "El correo ya está registrado.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  }

  function guardarNuevoUsuario(e) {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const usuarios = obtenerUsuarios();

    const nuevoUsuario = {
      id: `USR-${Date.now()}`,
      run: run.trim(),
      name: nombre.trim(),
      lastName: apellidos.trim(),
      email: email.trim(),
      birthDate: fechaNacimiento,
      role: rol,
      region,
      commune: comuna,
      address: direccion.trim(),
      password,
      active: true,
    };

    const nuevosUsuarios = [...usuarios, nuevoUsuario];

    guardarUsuarios(nuevosUsuarios);

    navigate("/admin/usuarios");
  }

  function cambiarRegion(e) {
    setRegion(e.target.value);
    setComuna("");
  }

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>Nuevo usuario</h1>

          <p className="bajada">Crea un nuevo usuario para el sistema.</p>
        </div>
      </section>

      <section className="seccion--corta">
        <div className="contenedor">
          <form
            className="panel formulario"
            onSubmit={guardarNuevoUsuario}
            noValidate
          >
            <div className="campo">
              <label htmlFor="admin-run">RUN *</label>

              <input
                id="admin-run"
                value={run}
                onChange={(e) => setRun(e.target.value)}
              />

              <span className="error-campo">{errores.run}</span>
            </div>

            <div className="campo">
              <label htmlFor="admin-nombre">Nombre *</label>

              <input
                id="admin-nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <span className="error-campo">{errores.nombre}</span>
            </div>

            <div className="campo">
              <label htmlFor="admin-apellidos">Apellidos *</label>

              <input
                id="admin-apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />

              <span className="error-campo">{errores.apellidos}</span>
            </div>

            <div className="campo">
              <label htmlFor="admin-email">Correo *</label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="error-campo">{errores.email}</span>
            </div>

            <div className="campo">
              <label htmlFor="admin-fecha">Fecha de nacimiento</label>

              <input
                id="admin-fecha"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>

            <div className="campo">
              <label htmlFor="admin-rol">Tipo de usuario *</label>

              <select
                id="admin-rol"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option value="Administrador">Administrador</option>

                <option value="Cliente">Cliente</option>

                <option value="Vendedor">Vendedor</option>
              </select>

              <span className="error-campo">{errores.rol}</span>
            </div>

            <div className="campo">
              <label htmlFor="admin-region">Región *</label>

              <select id="admin-region" value={region} onChange={cambiarRegion}>
                <option value="">Selecciona una región</option>

                {Object.keys(regiones).map((nombreRegion) => (
                  <option key={nombreRegion} value={nombreRegion}>
                    {nombreRegion}
                  </option>
                ))}
              </select>

              <span className="error-campo">{errores.region}</span>
            </div>

            <div className="campo">
              <label htmlFor="admin-comuna">Comuna *</label>

              <select
                id="admin-comuna"
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

            <div className="campo">
              <label htmlFor="admin-direccion">Dirección *</label>

              <input
                id="admin-direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />

              <span className="error-campo">{errores.direccion}</span>
            </div>

            <div className="campo">
              <label htmlFor="admin-password">Contraseña *</label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span className="error-campo">{errores.password}</span>
            </div>

            <div className="campo">
              <label htmlFor="admin-confirmar">Confirmar contraseña *</label>

              <input
                id="admin-confirmar"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <span className="error-campo">{errores.confirmPassword}</span>
            </div>

            <button type="submit" className="boton">
              Guardar usuario
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default UsuarioNuevo;
