# Luz de Plata

Aplicación web de gestión y venta de joyería desarrollada con **React**, **Spring Boot** y **MySQL**.

Este README incluye tanto la ejecución local como el procedimiento completo para preparar otro computador.

---

## 1. Tecnologías utilizadas

### Frontend
- React
- JavaScript
- Vite
- npm

### Backend
- Java 17
- Spring Boot 3.5.7
- Maven
- Spring Data JPA
- Spring Security
- JWT

### Base de datos
- MySQL 8

---

## 2. Estructura general del proyecto

```text
luz_de_plata/
├── backend/
├── luz-de-plata-react/
├── database/
│   └── luz_de_plata.sql
└── README.md
```

- `backend/`: API REST desarrollada con Spring Boot.
- `luz-de-plata-react/`: interfaz web desarrollada con React y Vite.
- `database/luz_de_plata.sql`: respaldo de la base de datos para reconstruir el sistema en otro computador.
- `README.md`: instrucciones de instalación, ejecución y uso.

---

## 3. Funcionalidades principales

El sistema incluye, entre otras, las siguientes funcionalidades:

- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Roles:
  - `ADMINISTRADOR`
  - `VENDEDOR`
  - `CLIENTE`
- Gestión de usuarios.
- Gestión de categorías.
- Gestión de productos.
- Catálogo web.
- Control de stock.
- Productos destacados.
- Registro de boletas.
- Detalle de boletas.
- Seguridad de endpoints mediante Spring Security.
- Documentación y pruebas de endpoints con Swagger.

---

# 4. Preparar el computador de presentación desde cero

Esta sección es la más importante para ejecutar el proyecto en un computador distinto al computador de desarrollo.

## 4.1 Requisitos previos

Instalar:

1. **Java 17**
2. **Maven**
3. **Node.js**
4. **npm**
5. **MySQL Server 8**
6. **Git**

Comprobar desde CMD o PowerShell:

```powershell
java -version
mvn -version
node -v
npm -v
mysql --version
git --version
```

Si alguno de estos comandos no funciona, revisar que el programa esté instalado y agregado al `PATH` de Windows.

---

## 4.2 Clonar el repositorio

Abrir CMD o PowerShell en la carpeta donde se quiere guardar el proyecto:

```powershell
git clone URL_DEL_REPOSITORIO
```

Luego entrar al proyecto:

```powershell
cd luz_de_plata
```

La estructura esperada será:

```text
luz_de_plata/
├── backend/
├── luz-de-plata-react/
└── database/
    └── luz_de_plata.sql
```

---

# 5. Preparar MySQL en el computador de presentación

## 5.1 Confirmar que MySQL está funcionando

Abrir CMD o PowerShell:

```powershell
mysql -u root -p
```

Ingresar la contraseña configurada durante la instalación de MySQL.

Si aparece:

```text
mysql>
```

la conexión fue exitosa.

Salir con:

```sql
exit;
```

---

## 5.2 Importar la base de datos del proyecto

El archivo oficial debe estar ubicado en:

```text
luz_de_plata\database\luz_de_plata.sql
```

### Opción recomendada: importar desde CMD

Ubicarse en la raíz del proyecto y ejecutar:

```cmd
mysql -u root -p < "database\luz_de_plata.sql"
```

Ingresar la contraseña de `root`.

Como el respaldo fue generado con `--databases luz_de_plata`, el archivo puede crear y seleccionar la base automáticamente.

### Alternativa: importar desde el monitor de MySQL

Entrar a MySQL:

```powershell
mysql -u root -p
```

Luego ejecutar:

```sql
SOURCE C:/RUTA/AL/PROYECTO/database/luz_de_plata.sql;
```

En Windows es recomendable usar `/` en la ruta del comando `SOURCE`.

Ejemplo:

```sql
SOURCE C:/Users/usuario/Desktop/luz_de_plata/database/luz_de_plata.sql;
```

---

## 5.3 Comprobar que la base quedó creada

Dentro de MySQL:

```sql
SHOW DATABASES;
USE luz_de_plata;
SELECT DATABASE();
SHOW TABLES;
```

`SELECT DATABASE();` debe devolver:

```text
luz_de_plata
```

Las tablas principales son:

```text
usuarios
categorias
productos
boletas
detalle_boleta
```

---

## 5.4 Comprobar que existen datos

### Categorías

```sql
SELECT * FROM categorias;
```

### Productos

```sql
SELECT id, codigo, nombre, precio, stock, categoria_id
FROM productos;
```

