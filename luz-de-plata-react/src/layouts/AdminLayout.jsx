import { Outlet } from "react-router-dom";

import LateralAdmin from "../components/LateralAdmin";

import "../css/estilos.css";
import "../css/admin.css";

// Obtener los datos del usuario autenticado
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

// Convertir el rol a un nombre legible
function mostrarRol(rol) {
  switch (String(rol ?? "").toUpperCase()) {
    case "ADMINISTRADOR":
      return "Administrador";

    case "VENDEDOR":
      return "Vendedor";

    case "CLIENTE":
      return "Cliente";

    default:
      return "Usuario";
  }
}

function AdminLayout() {
  const usuario = obtenerUsuarioActual();

  const nombre = usuario?.name || "Usuario";
  const rol = mostrarRol(usuario?.role);

  return (
    <div className="admin-shell">
      {/* Menú lateral administrativo */}
      <LateralAdmin />

      {/* Contenido principal */}
      <main className="admin-main">
        <header className="admin-topbar">
          <strong>Panel principal</strong>

          <span>
            {nombre} · {rol}
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
