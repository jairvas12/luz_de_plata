import {
  Outlet
} from "react-router-dom";
import "../css/estilos.css";
import LateralAdmin from "../components/LateralAdmin";

function AdminLayout() {

  return (
    <>
        <LateralAdmin />
        <Outlet />
    </>
  )     
}


export default AdminLayout;