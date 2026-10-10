import {
  Outlet
} from "react-router-dom";

import Cabecera
  from "../components/Cabecera";

import Nav
  from "../components/Nav";

import Pie
  from "../components/Pie";


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