### Usuarios

Por seguridad, no es necesario mostrar hashes de contraseña.

```sql
SELECT id, nombre, email, rol, activo
FROM usuarios;
```

Si el respaldo contiene el administrador utilizado durante el desarrollo, ese usuario quedará disponible después de importar la base.

La contraseña no se guarda en texto plano; se almacena mediante hash.

---

# 6. Crear un usuario MySQL específico para la aplicación

No es recomendable ejecutar la aplicación usando `root`.

Entrar a MySQL como administrador:

```powershell
mysql -u root -p
```

Crear el usuario de aplicación:

```sql
CREATE USER IF NOT EXISTS 'luz_app'@'localhost'
IDENTIFIED BY 'CLAVE_SEGURA_LUZ_APP';
```

Si el usuario ya existe y se quiere cambiar su contraseña:

```sql
ALTER USER 'luz_app'@'localhost'
IDENTIFIED BY 'CLAVE_SEGURA_LUZ_APP';
```

Asignar permisos únicamente sobre la base del proyecto:

```sql
GRANT ALL PRIVILEGES
ON luz_de_plata.*
TO 'luz_app'@'localhost';

FLUSH PRIVILEGES;
```

Comprobar:

```sql
SELECT user, host
FROM mysql.user
WHERE user = 'luz_app';
```

Salir:

```sql
exit;
```

Probar la conexión:

```powershell
mysql -u luz_app -p luz_de_plata
```

Si entra correctamente, el usuario está listo.

---

# 7. Variables de entorno del backend

El backend utiliza variables de entorno para evitar guardar secretos directamente en el código.

## 7.1 Contraseña de base de datos

En PowerShell:

```powershell
$env:DB_PASSWORD="CLAVE_SEGURA_LUZ_APP"
```

Debe coincidir con la contraseña configurada para `luz_app`.

---

## 7.2 Generar JWT_SECRET

En PowerShell:

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$rng.Dispose()
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
```

Comprobar que ambas variables existen:

```powershell
if ($env:DB_PASSWORD) { "DB_PASSWORD OK" }
if ($env:JWT_SECRET) { "JWT_SECRET OK" }
```

> Importante: las variables definidas con `$env:` duran solamente mientras esa ventana de PowerShell esté abierta. Si se abre una nueva terminal, se deben definir nuevamente.

---

# 8. Ejecutar el backend

Abrir una terminal PowerShell:

```powershell
cd C:\RUTA\AL\PROYECTO\luz_de_plata\backend
```

Ejemplo:

```powershell
cd C:\Users\usuario\Desktop\luz_de_plata\backend
```

Definir las variables:

```powershell
$env:DB_PASSWORD="CLAVE_SEGURA_LUZ_APP"
```

Generar `JWT_SECRET`:

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$rng.Dispose()
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
```

Iniciar Spring Boot:

```powershell
mvn spring-boot:run
```

No cerrar esta terminal mientras se utiliza la aplicación.

Si inicia correctamente, el backend quedará normalmente disponible en:

```text
http://localhost:8080
```

---

# 9. Ejecutar el frontend

Abrir una segunda terminal.

Entrar a:

```powershell
cd C:\RUTA\AL\PROYECTO\luz_de_plata\luz-de-plata-react
```

Instalar dependencias la primera vez:

```powershell
npm install
```

Iniciar Vite:

```powershell
npm run dev
```

Normalmente se mostrará una dirección similar a:

```text
http://localhost:5173/
```

Abrir esa dirección en el navegador.

---

# 10. Orden recomendado para iniciar la aplicación

Cada vez que se quiera ejecutar el proyecto:

1. Confirmar que MySQL Server esté iniciado.
2. Abrir PowerShell para el backend.
3. Definir `DB_PASSWORD`.
4. Definir o generar `JWT_SECRET`.
5. Ejecutar:

```powershell
mvn spring-boot:run
```

6. Abrir una segunda terminal.
7. Entrar al frontend.
8. Ejecutar:

```powershell
npm run dev
```

9. Abrir:

```text
http://localhost:5173/
```

---

# 11. Swagger

Con el backend ejecutándose, probar:

```text
http://localhost:8080/swagger-ui.html
```

Swagger permite probar los endpoints de la API.

Para endpoints protegidos:

1. Iniciar sesión.
2. Copiar el JWT generado.
3. Presionar `Authorize`.
4. Ingresar el token.
5. Ejecutar los endpoints según el rol.

