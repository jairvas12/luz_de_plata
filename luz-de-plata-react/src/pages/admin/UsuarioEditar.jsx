import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import regiones from "../../data/regiones";
import { obtenerUsuarios, guardarUsuarios } from "../../utils/usuarios";
import "../../css/estilos.css";

function UsuarioEditar() {

  const { id } = useParams();
  const navigate = useNavigate();
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find((item) => item.id === id);
  const [run, setRun] = useState(usuario?.run || "");
  const [nombre, setNombre] = useState(usuario?.name || "");
  const [apellidos, setApellidos] = useState(usuario?.lastName || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [fechaNacimiento, setFechaNacimiento] = useState(usuario?.birthDate || "");
  const [rol, setRol] = useState(usuario?.role || "Cliente");
  const [region, setRegion] = useState(usuario?.region || "");
  const [comuna, setComuna] = useState(usuario?.commune || "");
  const [direccion, setDireccion] = useState(usuario?.address || "");
  const [activo, setActivo] = useState(usuario?.active !== false);
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

    const usuarios = obtenerUsuarios();

    const runDuplicado = usuarios.some(
      (usuario) => usuario.id !== id && usuario.run === run.trim(),
    );

    if (runDuplicado) {
      nuevosErrores.run = "El RUN ya está registrado.";
    }

    const emailDuplicado = usuarios.some(
      (usuario) =>
        usuario.id !== id &&
        usuario.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (emailDuplicado) {
      nuevosErrores.email = "El correo ya está registrado.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  }

  function guardarCambios(e) {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const usuarios = obtenerUsuarios();

    const usuariosActualizados = usuarios.map((usuario) => {
      if (usuario.id !== id) {
        return usuario;
      }

      return {
        ...usuario,
        run: run.trim(),
        name: nombre.trim(),
        lastName: apellidos.trim(),
        email: email.trim(),
        birthDate: fechaNacimiento,
        role: rol,
        region,
        commune: comuna,
        address: direccion.trim(),
        active: activo,
      };
    });

    guardarUsuarios(usuariosActualizados);

    navigate("/admin/usuarios");
  }

  function cambiarRegion(e) {
    setRegion(e.target.value);
    setComuna("");
  }
  
  if (!usuario) {
    return (
      <Navigate to="/admin/usuarios"replace/>
    );
  }

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>Editar usuario</h1>

          <p className="bajada">Modifica los datos del usuario seleccionado.</p>
        </div>
      </section>

      <section className="seccion--corta">
        <div className="contenedor">
          <form
            className="panel formulario"
            onSubmit={guardarCambios}
            noValidate
          >
            <div className="campo">
              <label htmlFor="editar-run">RUN *</label>

              <input
                id="editar-run"
                value={run}
                onChange={(e) => setRun(e.target.value)}
              />

              <span className="error-campo">{errores.run}</span>
            </div>

            <div className="campo">
              <label htmlFor="editar-nombre">Nombre *</label>

              <input
                id="editar-nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <span className="error-campo">{errores.nombre}</span>
            </div>

            <div className="campo">
              <label htmlFor="editar-apellidos">Apellidos *</label>

              <input
                id="editar-apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />

              <span className="error-campo">{errores.apellidos}</span>
            </div>

            <div className="campo">
              <label htmlFor="editar-email">Correo *</label>

              <input
                id="editar-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="error-campo">{errores.email}</span>
            </div>

            <div className="campo">
              <label htmlFor="editar-fecha">Fecha de nacimiento</label>

              <input
                id="editar-fecha"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>

            <div className="campo">
              <label htmlFor="editar-rol">Tipo de usuario *</label>

              <select
                id="editar-rol"
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
              <label htmlFor="editar-region">Región *</label>

              <select
                id="editar-region"
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

            <div className="campo">
              <label htmlFor="editar-comuna">Comuna *</label>

              <select
                id="editar-comuna"
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
              <label htmlFor="editar-direccion">Dirección *</label>

              <input
                id="editar-direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />

              <span className="error-campo">{errores.direccion}</span>
            </div>

            <div className="campo">
              <label>
                <input
                  type="checkbox"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                />
                Usuario activo
              </label>
            </div>

            <button type="submit" className="boton">
              Guardar cambios
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default UsuarioEditar;
