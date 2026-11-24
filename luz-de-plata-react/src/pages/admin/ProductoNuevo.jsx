import { useNavigate } from "react-router-dom";

import FormularioProductoAdmin from "../../components/FormularioProductoAdmin";
import { apiRequest } from "../../services/api";

function ProductoNuevo() {
  const navigate = useNavigate();

  async function crearProducto(datos, categoriaId) {
    await apiRequest(
      `/productos?categoriaId=${encodeURIComponent(categoriaId)}`,
      {
        method: "POST",
        body: JSON.stringify(datos),
      },
    );

    navigate("/admin/productos", {
      replace: true,
    });
  }

  return (
    <>
      <h1>Nuevo producto</h1>

      <p className="muted">
        Registra un nuevo producto en la base de datos MySQL.
      </p>

      <FormularioProductoAdmin modo="crear" onGuardar={crearProducto} />
    </>
  );
}

export default ProductoNuevo;
