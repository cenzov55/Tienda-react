# Proyecto de Tienda de Zapatillas

Este es un proyecto de comercio electrónico de zapatillas urbanas y deportivas construido con React. La aplicación permite a los usuarios ver productos, agregarlos a un carrito de compras y realizar compras simuladas. También incluye un panel de administración para agregar, editar y eliminar productos.

## Empezando

### Requisitos previos

- Node.js (v14 o superior)
- npm

### Instalación

1.  Clone el repositorio:
    git clone https://github.com/tu-usuario/tu-repositorio.git
2.  Instale las dependencias:
    npm install

### Ejecutando la Aplicación

npm run dev

Esto iniciará la aplicación en modo de desarrollo. Abra [http://localhost:5173](http://localhost:5173) para verla en su navegador.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

```
/
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- vite.config.js
|-- node_modules/
|-- public/
|   `-- img_zapatillas/
`-- src/
    |-- App.css
    |-- App.jsx
    |-- index.css
    |-- main.jsx
    |-- assets/
    |   |-- productos.json
    |   `-- react.svg
    |-- components/
    |-- context/
    |   |-- AuthContext.jsx
    |   |-- CartContext.jsx
    |   `-- ProductsContext.jsx
    `-- pages/
        |-- Carrito.jsx
        |-- Dashboard.jsx
        |-- DetalleProdutos.jsx
        |-- Footer.jsx
        |-- IniciarSesion.jsx
        |-- Inicio.jsx
        |-- Navbar.jsx
        |-- Pagar.jsx
        |-- Productos.jsx
        |-- RutaProtegida.jsx
        `-- Servicios.jsx
```

-   **`src/components`**: Contiene componentes de React reutilizables.
-   **`src/pages`**: Contiene los componentes de la página principal.
-   **`src/context`**: Contiene los proveedores de React Context para la gestión del estado.
-   **`src/assets`**: Contiene activos estáticos como imágenes y archivos JSON.
-   **`public/img_zapatillas`**: Carpeta pública para las imágenes de los productos.
-   **`src/App.jsx`**: El componente raíz de la aplicación que configura el enrutamiento.
-   **`src/main.jsx`**: El punto de entrada de la aplicación.

## Rutas

| Ruta                      | Descripción                                                     | Componente             |
| ------------------------- | --------------------------------------------------------------- | ---------------------- |
| `/`                       | Página de inicio de la aplicación.                              | `Inicio`               |
| `/servicios`              | Página de servicios.                                            | `Servicios`            |
| `/productos`              | Muestra la lista de todos los productos.                        | `Productos`            |
| `/productos/:id`          | Muestra los detalles de un producto específico.                 | `DetalleProdutos`      |
| `/iniciar-sesion`         | Formulario de inicio de sesión.                                 | `IniciarSesion`        |
| `/pagar`                  | Página para finalizar la compra (protegida por autenticación).    | `Pagar`                |
| `/dashboard`              | Panel de administración (protegido, solo para administradores). | `Dashboard`            |
| `/formulario-producto`    | Formulario para agregar o editar productos (solo para administradores). | `FormularioProducto`   |
| `/eliminar-producto`      | Página para confirmar la eliminación de un producto (solo para administradores). | `EliminarProducto`     |

## Circuito de la Aplicación

1.  **Carga de Productos:** La aplicación carga los productos desde una API simulada (MockAPI) a través de `ProductsContext`.
2.  **Visualización de Productos:** Los productos se muestran en la página `Productos`. Los usuarios pueden buscar y paginar a través de la lista.
3.  **Detalles del Producto:** Al hacer clic en "Ver detalles", se navega a la página `DetalleProdutos`, que muestra información adicional sobre el producto.
4.  **Carrito de Compras:** Los usuarios pueden agregar productos a su carrito desde las páginas `Productos` y `DetalleProdutos`. El estado del carrito se gestiona en `CartContext`.
5.  **Autenticación:** Los usuarios pueden iniciar sesión como un usuario normal o como "admin". El estado de autenticación se gestiona en `AuthContext`.
6.  **Rutas Protegidas:** Las rutas `/pagar` y `/dashboard` están protegidas y requieren que el usuario haya iniciado sesión. La ruta `/dashboard` y las funciones de administración de productos son solo para administradores.
7.  **Administración de Productos:** Los administradores pueden agregar, editar y eliminar productos a través de los componentes `FormularioProducto` y `EliminarProducto`.

## API

La aplicación utiliza una MockAPI para obtener y administrar los datos de los productos.

-   **Endpoint:** `https://692cf7f2e5f67cd80a49a3c5.mockapi.io/productos`

## Componentes Clave

### Contextos

-   **`ProductsContext`**: Gestiona el estado de los productos, incluida la carga, adición, edición y eliminación de productos de la MockAPI.
-   **`CartContext`**: Gestiona el estado del carrito de compras, lo que permite a los usuarios agregar, eliminar y ver los artículos de su carrito.
-   **`AuthContext`**: Gestiona la autenticación del usuario, distinguiendo entre usuarios normales y administradores.

### Páginas

-   **`Inicio`**: Página de destino que muestra una introducción a la tienda y enlaces a las categorías de productos.
-   **`Productos`**: Muestra una lista de todos los productos con funciones de búsqueda y paginación.
-   **`DetalleProdutos`**: Muestra los detalles de un solo producto.
-   **`RutaProtegida`**: Un componente de orden superior que protege las rutas para que solo los usuarios autenticados (y opcionalmente solo los administradores) puedan acceder a ellas.
