import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// ==========================================
// PÁGINAS PÚBLICAS
// ==========================================

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import Envios from "./pages/Envios";
import Compra_Exitosa from "./pages/Compra_Exitosa";
import MasVendidos from "./pages/MasVendidos";
import Conocenos from "./pages/Conocenos";
import Contacto from "./pages/Contacto";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login";
import MisCompras from "./pages/MisCompras";
import MisEnvios from "./pages/MisEnvios";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Favoritos from "./pages/Favoritos";
import Registro from "./pages/Registro";

// ==========================================
// PÁGINAS ADMINISTRATIVAS
// ==========================================

import AdminInicio from "./pages/admin/Admininicio";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import ProductoNuevo from "./pages/admin/ProductoNuevo";
import ProductoEditar from "./pages/admin/ProductoEditar";
import OrdenesAdmin from "./pages/admin/OrdenesAdmin";
import OrdenDetalle from "./pages/admin/OrdenDetalle";
import UsuariosAdmin from "./pages/admin/UsuarioAdmin";
import UsuarioNuevo from "./pages/admin/UsuarioNuevo";
import UsuarioEditar from "./pages/admin/UsuarioEditar";

// ==========================================
// LAYOUTS
// ==========================================

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

// ==========================================
// OBTENER SESIÓN ACTUAL
// ==========================================
function limpiarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem(
    "lp_session_v1"
  );
  localStorage.removeItem("sesion");
}
function obtenerSesionActual() {
  const token = localStorage.getItem("token");
  const sesionGuardada = localStorage.getItem("lp_session_v1");

  if (!token || !sesionGuardada) {
    limpiarSesion();
    return null;
  }

  try {
    const sesion = JSON.parse(sesionGuardada);

    if (!sesion || !sesion.role) {
      limpiarSesion();
      return null;
    }

    const partes = token.split(".");

    if (partes.length !== 3) {
      limpiarSesion();
      return null;
    }

    const base64 = partes[1].replace(/-/g, "+").replace(/_/g, "/");

    const payload = JSON.parse(atob(base64));

    if (
      typeof payload.exp !== "number"
      || payload.exp * 1000 <= Date.now()
    ) {
      limpiarSesion();
      return null;
    }

    return sesion;
  } catch {
    limpiarSesion();
    return null;
  }
}

// ==========================================
// NORMALIZAR ROLES
// ==========================================

function obtenerRol(sesion) {
  if (!sesion) {
    return null;
  }

  const rol = String(sesion.role).trim().toUpperCase();

  if (rol === "ADMINISTRADOR") {
    return "ADMINISTRADOR";
  }

  if (rol === "VENDEDOR") {
    return "VENDEDOR";
  }

  if (rol === "CLIENTE") {
    return "CLIENTE";
  }

  return null;
}

// ==========================================
// PROTECCIÓN DE RUTAS
// ==========================================

function RutaProtegida({ rolesPermitidos }) {
  const sesion = obtenerSesionActual();
  const rol = obtenerRol(sesion);

  // No hay sesión válida
  if (!sesion || !rol) {
    return <Navigate to="/Login" replace />;
  }

  // El usuario no tiene permisos
  if (!rolesPermitidos.includes(rol)) {
    if (rol === "CLIENTE") {
      return <Navigate to="/" replace />;
    }

    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

// ==========================================
// RUTAS DE LUZ DE PLATA
// ==========================================

function App() {
  return (
    <Routes>
      {/* ====================================
          TIENDA PÚBLICA
      ==================================== */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/Blog" element={<Blog />} />

        <Route path="/Blog1" element={<Blog1 />} />

        <Route path="/Blog2" element={<Blog2 />} />

        <Route path="/Envios" element={<Envios />} />

        <Route path="/Compra_Exitosa" element={<Compra_Exitosa />} />

        <Route path="/MasVendidos" element={<MasVendidos />} />

        <Route path="/Conocenos" element={<Conocenos />} />

        <Route path="/Contacto" element={<Contacto />} />

        <Route path="/Catalogo" element={<Catalogo />} />

        <Route path="/Login" element={<Login />} />

        <Route path="/Registro" element={<Registro />} />

        <Route path="/MisCompras" element={<MisCompras />} />

        <Route path="/MisEnvios" element={<MisEnvios />} />

        <Route path="/producto/:id" element={<DetalleProducto />} />

        <Route path="/Carrito" element={<Carrito />} />

        <Route path="/Favoritos" element={<Favoritos />} />
      </Route>

      {/* ====================================
          ADMINISTRADOR Y VENDEDOR
      ==================================== */}

      <Route
        element={
          <RutaProtegida rolesPermitidos={["ADMINISTRADOR", "VENDEDOR"]} />
        }
      >
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminInicio />} />

          {/* Consulta de productos */}
          <Route path="productos" element={<ProductosAdmin />} />

          {/* Consulta de órdenes */}
          <Route path="ordenes" element={<OrdenesAdmin />} />

          <Route path="ordenes/:id" element={<OrdenDetalle />} />

          {/* ===============================
              SOLO ADMINISTRADOR
          =============================== */}

          <Route
            element={<RutaProtegida rolesPermitidos={["ADMINISTRADOR"]} />}
          >
            {/* Gestión de productos */}
            <Route path="productos/nuevo" element={<ProductoNuevo />} />

            <Route path="productos/editar/:id" element={<ProductoEditar />} />

            {/* Listado de usuarios */}
            <Route path="usuarios" element={<UsuariosAdmin />} />

            {/* Crear usuario */}
            <Route path="usuarios/nuevo" element={<UsuarioNuevo />} />

            {/* Editar usuario */}
            <Route path="usuarios/editar/:id" element={<UsuarioEditar />} />
          </Route>
        </Route>
      </Route>

      {/* ====================================
          RUTA NO ENCONTRADA
      ==================================== */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
