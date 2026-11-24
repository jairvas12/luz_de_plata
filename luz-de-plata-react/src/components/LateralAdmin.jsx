import { Link, NavLink, useNavigate } from "react-router-dom";

// Obtener el usuario autenticado
function obtenerUsuarioActual() {
  try {
    const sesionGuardada = localStorage.getItem("lp_session_v1");

    if (!sesionGuardada) {
      return null;
    }

    return JSON.parse(sesionGuardada);
  } catch {
    return null;
  }
}

function LateralAdmin() {
  const navigate = useNavigate();

  const usuario = obtenerUsuarioActual();

  const rol = String(usuario?.role ?? "")
    .trim()
    .toUpperCase();

  const esAdministrador = rol === "ADMINISTRADOR";

  // Cerrar la sesión actual
  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("lp_session_v1");

    navigate("/Login", { replace: true });
  }

  // Aplicar el estilo activo del menú
  const claseMenu = ({ isActive }) => (isActive ? "activo" : "");

  return (
    <aside className="admin-sidebar">
      {/* Logo y nombre de la tienda */}
      <Link className="admin-brand" to="/admin">
        Luz de Plata
        <br />
        <small>Administración</small>
      </Link>

      {/* Menú lateral */}
      <nav className="admin-menu">
        {/* Administrador y vendedor */}
        <NavLink to="/admin" end className={claseMenu}>
          Inicio
        </NavLink>

        <NavLink to="/admin/productos" className={claseMenu}>
          Productos
        </NavLink>

        <NavLink to="/admin/ordenes" className={claseMenu}>
          Órdenes
        </NavLink>

        {/* Funciones exclusivas del administrador */}
        {esAdministrador && (
          <>
            <NavLink to="/admin/productos/nuevo" className={claseMenu}>
              Nuevo producto
            </NavLink>

            <NavLink to="/admin/usuarios" className={claseMenu}>
              Usuarios
            </NavLink>

            <NavLink to="/admin/usuarios/nuevo" className={claseMenu}>
              Nuevo usuario
            </NavLink>
          </>
        )}
      </nav>

      {/* Acciones inferiores */}
      <div className="admin-sidebar__pie">
        <Link className="boton boton--claro" to="/">
          Ver tienda
        </Link>

        <button
          className="boton boton--suave"
          type="button"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

export default LateralAdmin;
