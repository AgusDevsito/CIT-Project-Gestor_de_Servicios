# Documentación del registro de usuarios con validación CIT

## Objetivo

Este backend permite registrar usuarios con un rol específico. Cuando el usuario es del tipo `cit`, el sistema exige que adjunte un documento de respaldo para poder completar el registro. Si no presenta ese documento, la inscripción queda rechazada.

## ¿Qué se implementó?

Se agregó la posibilidad de recibir un archivo en el endpoint de registro y se validó la regla de negocio:

- `role = "cit"` → requiere documento
- `role = "user"` o `role = "admin"` → no requiere documento

La validación está hecha en el backend para evitar que un usuario se registre como trabajador CIT sin la documentación necesaria.

## ¿Por qué fue necesario?

El problema original era que el registro solo aceptaba JSON y no revisaba si el usuario formaba parte del CIT. Eso dejaba abierta la posibilidad de crear cuentas sin verificar la condición laboral.

Con esta implementación se cumple una regla de negocio importante:

> Solo los trabajadores del CIT Formosa pueden registrarse con el rol `cit` si adjuntan un documento válido.

## Cómo funciona

### 1) Ruta de registro

La ruta quedó configurada en:

- `POST /api/register`

Esta ruta usa `multer` para aceptar archivos y los guarda en la carpeta `uploads`.

### 2) Subida de archivo

El archivo se recibe con el nombre `document` y se guarda como un archivo físico en la carpeta del proyecto:

- `backend/uploads/`

Además, se genera una URL pública para acceder al archivo:

- `/uploads/<nombre-del-archivo>`

Esto permite luego reutilizar esa referencia en la base de datos o en la interfaz.

### 3) Validación del rol

La lógica de validación se encuentra en:

- `backend/helper/citRegistration.js`

La función principal se llama `validateCITRegistration` y comprueba lo siguiente:

- Si `role` es `cit`
- Y no existe `document_url` ni un archivo `file`
- Entonces lanza un error

Ese error devuelve una respuesta HTTP `400` con el mensaje:

`Los trabajadores de CIT Formosa deben adjuntar un documento para registrarse.`

### 4) Registro del usuario

Cuando la validación pasa, el controlador crea el usuario y guarda la referencia del documento en la base de datos:

- `document_url`
- `document_name`

Esto queda en el modelo `User`:

- `backend/models/user.models.js`

### 5) Requiere documento solo para CIT

Los otros roles no requieren archivo. Por ejemplo:

- `user` → permitido sin documento
- `admin` → permitido sin documento
- `cit` → exige documento

## Estructura relevante

### Backend

- `backend/controllers/auth.controllers.js` → lógica del registro y respuesta HTTP
- `backend/router/auth.route.js` → define la ruta de registro con carga de archivo
- `backend/helper/upload.js` → configuración de `multer`
- `backend/helper/citRegistration.js` → validación de CIT
- `backend/models/user.models.js` → modelo del usuario con campos de documento
- `backend/app.js` → habilita archivos estáticos en `/uploads`

## Ejemplo de uso

Se debe enviar una petición `multipart/form-data` con los siguientes campos:

- `first_name`
- `last_name`
- `avatar_url`
- `username`
- `email`
- `password`
- `role`
- `document` (solo si es CIT)

### Ejemplo de rol CIT

```http
POST /api/register
Content-Type: multipart/form-data
```

Campos:

- `role: cit`
- `username: usuario123`
- `email: usuario@cit.com`
- `password: 123456`
- `document: archivo.pdf`

Si no se adjunta el documento, el backend rechaza la operación.

## Pruebas realizadas

Se creó una prueba automatizada para validar el comportamiento:

- `backend/tests/cit-registration.test.js`

Verifica que:

- un usuario CIT sin documento falla
- un usuario CIT con documento pasa
- un usuario normal sin documento pasa

## Resultado verificado

La prueba se ejecutó correctamente con resultado:

- 3 pruebas aprobadas
- 0 fallidas

## Conclusión

Este cambio deja el backend listo para controlar el registro de personal del CIT de forma segura, validando la documentación antes de permitir la creación de la cuenta.
