import "../css/estilos.css";

function AdminMenu() {

    return (
        <>
            <div class="admin-shell">
                <main class="admin-main">
                    <header class="admin-topbar">
                        <strong>
                            Panel principal
                        </strong>
                        <span data-admin-user="">
                        </span>
                    </header>
                    <section class="admin-contenido">
                        <div data-dashboard="">
                            <h1>
                                Hola, administrador
                            </h1>
                            <p class="muted">
                                Resumen de la información almacenada localmente en este navegador.
                            </p>
                            <div class="metricas">
                                <article class="metrica">
                                    Productos
                                    <strong data-m-products="">
                                        0
                                    </strong>
                                </article>
                                <article class="metrica" data-admin-only="">
                                    Usuarios
                                    <strong data-m-users="">
                                        0
                                    </strong>
                                </article>
                                <article class="metrica">
                                    Compras
                                    <strong data-m-orders="">
                                        0
                                    </strong>
                                </article>
                                <article class="metrica">
                                    Stock crítico
                                    <strong data-m-critical="">
                                        0
                                    </strong>
                                </article>
                            </div>
                            <section class="admin-card" style={{marginTop:"24px"}}>
                                <h2>
                                    Alcance de esta entrega
                                </h2>
                                <p>
                                    El administrador puede crear, editar y eliminar productos y usuarios. El vendedor puede visualizar productos y órdenes, pero no puede crear, editar o eliminar productos ni administrar usuarios.
                                </p>
                                <p>
                                    <strong>
                                        Importante:
                                    </strong>
                                    localStorage es una persistencia local de demostración; no reemplaza una base de datos ni seguridad de servidor.
                                </p>
                            </section>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
export default AdminMenu;