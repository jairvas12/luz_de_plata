import {Link, NavLink} from "react-router-dom";


function LateralAdmin() {

  return (
    <aside className="admin-sidebar">
      <Link
        className="admin-brand"
        to="/admin"
      >
        Luz de Plata
        <br />
        <small>
          Administración
        </small>
      </Link>
      <nav className="admin-menu">
        <NavLink to="/admin" end className={({ isActive }) =>isActive ? "activo" : ""}>
          Inicio
        </NavLink>
        <NavLink to="/admin/productos">
          Productos
        </NavLink>
        <NavLink to="/admin/ordenes">
          Órdenes
        </NavLink>
        <NavLink to="/admin/productos/nuevo">
          Nuevo producto
        </NavLink>
        <NavLink to="/admin/usuarios">
          Usuarios
        </NavLink>
        <NavLink to="/admin/usuarios/nuevo">
          Nuevo usuario
        </NavLink>
      </nav>
      <div className="admin-sidebar__pie">
        <Link className="boton boton--claro"to="/">
          Ver tienda
        </Link>
        <button className="boton boton--suave" type="button">
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}


export default LateralAdmin;