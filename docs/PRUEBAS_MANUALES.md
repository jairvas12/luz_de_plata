# Pruebas manuales sugeridas

## 1. Catálogo y carrito
1. Abrir `index.html` con Live Server.
2. Ir a Catálogo.
3. Filtrar por categoría y ordenar por precio.
4. Abrir un detalle y añadir al carrito.
5. Cambiar cantidad y eliminar/agregar artículos.
6. Recargar la página y comprobar que el carrito se conserva.

## 2. Validaciones
1. En Login, probar un correo no permitido y una contraseña de 2 caracteres.
2. En Registro, probar un RUN inválido, correos fuera de los dominios permitidos y contraseñas distintas.
3. Cambiar Región y comprobar que cambian las Comunas.
4. En Contacto, intentar enviar sin nombre/comentario y luego enviar datos válidos.

## 3. Compra e historial
1. Iniciar sesión como `cliente@gmail.com` / `clave123`.
2. Añadir un producto al carrito y finalizar compra.
3. Ver `Mis compras` y `Mis envíos`.
4. Comprobar que el stock disminuye.

## 4. Administrador
1. Iniciar sesión como `admin@duoc.cl` / `admin123`.
2. Crear, editar y eliminar un producto.
3. Crear y editar un usuario.
4. Revisar la lista de órdenes.

## 5. Vendedor
1. Iniciar sesión como `vendedor@duoc.cl` / `venta123`.
2. Confirmar que puede ver Productos y Órdenes.
3. Confirmar que no aparecen las opciones de crear productos ni administrar usuarios.

## Reinicio
Para volver al estado inicial, elimina en el navegador las claves de Local Storage que comienzan por `lp_` y recarga.
