import "../css/estilos.css";
function LateralAdmin() {
    return (
        <>
            <div className="admin-shell">
                <aside className="admin-sidebar">
                    <a className="admin-brand" href="index.html">
                        Luz de Plata
                        <br />
                        <small>
                            Administración
                        </small>
                    </a>
                    <nav className="admin-menu">
                        <a className="activo" href="index.html">
                            Inicio
                        </a>
                        <a href="productos.html">
                            Productos
                        </a>
                        <a href="ordenes.html">
                            Órdenes
                        </a>
                        <a data-admin-only="" href="producto-nuevo.html">
                            Nuevo producto
                        </a>
                        <a data-admin-only="" href="usuarios.html">
                            Usuarios
                        </a>
                        <a data-admin-only="" href="usuario-nuevo.html">
                            Nuevo usuario
                        </a>
                    </nav>
                    <div className="admin-sidebar__pie">
                        <a className="boton boton--claro" href="../index.html">
                            Ver tienda
                        </a>
                        <button className="boton boton--suave" data-admin-logout="">
                            Cerrar sesión
                        </button>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default LateralAdmin