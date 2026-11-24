import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import regiones from "../../data/regiones";

import {
  buscarUsuarioApi,
  actualizarUsuarioApi,
} from "../../services/adminUsuariosApi";

import "../../css/estilos.css";

const FORMULARIO_INICIAL = {
  run: "",
  nombre: "",
  apellidos: "",
  email: "",
  fechaNacimiento: "",
  rol: "CLIENTE",
  region: "",
  comuna: "",
  direccion: "",
  activo: true,
};

function UsuarioEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [errorServidor, setErrorServidor] = useState("");
  const [errores, setErrores] = useState({});

  // Obtener el usuario desde MySQL
  useEffect(() => {
    let activo = true;

    async function cargarUsuario() {
      setCargando(true);
      setErrorServidor("");

      try {
        const usuario = await buscarUsuarioApi(id);

        if (!activo) return;

        setFormulario({
          run: usuario.run ?? "",
          nombre: usuario.name ?? "",
          apellidos: usuario.lastName ?? "",
          email: usuario.email ?? "",
          fechaNacimiento: usuario.birthDate ?? "",
          rol: usuario.role ?? "CLIENTE",
          region: usuario.region ?? "",
          comuna: usuario.commune ?? "",
          direccion: usuario.address ?? "",
          activo: usuario.active === true,
        });
      } catch (error) {
        if (activo) {
          setErrorServidor(error.message || "No se pudo cargar el usuario.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarUsuario();

    return () => {
      activo = false;
    };
  }, [id]);

  // Obtener comunas de la región seleccionada
  const comunasDisponibles = formulario.region
    ? regiones[formulario.region] || []
    : [];

  // Permitir mostrar valores antiguos de MySQL
  const regionNoRegistrada =
    formulario.region &&
    !Object.prototype.hasOwnProperty.call(regiones, formulario.region);

  const comunaNoRegistrada =
    formulario.comuna && !comunasDisponibles.includes(formulario.comuna);

  function actualizarCampo(evento) {
    const { name, value, type, checked } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "region" ? { comuna: "" } : {}),
    }));

    setErrores((anterior) => ({
      ...anterior,
      [name]: "",
    }));
  }

  function validarFormulario() {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!formulario.apellidos.trim()) {
      nuevosErrores.apellidos = "Los apellidos son obligatorios.";
    }

    if (!formulario.email.trim()) {
      nuevosErrores.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email.trim())) {
      nuevosErrores.email = "Ingresa un correo válido.";
    }

    if (!formulario.rol) {
      nuevosErrores.rol = "Selecciona un rol.";
    }

    if (!formulario.region) {
      nuevosErrores.region = "Selecciona una región.";
    }

    if (!formulario.comuna) {
      nuevosErrores.comuna = "Selecciona una comuna.";
    }

    if (!formulario.direccion.trim()) {
      nuevosErrores.direccion = "La dirección es obligatoria.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  }

  // Actualizar los datos del usuario en MySQL
  async function guardarCambios(evento) {
    evento.preventDefault();

    if (guardando || !validarFormulario()) {
      return;
    }

    setGuardando(true);
    setErrorServidor("");

    try {
      const datosActualizados = {
        run: formulario.run.trim() || null,
        nombre: formulario.nombre.trim(),
        apellidos: formulario.apellidos.trim(),
        email: formulario.email.trim(),
        fechaNacimiento: formulario.fechaNacimiento || null,
        rol: formulario.rol,
        region: formulario.region,
        comuna: formulario.comuna,
        direccion: formulario.direccion.trim(),
        activo: formulario.activo,
      };

      await actualizarUsuarioApi(id, datosActualizados);

      navigate("/admin/usuarios", {
        replace: true,
      });
    } catch (error) {
      setErrorServidor(error.message || "No se pudo actualizar el usuario.");
    } finally {
      setGuardando(false);
    }
  }

  // Crear los campos de texto del formulario
  function campo({
    nombre,
    titulo,
    tipo = "text",
    obligatorio = false,
    maxLength,
  }) {
    return (
      <div className="campo" key={nombre}>
        <label htmlFor={`editar-${nombre}`}>
          {titulo}
          {obligatorio ? " *" : ""}
        </label>

        <input
          id={`editar-${nombre}`}
          name={nombre}
          type={tipo}
          value={formulario[nombre]}
          onChange={actualizarCampo}
          maxLength={maxLength}
        />

        {errores[nombre] && (
          <span className="error-campo">{errores[nombre]}</span>
        )}
      </div>
    );
  }

  if (cargando) {
    return (
      <main>
        <section className="seccion--corta">
          <div className="contenedor">
            <p>Cargando usuario desde MySQL...</p>
          </div>
        </section>
      </main>
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
          {errorServidor && (
            <p role="alert" className="error-campo">
              {errorServidor}
            </p>
          )}

          {errorServidor && !formulario.nombre && !formulario.email ? (
            <Link to="/admin/usuarios" className="boton boton--claro">
              Volver a usuarios
            </Link>
          ) : (
            <form
              className="panel formulario"
              onSubmit={guardarCambios}
              noValidate
            >
              {campo({
                nombre: "run",
                titulo: "RUN",
                maxLength: 20,
              })}

              {campo({
                nombre: "nombre",
                titulo: "Nombre",
                obligatorio: true,
                maxLength: 100,
              })}

              {campo({
                nombre: "apellidos",
                titulo: "Apellidos",
                obligatorio: true,
                maxLength: 100,
              })}

              {campo({
                nombre: "email",
                titulo: "Correo electrónico",
                tipo: "email",
                obligatorio: true,
                maxLength: 150,
              })}

              {campo({
                nombre: "fechaNacimiento",
                titulo: "Fecha de nacimiento",
                tipo: "date",
              })}

              <div className="campo">
                <label htmlFor="editar-rol">Tipo de usuario *</label>

                <select
                  id="editar-rol"
                  name="rol"
                  value={formulario.rol}
                  onChange={actualizarCampo}
                >
                  <option value="CLIENTE">Cliente</option>

                  <option value="VENDEDOR">Vendedor</option>

                  <option value="ADMINISTRADOR">Administrador</option>
                </select>

                {errores.rol && (
                  <span className="error-campo">{errores.rol}</span>
                )}
              </div>

              <div className="campo">
                <label htmlFor="editar-region">Región *</label>

                <select
                  id="editar-region"
                  name="region"
                  value={formulario.region}
                  onChange={actualizarCampo}
                >
                  <option value="">Selecciona una región</option>

                  {regionNoRegistrada && (
                    <option value={formulario.region}>
                      {formulario.region}
                    </option>
                  )}

                  {Object.keys(regiones).map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>

                {errores.region && (
                  <span className="error-campo">{errores.region}</span>
                )}
              </div>

              <div className="campo">
                <label htmlFor="editar-comuna">Comuna *</label>

                <select
                  id="editar-comuna"
                  name="comuna"
                  value={formulario.comuna}
                  onChange={actualizarCampo}
                  disabled={!formulario.region}
                >
                  <option value="">Selecciona una comuna</option>

                  {comunaNoRegistrada && (
                    <option value={formulario.comuna}>
                      {formulario.comuna}
                    </option>
                  )}

                  {comunasDisponibles.map((comuna) => (
                    <option key={comuna} value={comuna}>
                      {comuna}
                    </option>
                  ))}
                </select>

                {errores.comuna && (
                  <span className="error-campo">{errores.comuna}</span>
                )}
              </div>

              {campo({
                nombre: "direccion",
                titulo: "Dirección",
                obligatorio: true,
                maxLength: 200,
              })}

              <div className="campo">
                <label htmlFor="editar-activo">
                  <input
                    id="editar-activo"
                    name="activo"
                    type="checkbox"
                    checked={formulario.activo}
                    onChange={actualizarCampo}
                  />
                  Usuario activo
                </label>
              </div>

              <p>La contraseña actual del usuario se conservará sin cambios.</p>

              <div className="detalle-producto__acciones">
                <button type="submit" className="boton" disabled={guardando}>
                  {guardando ? "Guardando..." : "Guardar cambios"}
                </button>

                <Link to="/admin/usuarios" className="boton boton--claro">
                  Cancelar
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default UsuarioEditar;
