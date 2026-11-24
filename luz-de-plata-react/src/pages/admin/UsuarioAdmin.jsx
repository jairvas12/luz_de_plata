import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  listarUsuariosApi,
  eliminarUsuarioApi,
} from "../../services/adminUsuariosApi";

import "../../css/estilos.css";

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null);

  // Consultar usuarios reales desde Spring Boot
  const cargarUsuarios = useCallback(async () => {
    setCargando(true);
    setError("");

    try {
      const datos = await listarUsuariosApi();
      setUsuarios(datos);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los usuarios");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  // Eliminar un usuario de MySQL
  async function eliminarUsuario(usuario) {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar a ${usuario.name} ${usuario.lastName}?\n\nEsta acción eliminará el usuario de la base de datos.`,
    );

    if (!confirmar) {
      return;
    }

    setEliminandoId(usuario.id);
    setError("");
    setMensaje("");

    try {
      await eliminarUsuarioApi(usuario.id);

      setUsuarios((actuales) =>
        actuales.filter((item) => item.id !== usuario.id),
      );

      setMensaje("Usuario eliminado correctamente.");
    } catch (err) {
      setError(err.message || "No se pudo eliminar el usuario");
    } finally {
      setEliminandoId(null);
    }
  }

  function mostrarRol(rol) {
    switch (rol) {
      case "ADMINISTRADOR":
        return "Administrador";

      case "VENDEDOR":
        return "Vendedor";

      case "CLIENTE":
        return "Cliente";

      default:
        return rol;
    }
  }

  return (
    <main>
      <section className="pagina-encabezado">
        <div className="contenedor">
          <h1>Usuarios</h1>

          <p className="bajada">
            Administra los usuarios registrados en Luz de Plata.
          </p>

          <Link to="/admin/usuarios/nuevo" className="boton">
            Nuevo usuario
          </Link>
        </div>
      </section>

      <section className="seccion--corta">
        <div className="contenedor">
          {mensaje && <p role="status">{mensaje}</p>}

          {error && (
            <div role="alert">
              <p>Error: {error}</p>

              <button
                type="button"
                className="boton boton--claro"
                onClick={cargarUsuarios}
              >
                Reintentar
              </button>
            </div>
          )}

          {cargando && <p>Cargando usuarios desde MySQL...</p>}

          {!cargando && !error && usuarios.length === 0 && (
            <div className="mensaje-vacio">No hay usuarios registrados.</div>
          )}

          {!cargando && usuarios.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Región</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>

                      <td>
                        {usuario.name}
                        {usuario.lastName ? ` ${usuario.lastName}` : ""}
                      </td>

                      <td>{usuario.email}</td>

                      <td>{mostrarRol(usuario.role)}</td>

                      <td>{usuario.region || "-"}</td>

                      <td>{usuario.active ? "Activo" : "Inactivo"}</td>

                      <td>
                        <div className="acciones-tabla">
                          <Link
                            to={`/admin/usuarios/editar/${usuario.id}`}
                            className="boton boton--claro"
                          >
                            Editar
                          </Link>

                          <button
                            type="button"
                            className="boton boton--peligro"
                            disabled={eliminandoId !== null}
                            onClick={() => eliminarUsuario(usuario)}
                          >
                            {eliminandoId === usuario.id
                              ? "Eliminando..."
                              : "Eliminar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default UsuariosAdmin;
