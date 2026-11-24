import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

const FORMULARIO_VACIO = {
  codigo: "",
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  stockCritico: "",
  categoriaId: "",
  imagen: "",
  destacado: false,
};

function prepararFormulario(producto) {
  if (!producto) return { ...FORMULARIO_VACIO };

  return {
    codigo: producto.codigo ?? "",
    nombre: producto.nombre ?? "",
    descripcion: producto.descripcion ?? "",
    precio: producto.precio ?? "",
    stock: producto.stock ?? "",
    stockCritico: producto.stockCritico ?? "",
    categoriaId: producto.categoria?.id ? String(producto.categoria.id) : "",
    imagen: producto.imagen ?? "",
    destacado: Boolean(producto.destacado),
  };
}

function validar(datos) {
  const errores = {};

  if (datos.codigo.trim().length < 3) {
    errores.codigo = "El código debe tener al menos 3 caracteres.";
  }

  if (!datos.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio.";
  } else if (datos.nombre.trim().length > 100) {
    errores.nombre = "Máximo 100 caracteres.";
  }

  if (datos.descripcion.length > 500) {
    errores.descripcion = "Máximo 500 caracteres.";
  }

  if (
    datos.precio === "" ||
    !Number.isFinite(Number(datos.precio)) ||
    Number(datos.precio) <= 0
  ) {
    errores.precio = "Ingresa un precio mayor que cero.";
  }

  if (
    datos.stock === "" ||
    !Number.isSafeInteger(Number(datos.stock)) ||
    Number(datos.stock) < 0
  ) {
    errores.stock = "El stock debe ser un entero no negativo.";
  }

  if (
    datos.stockCritico !== "" &&
    (!Number.isSafeInteger(Number(datos.stockCritico)) ||
      Number(datos.stockCritico) < 0)
  ) {
    errores.stockCritico = "El stock crítico debe ser un entero no negativo.";
  }

  if (
    !Number.isSafeInteger(Number(datos.categoriaId)) ||
    Number(datos.categoriaId) <= 0
  ) {
    errores.categoriaId = "Selecciona una categoría.";
  }

  return errores;
}