---

# 12. Seguridad implementada

El sistema utiliza:

- Spring Security.
- JWT para autenticación.
- Contraseñas almacenadas mediante hash.
- Roles para restringir endpoints.
- Validaciones.
- Separación entre usuario administrativo de MySQL y usuario de aplicación.

La aplicación no debe ejecutarse con la cuenta `root` de MySQL.

`root` se utiliza únicamente para tareas administrativas como:

- Crear la base.
- Importar el respaldo.
- Crear `luz_app`.
- Asignar permisos.

Luego Spring Boot se conecta utilizando `luz_app`.

---

# 13. Roles de aplicación

## ADMINISTRADOR

Puede realizar tareas administrativas, dependiendo de los permisos definidos en el backend.

## VENDEDOR

Puede utilizar funciones asociadas a ventas y gestión permitida.

## CLIENTE

Puede acceder a las funcionalidades disponibles para usuarios finales.

El registro público crea usuarios con rol de cliente según la lógica de seguridad implementada.

---

# 14. Base de datos

La aplicación trabaja principalmente con:

## `usuarios`

Almacena:

- nombre
- apellidos
- email
- contraseña cifrada/hasheada
- región
- comuna
- dirección
- fecha de nacimiento
- RUN cuando corresponde
- rol
- estado activo

## `categorias`

Permite clasificar los productos.

Categorías utilizadas actualmente:

- Aros
- Dijes
- Pulseras
- Cadenas

## `productos`

Contiene, entre otros:

- código
- nombre
- descripción
- precio
- stock
- stock crítico
- imagen
- destacado
- categoría

## `boletas`

Registra las órdenes o ventas.

## `detalle_boleta`

Relaciona cada boleta con los productos comprados, cantidades y precios.

---

# 15. Catálogo

El catálogo se obtiene desde la base de datos a través del backend.

El flujo general es:

```text
MySQL
   ↓
Spring Boot
   ↓
API REST
   ↓
React
   ↓
Catálogo visible en la web
```

Después de importar el catálogo actualizado, se comprobó su funcionamiento visualmente desde la aplicación.

---

# 16. Generar un nuevo respaldo de la base de datos

Cuando se realicen cambios importantes, generar nuevamente el respaldo.

Desde CMD:

```cmd
mysqldump -u root -p --databases luz_de_plata > "C:\Users\usuario\Desktop\luz_de_plata\database\luz_de_plata.sql"
```

Adaptar la ruta si el proyecto está en otra ubicación.

Este comando guarda:

- estructura
- tablas
- relaciones
- datos

Después de generarlo, revisar que el archivo no esté vacío.

En Visual Studio Code se puede comprobar buscando:

```text
CREATE TABLE
```

y:

```text
INSERT INTO
```

---

# 17. Restaurar el respaldo en otro computador

Desde CMD, ubicado en la raíz del proyecto:

```cmd
mysql -u root -p < "database\luz_de_plata.sql"
```

Después:

```powershell
mysql -u root -p
```

Dentro de MySQL:

```sql
USE luz_de_plata;
SHOW TABLES;
SELECT COUNT(*) FROM productos;
SELECT COUNT(*) FROM categorias;
SELECT id, email, rol, activo FROM usuarios;
```

---

# 18. Comandos Git recomendados

Revisar cambios:

```powershell
git status
```

Agregar el respaldo:

```powershell
git add database/luz_de_plata.sql
```

Agregar README:

```powershell
git add README.md
```

Commit:

```powershell
git commit -m "Actualiza respaldo de base de datos y documentación"
```

Subir:

```powershell
git push
```

---

# 19. Archivos que NO deben subirse a GitHub

No subir:

- contraseñas reales
- `JWT_SECRET`
- `DB_PASSWORD`
- archivos `.env` con secretos
- credenciales de producción
- contraseñas de MySQL

Si el repositorio es público, también se recomienda revisar que los datos de la base sean únicamente datos ficticios o de demostración.

---

# 20. Errores frecuentes

## Error: `Could not resolve placeholder 'JWT_SECRET'`

Causa:

No se definió la variable `JWT_SECRET`.

