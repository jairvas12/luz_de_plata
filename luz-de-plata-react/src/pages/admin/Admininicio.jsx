import productos
  from "../../data/productos";


function AdminInicio() {

  const cantidadProductos =
    productos.length;


  const stockCritico =
    productos.filter(
      producto =>
        producto.criticalStock !== ""
        &&
        producto.criticalStock != null
        &&
        producto.stock
          <= Number(
            producto.criticalStock
          )
    ).length;


  return (

    <div>

      <h1>
        Hola, administrador
      </h1>

      <p className="muted">
        Resumen general de Luz de Plata.
      </p>


      <div className="metricas">

        <article className="metrica">

          Productos

          <strong>
            {cantidadProductos}
          </strong>

        </article>


        <article className="metrica">

          Usuarios

          <strong>
            0
          </strong>

        </article>


        <article className="metrica">

          Compras

          <strong>
            0
          </strong>

        </article>


        <article className="metrica">

          Stock crítico

          <strong>
            {stockCritico}
          </strong>

        </article>

      </div>


      <section
        className="admin-card"
        style={{
          marginTop: "24px"
        }}
      >

        <h2>
          Alcance de esta entrega
        </h2>

        <p>
          El administrador puede crear,
          editar y eliminar productos y
          usuarios.
        </p>

        <p>
          El vendedor puede visualizar
          productos y órdenes, pero no puede
          crear, editar o eliminar productos
          ni administrar usuarios.
        </p>

      </section>

    </div>

  );

}
export default AdminInicio;