function FormularioProductoAdmin({
  producto = null,
  modo = "crear",
  onGuardar,
}) {
  const [formulario, setFormulario] = useState(() =>
    prepararFormulario(producto),
  );

  const [categorias, setCategorias] = useState([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);
  const [errorCategorias, setErrorCategorias] = useState("");

  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setFormulario(prepararFormulario(producto));
  }, [producto]);

  useEffect(() => {
    let activo = true;

    async function cargarCategorias() {
      try {
        const respuesta = await apiRequest("/categorias");

        if (!Array.isArray(respuesta)) {
          throw new Error("La API no devolvió una lista de categorías.");
        }

        if (activo) setCategorias(respuesta);
      } catch (error) {
        if (activo) {
          setErrorCategorias(
            error.message || "No se pudieron cargar las categorías.",
          );
        }
      } finally {
        if (activo) setCargandoCategorias(false);
      }
    }

    cargarCategorias();

    return () => {
      activo = false;
    };
  }, []);

  function manejarCambio(evento) {
    const { name, value, type, checked } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrores((actual) => ({
      ...actual,
      [name]: "",
    }));

    setErrorServidor("");
  }

  async function manejarSubmit(evento) {
    evento.preventDefault();

    if (guardando) return;

    const nuevosErrores = validar(formulario);
    setErrores(nuevosErrores);
    setErrorServidor("");

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    const datos = {
      codigo: formulario.codigo.trim(),
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      stockCritico:
        formulario.stockCritico === "" ? 0 : Number(formulario.stockCritico),
      imagen: formulario.imagen.trim() || "/img/aros/1.webp",
      destacado: formulario.destacado,
    };

    setGuardando(true);

    try {
      await onGuardar(datos, Number(formulario.categoriaId));
    } catch (error) {
      setErrorServidor(error.message || "No se pudo guardar el producto.");
    } finally {
      setGuardando(false);
    }
  }

  function campo({
    name,
    label,
    type = "text",
    min,
    step,
    maxLength,
    required = false,
  }) {
    return (
      <div className="campo">
        <label htmlFor={`producto-${name}`}>
          {label}
          {required ? " *" : ""}
        </label>

        <input
          id={`producto-${name}`}
          name={name}
          type={type}
          min={min}
          step={step}
          maxLength={maxLength}
          value={formulario[name]}
          onChange={manejarCambio}
          className={errores[name] ? "invalido" : ""}
        />

        {errores[name] && <span className="error-campo">{errores[name]}</span>}
      </div>
    );
  }

  return (
    <form
      className="admin-card formulario form-grid"
      onSubmit={manejarSubmit}
      noValidate
    >
      {errorServidor && (
        <div className="campo campo--completo">
          <p role="alert" style={{ color: "#a33" }}>
            {errorServidor}
          </p>
        </div>
      )}

      {campo({
        name: "codigo",
        label: "Código producto",
        maxLength: 50,
        required: true,
      })}

      {campo({
        name: "nombre",
        label: "Nombre",
        maxLength: 100,
        required: true,
      })}

      <div className="campo campo--completo">
        <label htmlFor="producto-descripcion">Descripción</label>

        <textarea
          id="producto-descripcion"
          name="descripcion"
          maxLength={500}
          value={formulario.descripcion}
          onChange={manejarCambio}
        />

        {errores.descripcion && (
          <span className="error-campo">{errores.descripcion}</span>
        )}
      </div>

      {campo({
        name: "precio",
        label: "Precio",
        type: "number",
        min: "0.01",
        step: "0.01",
        required: true,
      })}

      {campo({
        name: "stock",
        label: "Stock",
        type: "number",
        min: "0",
        step: "1",
        required: true,
      })}

      {campo({
        name: "stockCritico",
        label: "Stock crítico",
        type: "number",
        min: "0",
        step: "1",
      })}

      <div className="campo">
        <label htmlFor="producto-categoria">Categoría *</label>

        <select
          id="producto-categoria"
          name="categoriaId"
          value={formulario.categoriaId}
          onChange={manejarCambio}
          disabled={cargandoCategorias || Boolean(errorCategorias)}
        >
          <option value="">
            {cargandoCategorias
              ? "Cargando categorías..."
              : "Selecciona una categoría"}
          </option>

          {categorias.map((categoria) => (
            <option key={categoria.id} value={String(categoria.id)}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        {errorCategorias && (
          <span className="error-campo">{errorCategorias}</span>
        )}

        {errores.categoriaId && (
          <span className="error-campo">{errores.categoriaId}</span>
        )}
      </div>

      <div className="campo campo--completo">
        <label htmlFor="producto-imagen">Imagen (ruta o URL)</label>

        <input
          id="producto-imagen"
          type="text"
          name="imagen"
          placeholder="/img/aros/1.webp"
          value={formulario.imagen}
          onChange={manejarCambio}
        />

        <span className="ayuda">Ejemplo: /img/pulseras/19.webp</span>
      </div>

      <div className="campo campo--completo">
        <label htmlFor="producto-destacado">
          <input
            id="producto-destacado"
            type="checkbox"
            name="destacado"
            checked={formulario.destacado}
            onChange={manejarCambio}
          />{" "}
          Producto destacado
        </label>
      </div>

      <div className="campo campo--completo form-acciones">
        <button
          type="submit"
          className="boton"
          disabled={guardando || cargandoCategorias || Boolean(errorCategorias)}
        >
          {guardando
            ? "Guardando..."
            : modo === "editar"
              ? "Guardar cambios"
              : "Guardar producto"}
        </button>

        <Link className="boton boton--claro" to="/admin/productos">
          Cancelar
        </Link>
      </div>
    </form>
  );
}

export default FormularioProductoAdmin;