Solución:

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$rng.Dispose()
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
```

Luego:

```powershell
mvn spring-boot:run
```

---

## Error de contraseña de MySQL

Revisar:

```powershell
$env:DB_PASSWORD
```

La contraseña debe corresponder al usuario configurado para Spring Boot.

---

## `mysql` no se reconoce como comando

MySQL probablemente no está agregado al `PATH`.

Ruta habitual:

```text
C:\Program Files\MySQL\MySQL Server 8.0\bin
```

Se puede ejecutar directamente:

```cmd
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```

---

## `mysqldump` no se reconoce

Usar:

```cmd
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe" -u root -p --databases luz_de_plata > "database\luz_de_plata.sql"
```

---

## Spring Boot no inicia

Comprobar:

```powershell
java -version
mvn -version
```

Luego verificar:

```powershell
if ($env:DB_PASSWORD) { "DB_PASSWORD OK" }
if ($env:JWT_SECRET) { "JWT_SECRET OK" }
```

Y confirmar que MySQL está ejecutándose.

---

## El frontend no muestra productos

Comprobar:

1. MySQL está iniciado.
2. Spring Boot está funcionando.
3. El backend puede acceder a la base.
4. El frontend está ejecutándose.
5. La tabla `productos` contiene datos.

Desde MySQL:

```sql
USE luz_de_plata;

SELECT id, codigo, nombre, precio, stock
FROM productos;
```

---

## Aparecen productos pero no las imágenes

Revisar las rutas guardadas en la columna `imagen`.

Ejemplos de rutas utilizadas:

```text
/img/aros/1.webp
/img/dijes/13.webp
/img/pulseras/19.webp
/img/cadena/40.webp
```

Confirmar que esos archivos existan dentro de los recursos públicos del frontend.

---

# 21. Guía rápida para el día de la presentación

## Antes de comenzar

### 1. Iniciar MySQL

Confirmar:

```powershell
mysql -u luz_app -p luz_de_plata
```

Luego salir:

```sql
exit;
```

### 2. Abrir backend

```powershell
cd C:\RUTA\luz_de_plata\backend
```

```powershell
$env:DB_PASSWORD="CLAVE_SEGURA_LUZ_APP"
```

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$rng.Dispose()
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
```

```powershell
mvn spring-boot:run
```

### 3. Abrir frontend en otra terminal

```powershell
cd C:\RUTA\luz_de_plata\luz-de-plata-react
npm run dev
```

### 4. Abrir navegador

```text
http://localhost:5173/
```

### 5. Opcional: abrir Swagger

```text
http://localhost:8080/swagger-ui.html
```

---

# 22. Instalación rápida resumida

En un computador nuevo:

```text
1. Instalar Java 17
2. Instalar Maven
3. Instalar Node.js/npm
4. Instalar MySQL 8
5. Instalar Git
6. Clonar proyecto
7. Importar database/luz_de_plata.sql con root
8. Crear usuario MySQL luz_app
9. Dar permisos de luz_de_plata a luz_app
10. Definir DB_PASSWORD
11. Generar JWT_SECRET
12. Ejecutar backend con mvn spring-boot:run
13. Ejecutar npm install en frontend si es primera vez
14. Ejecutar npm run dev
15. Abrir http://localhost:5173/
```

---

## ¿Qué es Luz de Plata?

**Luz de Plata** es una aplicación web orientada a la gestión y venta de productos de joyería de plata. El proyecto utiliza una arquitectura separada en frontend, backend y base de datos:

- **React** para la interfaz web.
- **Spring Boot** para el backend y la API.
- **MySQL** para almacenar la información.
- Autenticación mediante usuarios y roles.

La aplicación trabaja con productos organizados en distintas categorías, entre ellas:

- Aros
- Dijes
- Pulseras
- Cadenas

---

## ¿Cómo funciona la aplicación?

El funcionamiento general del sistema sigue este flujo:

```text
Usuario
   ↓
Frontend React
   ↓
API REST
   ↓
Backend Spring Boot
   ↓
MySQL
```

Cuando el usuario realiza una acción desde la página web, React se comunica con el backend mediante peticiones HTTP.

Spring Boot procesa la solicitud, consulta o modifica la información correspondiente en MySQL y devuelve una respuesta al frontend.

Finalmente, React muestra esa información al usuario.

Por ejemplo, cuando se abre el catálogo:

```text
Catálogo en React
        ↓
Solicitud al backend
        ↓
Spring Boot consulta productos
        ↓
MySQL devuelve los productos
        ↓
Spring Boot responde a React
        ↓
React muestra los productos
```

---

## Funcionalidades principales

### Catálogo de productos

La aplicación permite visualizar el catálogo de joyería disponible.

Actualmente se encuentran cargadas las categorías:

