// componentes

import Cabecera from "./components/Cabecera";
import Pie from "./components/Pie";
import Nav from "./components/Nav";

// paginas
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
import AdminMenu from "./components/AdminMenu";

import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <>
      <Routes>
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
          <Route path="/MisCompras" element={<MisCompras />} />
          <Route path="/MisEnvios" element={<MisEnvios />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Favoritos" element={<Favoritos />} />
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route element={<AdminMenu />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
