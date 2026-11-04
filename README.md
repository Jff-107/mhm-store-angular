# MHM Store

Aplicación Angular de tienda y gestión de inventario que almacena sus datos en el `localStorage` del navegador. No requiere servidor backend ni base de datos.

## Requisitos
- Node.js (versión compatible con Angular 19)
- npm

## Instalación y ejecución
Desde esta carpeta, ejecuta:

```bash
npm install
npm start
```

Abre la dirección local que muestra Angular CLI (normalmente `http://localhost:4200`).

## Acceso inicial
- Correo: `admin@mhmstore.pe`
- Contraseña: `Admin123*`

El usuario administrador inicial se crea automáticamente en el navegador si todavía no existe información guardada.

## Almacenamiento
Productos, categorías, trabajadores, compras, ventas y sesión se guardan en `localStorage`. Los datos permanecen en el navegador y dispositivo donde se registraron. Si se borran los datos del sitio o se cambia de navegador/dispositivo, no se sincronizan ni se recuperan automáticamente. Las imágenes cargadas también se guardan como datos locales del navegador.

El comprobante de venta es una vista imprimible que permite elegir «Guardar como PDF» desde el diálogo de impresión del navegador. No es un comprobante electrónico autorizado por SUNAT.