- Aros
- Dijes
- Pulseras
- Cadenas

Cada producto puede almacenar información como:

- Código
- Nombre
- Descripción
- Precio
- Stock
- Stock crítico
- Imagen
- Categoría
- Estado de producto destacado

Los productos que aparecen en la página son obtenidos desde la base de datos MySQL mediante el backend.

---

### Usuarios

El sistema mantiene usuarios registrados dentro de la base de datos.

La información de usuario incluye datos como:

- Nombre
- Apellidos
- Correo electrónico
- Dirección
- Comuna
- Región
- Fecha de nacimiento
- Contraseña protegida
- Estado de la cuenta
- Rol

La aplicación contempla tres tipos de roles:

```text
ADMINISTRADOR
VENDEDOR
CLIENTE
```

El rol permite diferenciar los distintos tipos de usuario dentro del sistema.

---

### Inicio de sesión y seguridad

Los usuarios pueden autenticarse en la aplicación utilizando sus credenciales.

Las contraseñas no se almacenan como texto visible dentro de la base de datos, sino utilizando un hash.

El backend también utiliza una variable:

```text
JWT_SECRET
```

para la seguridad relacionada con la autenticación de la aplicación.

Por esta razón, antes de iniciar Spring Boot es necesario configurar correctamente las variables de entorno indicadas en la sección de instalación.

---

### Gestión de productos y stock

Los productos almacenan su cantidad disponible mediante el campo:

```text
stock
```

y además cuentan con:

```text
stock_critico
```

Esto permite mantener información sobre la disponibilidad de cada producto dentro del sistema.

Cada producto pertenece a una categoría mediante su relación con la tabla `categorias`.

---

### Boletas y detalle de compra

La base de datos también contempla el registro de operaciones mediante las tablas:

```text
boletas
detalle_boleta
```

Una boleta almacena información como:

- Número de orden
- Fecha
- Total
- Estado
- Usuario asociado

El detalle de la boleta permite relacionar los productos incluidos en la operación e incluye:

- Producto
- Cantidad
- Precio unitario
- Subtotal

De esta manera, la información general de una operación se almacena en `boletas`, mientras que sus productos se almacenan en `detalle_boleta`.

---

## Cómo utilizar la aplicación

Una vez completada la instalación indicada en este README, la aplicación debe iniciarse en dos partes.

### 1. Iniciar el backend

Desde PowerShell:

```powershell
cd C:\ruta\del\proyecto\backend
```

Configurar las variables necesarias:

```powershell
$env:DB_PASSWORD="CONTRASEÑA_DE_LUZ_APP"
```

y configurar `JWT_SECRET` según el procedimiento explicado en la sección de instalación.

Después ejecutar:

```powershell
mvn spring-boot:run
```

El backend debe permanecer ejecutándose mientras se utiliza la aplicación.

---

### 2. Iniciar el frontend

Abrir una segunda terminal y entrar a la carpeta del frontend:

```powershell
cd C:\ruta\del\proyecto\luz-de-plata-react
```

Si es la primera ejecución en el computador:

```powershell
npm install
```

Después:

```powershell
npm run dev
```

Vite mostrará una dirección local, normalmente:

```text
http://localhost:5173/
```

Abrir esa dirección en el navegador.

---

## Comprobación rápida

Para comprobar que todo quedó correctamente configurado:

1. Confirmar que MySQL esté funcionando.
2. Confirmar que exista la base `luz_de_plata`.
3. Confirmar que el usuario `luz_app` pueda conectarse.
4. Iniciar Spring Boot.
5. Comprobar que el backend no presente errores de conexión con MySQL.
6. Iniciar React con `npm run dev`.
7. Abrir la aplicación en el navegador.
8. Entrar al catálogo.
9. Comprobar que aparezcan los productos de Aros, Dijes, Pulseras y Cadenas.

Si el catálogo aparece correctamente, se está comprobando el funcionamiento completo de:

```text
MySQL → Spring Boot → API → React
```

---

## Resumen del proyecto

Luz de Plata demuestra la integración de una aplicación web completa utilizando una arquitectura de tres capas principales:

```text
Frontend
React
   ↓
Backend
Spring Boot
   ↓
Base de datos
MySQL
```

MySQL mantiene la información persistente del sistema, Spring Boot contiene la lógica del backend y expone los servicios necesarios, y React proporciona la interfaz con la que interactúa el usuario.

Esto permite mantener separadas la presentación, la lógica de negocio y la persistencia de los datos.
