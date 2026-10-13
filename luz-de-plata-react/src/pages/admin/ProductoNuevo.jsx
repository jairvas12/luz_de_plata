import {
  useState
} from "react";

import {
  Link
} from "react-router-dom";


function ProductoNuevo() {

  const [formulario, setFormulario] =
    useState({
      code: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      criticalStock: "",
      category: "",
      image: ""
    });


  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");


  function manejarCambio(evento) {

    const {name, value} = evento.target;
    setFormulario({...formulario,[name]: value});
    setErrores({...errores,[name]: ""});
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


    const formularioValido =
      validarFormulario();


    if (!formularioValido) {
      return;
    }


    const nuevoProducto = {

      id: null,

      code:
        formulario.code.trim(),

      name:
        formulario.name.trim(),

      description:
        formulario.description.trim(),

      price:
        Number(formulario.price),

      stock:
        Number(formulario.stock),

      criticalStock:
        formulario.criticalStock === ""
          ? ""
          : Number(
              formulario.criticalStock
            ),

      category:
        formulario.category,

      image:
        formulario.image.trim()
        ||
        "/img/aros/1.webp",

      featured: false

    };


    console.log(
      "Producto preparado:",
      nuevoProducto
    );


    setMensaje(
      "Producto validado correctamente. El guardado se conectará a la base de datos posteriormente."
    );

  }


  return (

    <>

      <h1>
        Nuevo producto
      </h1>


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

          <label htmlFor="admin-code">
            Código producto *
          </label>

          <input
            id="admin-code"
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

          <label htmlFor="admin-name">
            Nombre *
          </label>

          <input
            autoComplete="off"
            id="admin-name"
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

          <label htmlFor="admin-description">
            Descripción
          </label>

          <textarea
            id="admin-description"
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

          <label htmlFor="admin-price">
            Precio *
          </label>

          <input
            id="admin-price"
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

          <label htmlFor="admin-stock">
            Stock *
          </label>

          <input
            id="admin-stock"
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

          <label htmlFor="admin-criticalStock">
            Stock crítico
          </label>

          <input
            id="admin-criticalStock"
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

          <label htmlFor="admin-category">
            Categoría *
          </label>

          <select
            id="admin-category"
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

          <label htmlFor="admin-image">
            Imagen
          </label>

          <input
            id="admin-image"
            name="image"
            placeholder="/img/aros/1.webp"
            type="text"
            value={formulario.image}
            onChange={manejarCambio}
          />

          <span className="ayuda">
            Ejemplo: /img/pulseras/19.webp
          </span>

        </div>


        <div className="campo campo--completo form-acciones">

          <button
            className="boton"
            type="submit"
          >
            Guardar producto
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

export default ProductoNuevo;