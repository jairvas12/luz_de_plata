import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import FormularioProductoAdmin from "../../components/FormularioProductoAdmin";
import { apiRequest } from "../../services/api";

function ProductoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarProducto() {
      setCargando(true);
      setError("");

      try {
        const respuesta = await apiRequest(
          `/productos/${encodeURIComponent(id)}`,
        );

        if (activo) {
          setProducto(respuesta);
        }
      } catch (err) {
        if (activo) {
          setError(err.message || "No se pudo cargar el producto.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProducto();

    return () => {
      activo = false;
    };
  }, [id]);

  async function actualizarProducto(datos, categoriaId) {
    await apiRequest(
      `/productos/${encodeURIComponent(id)}?categoriaId=${encodeURIComponent(categoriaId)}`,
      {
        method: "PUT",
        body: JSON.stringify(datos),
      },
    );

    navigate("/admin/productos", {
      replace: true,
    });
  }

  if (cargando) {
    return <p>Cargando producto desde MySQL...</p>;
  }

  if (error || !producto) {
    return (
      <>
        <h1>Producto no encontrado</h1>

        <p role="alert" style={{ color: "#a33" }}>
          {error || "No se encontró el producto solicitado."}
        </p>

        <Link className="boton boton--claro" to="/admin/productos">
          Volver a productos
        </Link>
      </>
    );
  }

  return (
    <>
      <h1>Editar producto</h1>

      <p className="muted">Editando: {producto.nombre}</p>

      <FormularioProductoAdmin
        modo="editar"
        producto={producto}
        onGuardar={actualizarProducto}
      />
    </>
  );
}

export default ProductoEditar;
