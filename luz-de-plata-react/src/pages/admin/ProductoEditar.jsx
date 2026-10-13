import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import productos from "../../data/productos";


function ProductoEditar() {
  const {id} = useParams();
  const productoEncontrado =
    productos.find(producto => producto.id === id);
  const [formulario, setFormulario] =
    useState(
      productoEncontrado
        ? {
            code: productoEncontrado.code,
            name: productoEncontrado.name,
            description: productoEncontrado.description,
            price: productoEncontrado.price,
            stock: productoEncontrado.stock,
            criticalStock: productoEncontrado.criticalStock,
            category: productoEncontrado.category,
            image: productoEncontrado.image
        }
        : {
            code: "",
            name: "",
            description: "",
            price: "",
            stock: "",
            criticalStock: "",
            category: "",
            image: ""
          }
    );
  const [errores, setErrores] = useState({});

  const [mensaje, setMensaje] = useState("");
  function manejarCambio(evento) {
    const {
      name,
      value
    } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value
    });

    setErrores({
      ...errores,
      [name]: ""
    });
  }


  function validarFormulario() {

    const nuevosErrores = {};
    if (
      formulario.code
        .trim()
        .length < 3
    ) {
      nuevosErrores.code =
        "El código requiere mínimo 3 caracteres.";
    }

    if (
      !formulario.name.trim()
    ) {
      nuevosErrores.name =
        "El nombre es requerido.";
    }
    else if (
      formulario.name.length > 100
    ) {
      nuevosErrores.name =
        "Máximo 100 caracteres.";
    }

    if (
      formulario.description.length > 500
    ) {
      nuevosErrores.description =
        "Máximo 500 caracteres.";
    }

    if (
      formulario.price === ""
    ) {
      nuevosErrores.price =
        "El precio es requerido.";
    }
    else if (
      Number(formulario.price) < 0
    ) {
      nuevosErrores.price =
        "El precio no puede ser negativo.";
    }

    if (
      formulario.stock === ""
    ) {
      nuevosErrores.stock =
        "El stock es requerido.";
    }
    else if (
      Number(formulario.stock) < 0
    ) {
      nuevosErrores.stock =
        "El stock no puede ser negativo.";
    }
    else if (
      !Number.isInteger(
        Number(formulario.stock)
      )
    ) {
      nuevosErrores.stock =
        "El stock debe ser un número entero.";
    }

    if (
      formulario.criticalStock !== ""
      &&
      Number(formulario.criticalStock) < 0
    ) {
      nuevosErrores.criticalStock =
        "El stock crítico no puede ser negativo.";
    }
    else if (
      formulario.criticalStock !== ""
      &&
      !Number.isInteger(
        Number(formulario.criticalStock)
      )
    ) {
      nuevosErrores.criticalStock =
        "El stock crítico debe ser un número entero.";
    }

    if (
      !formulario.category
    ) {
      nuevosErrores.category =
        "Debes seleccionar una categoría.";
    }

    setErrores(
      nuevosErrores
    );

    return (
      Object.keys(
        nuevosErrores
      ).length === 0
    );
  }

  function manejarSubmit(evento) {

    evento.preventDefault();
    setMensaje("");

    if (
      !validarFormulario()
    ) {
      return;
    }

    const productoEditado = {
      id: productoEncontrado.id,
      code: formulario.code.trim(),
      name: formulario.name.trim(),
      description: formulario.description.trim(),
      price: Number(formulario.price),
      stock: Number(formulario.stock),
      criticalStock: formulario.criticalStock === "" ? "" : Number(formulario.criticalStock),
      category: formulario.category,
      image: formulario.image.trim(),
      featured: productoEncontrado.featured
    };

    console.log(
      "Producto editado:",
      productoEditado
    );

    setMensaje(
      "Producto validado correctamente. La actualización se conectará a la base de datos posteriormente."
    );
  }

  if (!productoEncontrado) {
    return (

      <>
        <h1>
          Producto no encontrado
        </h1>
        <p>
          No existe un producto con el ID:
          {" "}
          {id}
        </p>
        <Link
          className="boton"
          to="/admin/productos"
        >
          Volver a productos
        </Link>
      </>
    );
  }
  return (
    <>
      <h1>
        Editar producto
      </h1>
      <p className="muted">
        Editando:
        {" "}
        {productoEncontrado.name}
      </p>
      {
        mensaje
        &&
        (
          <div className="alerta alerta--exito">
            {mensaje}
          </div>
        )
      }
      <form
        className="admin-card formulario form-grid"
        onSubmit={manejarSubmit}
        noValidate
      >
        <div className="campo">
          <label htmlFor="edit-code">
            Código producto *
          </label>
          <input
            id="edit-code"
            name="code"
            type="text"
            value={formulario.code}
            onChange={manejarCambio}
            className={
              errores.code
                ? "invalido"
                : ""
            }
          />
          <span className="error-campo">
            {errores.code}
          </span>
        </div>
        <div className="campo">
          <label htmlFor="edit-name">
            Nombre *
          </label>
          <input
            id="edit-name"
            maxLength="100"
            name="name"
            type="text"
            value={formulario.name}
            onChange={manejarCambio}
            className={
              errores.name
                ? "invalido"
                : ""
            }
          />
          <span className="error-campo">
            {errores.name}
          </span>
        </div>
        <div className="campo campo--completo">
          <label htmlFor="edit-description">
            Descripción
          </label>
          <textarea
            id="edit-description"
            maxLength="500"
            name="description"
            value={formulario.description}
            onChange={manejarCambio}
            className={
              errores.description
                ? "invalido"
                : ""
            }
          />
          <span className="error-campo">
            {errores.description}
          </span>
        </div>
        <div className="campo">
          <label htmlFor="edit-price">
            Precio *
          </label>
          <input
            id="edit-price"
            min="0"
            name="price"
            step="0.01"
            type="number"
            value={formulario.price}
            onChange={manejarCambio}
            className={
              errores.price
                ? "invalido"
                : ""
            }
          />
          <span className="error-campo">
            {errores.price}
          </span>
        </div>
        <div className="campo">
          <label htmlFor="edit-stock">
            Stock *
          </label>
          <input
            id="edit-stock"
            min="0"
            name="stock"
            step="1"
            type="number"
            value={formulario.stock}
            onChange={manejarCambio}
            className={
              errores.stock
                ? "invalido"
                : ""
            }
          />
          <span className="error-campo">
            {errores.stock}
          </span>
        </div>
        <div className="campo">
          <label htmlFor="edit-criticalStock">
            Stock crítico
          </label>
          <input
            id="edit-criticalStock"
            min="0"
            name="criticalStock"
            step="1"
            type="number"
            value={formulario.criticalStock}
            onChange={manejarCambio}
            className={
              errores.criticalStock
                ? "invalido"
                : ""
            }
          />
          <span className="error-campo">
            {errores.criticalStock}
          </span>
        </div>
        <div className="campo">
          <label htmlFor="edit-category">
            Categoría *
          </label>
          <select
            id="edit-category"
            name="category"
            value={formulario.category}
            onChange={manejarCambio}
            className={
              errores.category
                ? "invalido"
                : ""
            }
          >
            <option value="">
              Selecciona
            </option>
            <option value="Aros">
              Aros
            </option>
            <option value="Cadenas">
              Cadenas
            </option>
            <option value="Pulseras">
              Pulseras
            </option>
            <option value="Dijes">
              Dijes
            </option>
            <option value="Conjuntos">
              Conjuntos
            </option>
          </select>
          <span className="error-campo">
            {errores.category}
          </span>
        </div>
        <div className="campo campo--completo">
          <label htmlFor="edit-image">
            Imagen
          </label>
          <input
            id="edit-image"
            name="image"
            type="text"
            value={formulario.image}
            onChange={manejarCambio}
          />
        </div>
        <div className="campo campo--completo form-acciones">
          <button
            className="boton"
            type="submit"
          >
            Guardar cambios
          </button>
          <Link
            className="boton boton--claro"
            to="/admin/productos"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}
export default ProductoEditar;