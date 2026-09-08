# ERS V1 - Luz de Plata

## 1. Propósito
Tienda online académica de joyería de plata 925, con vista pública y vista administrativa.

## 2. Tecnologías
HTML5 semántico, CSS externo, JavaScript y localStorage. No utiliza backend.

## 3. Requisitos funcionales
- RF01: navegar entre Home, catálogo, productos, nosotros, blog y contacto.
- RF02: registrar e iniciar sesión de usuarios.
- RF03: listar productos desde JavaScript.
- RF04: agregar, modificar y eliminar artículos del carrito.
- RF05: conservar carrito en localStorage.
- RF06: mantener favoritos.
- RF07: simular una compra y guardar historial local.
- RF08: administrar productos.
- RF09: administrar usuarios y roles.
- RF10: validar formularios con mensajes personalizados.
- RF11: cargar comunas según región seleccionada.

## 4. Requisitos no funcionales
- RNF01: interfaz responsiva.
- RNF02: hojas de estilo externas.
- RNF03: navegación coherente mediante hipervínculos.
- RNF04: código organizado por módulos JS.

## 5. Roles
- Administrador: acceso completo al área administrativa.
- Vendedor: visualización/edición de productos; sin mantenedor de usuarios.
- Cliente: acceso a la tienda.

## 6. Persistencia
Productos, usuarios, carrito, favoritos, sesiones, compras, envíos y contactos se almacenan en localStorage. En una siguiente evaluación esta capa puede reemplazarse por una API y base de datos real.
