import {
  Link
} from "react-router-dom";


function AdminMenu() {

  return (

    <aside className="admin-menu">

      <h2>
        Luz de Plata
      </h2>

      <nav>

        <ul>

          <li>

            <Link to="/admin">
              Inicio
            </Link>

          </li>

          <li>

            <Link to="/admin/productos">
              Productos
            </Link>

          </li>

          <li>

            <Link to="/admin/usuarios">
              Usuarios
            </Link>

          </li>

          <li>

            <Link to="/admin/pedidos">
              Pedidos
            </Link>

          </li>

        </ul>

      </nav>

    </aside>

  );

}


export default AdminMenu;