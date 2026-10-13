import {Outlet} from "react-router-dom";

import LateralAdmin from "../components/LateralAdmin";

import "../css/estilos.css";
import "../css/admin.css";


function AdminLayout() {
  return (
    <div className="admin-shell">
      <LateralAdmin />
      <main className="admin-main">
        <header className="admin-topbar">
          <strong>
            Panel principal
          </strong>
          <span>
            Admin · Administrador
          </span>
        </header>
        <section className="admin-contenido">
          <Outlet />
        </section>
      </main>
    </div>
  );
}


export default AdminLayout;