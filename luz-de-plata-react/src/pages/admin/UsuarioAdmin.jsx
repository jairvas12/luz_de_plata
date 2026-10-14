import { useState } from "react";
import { Link } from "react-router-dom";
import { obtenerUsuarios, guardarUsuarios } from "../../utils/usuarios";
import "../../css/estilos.css";

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState(obtenerUsuarios());

  function eliminarUsuario(id) {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este usuario?",
    );

    if (!confirmar) {
      return;
    }

    const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);

    setUsuarios(nuevosUsuarios);
    guardarUsuarios(nuevosUsuarios);
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
          {usuarios.length === 0 ? (
            <div className="mensaje-vacio">No hay usuarios registrados.</div>
          ) : (
            <div className="tabla-responsive">
              <table className="tabla-admin">
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

                      <td>{usuario.role}</td>

                      <td>{usuario.region || "-"}</td>

                      <td>
                        {usuario.active === false ? "Inactivo" : "Activo"}
                      </td>

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
                            onClick={() => eliminarUsuario(usuario.id)}
                          >
                            Eliminar
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
