import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import regiones from "../../data/regiones";
import { crearUsuarioApi } from "../../services/adminUsuariosApi";

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
  password: "",
  confirmarPassword: "",
};

function UsuarioNuevo() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL);

  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Obtener comunas de la región seleccionada
  const comunasDisponibles = formulario.region
    ? regiones[formulario.region] || []
    : [];

  // Actualizar los campos del formulario
  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
      ...(name === "region" ? { comuna: "" } : {}),
    }));

    setErrores((anterior) => ({
      ...anterior,
      [name]: "",
    }));
  }

  // Validar los datos antes de guardar
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

    if (!formulario.region) {
      nuevosErrores.region = "Selecciona una región.";
    }

    if (!formulario.comuna) {
      nuevosErrores.comuna = "Selecciona una comuna.";
    }

    if (!formulario.direccion.trim()) {
      nuevosErrores.direccion = "La dirección es obligatoria.";
    }

    if (formulario.password.length < 12) {
      nuevosErrores.password =
        "La contraseña debe tener al menos 12 caracteres.";
    }

    if (formulario.password.length > 128) {
      nuevosErrores.password =
        "La contraseña no puede superar los 128 caracteres.";
    }

    if (formulario.password !== formulario.confirmarPassword) {
      nuevosErrores.confirmarPassword = "Las contraseñas no coinciden.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  }

  // Crear usuario real mediante Spring Boot
  async function guardarNuevoUsuario(evento) {
    evento.preventDefault();

    if (guardando || !validarFormulario()) {
      return;
    }

    setGuardando(true);
    setErrorServidor("");

    try {
      const nuevoUsuario = {
        run: formulario.run.trim() || null,
        nombre: formulario.nombre.trim(),
        apellidos: formulario.apellidos.trim(),
        email: formulario.email.trim(),
        fechaNacimiento: formulario.fechaNacimiento || null,
        rol: formulario.rol,
        region: formulario.region,
        comuna: formulario.comuna,
        direccion: formulario.direccion.trim(),
        password: formulario.password,
        activo: true,
      };

      await crearUsuarioApi(nuevoUsuario);

      navigate("/admin/usuarios", {
        replace: true,
      });
    } catch (error) {
      setErrorServidor(error.message || "No se pudo crear el usuario.");
    } finally {
      setGuardando(false);
    }
  }

  // Campos reutilizables del formulario
  function campo({
    nombre,
    titulo,
    tipo = "text",
    obligatorio = false,
    maxLength,
  }) {
    return (
      <div className="campo" key={nombre}>
        <label htmlFor={`nuevo-${nombre}`}>
          {titulo}
          {obligatorio ? " *" : ""}
        </label>

        <input
          id={`nuevo-${nombre}`}
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

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>Nuevo usuario</h1>

          <p className="bajada">Crea un nuevo usuario en Luz de Plata.</p>
        </div>
      </section>

      <section className="seccion--corta">
        <div className="contenedor">
          <form
            className="panel formulario"
            onSubmit={guardarNuevoUsuario}
            noValidate
          >
            {errorServidor && (
              <p role="alert" className="error-campo">
                {errorServidor}
              </p>
            )}

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
              <label htmlFor="nuevo-rol">Tipo de usuario *</label>

              <select
                id="nuevo-rol"
                name="rol"
                value={formulario.rol}
                onChange={actualizarCampo}
              >
                <option value="CLIENTE">Cliente</option>

                <option value="VENDEDOR">Vendedor</option>

                <option value="ADMINISTRADOR">Administrador</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="nuevo-region">Región *</label>

              <select
                id="nuevo-region"
                name="region"
                value={formulario.region}
                onChange={actualizarCampo}
              >
                <option value="">Selecciona una región</option>

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
              <label htmlFor="nuevo-comuna">Comuna *</label>

              <select
                id="nuevo-comuna"
                name="comuna"
                value={formulario.comuna}
                onChange={actualizarCampo}
                disabled={!formulario.region}
              >
                <option value="">Selecciona una comuna</option>

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

            {campo({
              nombre: "password",
              titulo: "Contraseña",
              tipo: "password",
              obligatorio: true,
              maxLength: 128,
            })}

            {campo({
              nombre: "confirmarPassword",
              titulo: "Confirmar contraseña",
              tipo: "password",
              obligatorio: true,
              maxLength: 128,
            })}

            <p>La contraseña debe tener entre 12 y 128 caracteres.</p>

            <div className="detalle-producto__acciones">
              <button type="submit" className="boton" disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar usuario"}
              </button>

              <Link to="/admin/usuarios" className="boton boton--claro">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default UsuarioNuevo;
