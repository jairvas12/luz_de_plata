import {
  Outlet
} from "react-router-dom";

import Cabecera
  from "../components/Cabecera";

import Nav
  from "../components/Nav";

import Pie
  from "../components/Pie";
import LateralAdmin from "../components/LateralAdmin";

function PublicLayout() {

  return (
    <>

      <Cabecera />

      <Nav />
      <Outlet />

      <Pie />

    </>
  );

}


export default PublicLayout;