import {
  Outlet
} from "react-router-dom";

import AdminMenu
  from "../components/AdminMenu";


function AdminLayout() {

  return (
    <div className="admin-layout">

      <AdminMenu />

      <main className="admin-contenido">

        <Outlet />

      </main>

    </div>
  );

}


export default AdminLayout;