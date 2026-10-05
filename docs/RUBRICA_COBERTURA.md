# Cobertura de la rúbrica - Luz de Plata

## IE1.1.1 HTML y navegación
- HTML5 semántico con `header`, `nav`, `main`, `section`, `article` y `footer` en las vistas públicas.
- Hipervínculos entre todas las páginas.
- Imágenes de productos y logos locales.
- Botones funcionales de carrito, favoritos, formularios y mantenedores.
- Video local en la página principal.
- Formularios de registro, login, contacto, productos y usuarios.

## IE1.1.2 CSS externo
- `css/estilos.css` como hoja principal externa.
- Hojas separadas para cabecera, menú, formularios, carrito, administrador, footer y componentes.
- Diseño responsivo mediante media queries.

## IE1.2.1 JavaScript y validaciones
- Login: correo requerido/dominio permitido y contraseña de 4 a 10 caracteres.
- Contacto: nombre, correo opcional con dominio permitido y comentario máximo 500.
- Usuario: RUN chileno, nombre, apellidos, correo, región/comuna, dirección y contraseña.
- Producto: código mínimo 3, nombre, descripción, precio, stock, stock crítico y categoría.
- Mensajes personalizados junto a cada campo y alertas de operación.

## Carrito y localStorage
- Productos sembrados desde JavaScript.
- Carrito persistente en localStorage.
- Agregar, cambiar cantidad y eliminar productos.
- Favoritos persistentes.
- Compra simulada con reducción de stock, historial y envío.

## Vista administrativa
- Autenticación por sesión local.
- Administrador: CRUD de productos y usuarios, además de órdenes.
- Vendedor: visualización de productos y órdenes; sin mantenedores de usuario ni creación/edición de productos.
- Stock crítico destacado.

## IE1.3.1 Repositorio remoto
Este indicador **no puede quedar demostrado solo dentro del ZIP**. Revisa `GITHUB_CHECKLIST.md` y realiza los commits reales del equipo en el repositorio remoto antes de entregar.


## Ajuste de registro público
- El formulario público **Crear cuenta** no solicita RUN/RUT, por decisión de diseño de la tienda.
- La validación de RUN se mantiene en el **mantenedor administrativo de usuarios**, donde las instrucciones de la evaluación la solicitan explícitamente.
