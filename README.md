# 🧾 Backend - Tienda de Ropa / Control de Stock 👕👟

Este proyecto corresponde al **backend del sistema de gestión y catálogo de Lannister tienda de ropa**, el cual permite administrar **productos** y **usuarios** con autenticación segura y validaciones completas.

---

## 🚀 Características Principales

✅ CRUD de **Productos**  
✅ CRUD de **Usuarios**  
✅ **Autenticación y Autorización con JWT**  
✅ **Encriptación de contraseñas con Bcrypt**  
✅ **Validaciones con Express Validator**  
✅ **Subida de imágenes con Multer + Cloudinary**  
✅ **Conexión a base de datos MongoDB con Mongoose**  
✅ **CORS habilitado para frontend externo**

---

## 🏗️ Tecnologías Utilizadas

| Tecnología         | Propósito |
|--------------------|--------------------------------------------------|
| **Express.js**     | Framework principal del servidor                 |
| **MongoDB + Mongoose** | Base de datos y modelado de esquemas      |
| **JWT (jsonwebtoken)** | Autenticación por token                   |
| **bcrypt**         | Hash de contraseñas                             |
| **Cloudinary + Multer** | Gestión y almacenamiento de imágenes      |
| **Express Validator** | Validaciones de formularios y requests     |
| **CORS**           | Permitir acceso desde el frontend               |
| **Morgan**         | Logs de peticiones HTTP                         |

---
## **🛠 Instalación y Ejecución**  

1. **Clona el repositorio**  
   ```bash
   git clone https://github.com/hernanortiz1/proyectoModulo3.git
   ```

2. **Instala las dependencias**  
   ```bash
   npm install
   ```

3. **Ejecuta el proyecto**  
   ```bash
   npm run dev
   ```
   Abre tu navegador en: [http://localhost:5173](http://localhost:5173)  

---

## **📂 Estructura del Proyecto**  
```
proyecto-modulo3/
├── db/
│   └── config.js/         
├── server/
│   └── config.js/  
├── src/
|   └── controllers/
|   |       └── producto.controllers.js
|   |       └── usuario.controllers.js
|   └── helpers/
|   |      └── cloudinary.js
|   |      └── cloudinaryUploader.js
|   |      └── generarJWT.js
|   └── middelware/
|   |      └── errorMulter.js
|   |      └── resultadoValidacion.js
|   |      └── validacionUsuario.js
|   |      └── validacionProducto.js
|   |      └── verificarToken.js
|   └── models/
|   |      └── producto.models.js
|   |      └── usuario.models.js
|   └── models/
|   |      └── producto.models.js
|   |      └── usuario.models.js
|   └── routes/
|   |      └── index.routes.js
|   |      └── producto.routes.js
|   |      └── usuario.routes.js
├── index.js/

```

---
## 👤 Autores


- **Juan Manuel Blanco:** *Desarrollador*
  [GitHub](https://github.com/juanchiblanco)
- **Lucas Figueroa:** *Desarrollador*
  [GitHub](https://github.com/Lucaspozziok64)
- **Ignacio Joaquín Barrojo:** *Desarrollador*
  [GitHub](https://github.com/TucuNacho)
- **Hernán Ortiz:** *Desarrollador*
 [GitHub](https://github.com/hernanortiz1)