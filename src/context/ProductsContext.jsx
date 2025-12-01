import React, { createContext, useState, useContext, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const validarProducto = (producto) => {
    const errores = {};

    if (!producto.nombre?.trim()) {
      errores.nombre = 'El nombre es obligatorio.';
    }

    if (!producto.precio?.toString().trim()) {
      errores.precio = 'El precio es obligatorio.';
    } else {
      const precioLimpio = producto.precio.toString().replace(/\./g, '').replace(',', '.');
      const precioNumerico = parseFloat(precioLimpio);
     
      if (!/^[\d.,]+$/.test(producto.precio.toString().replace(/\./g, ''))) {
        errores.precio = 'Solo números, puntos o comas.';
      } else if (isNaN(precioNumerico)) {
        errores.precio = 'Precio no válido.';
      } else if (precioNumerico <= 0) {
        errores.precio = 'Debe ser mayor a 0.';
      }
    }

    if (!producto.descripcion?.trim()) {
      errores.descripcion = 'La descripción es obligatoria.';
    } else if (producto.descripcion.length < 10) {
      errores.descripcion = 'Mínimo 10 caracteres.';
    } else if (producto.descripcion.length > 200) {
      errores.descripcion = 'Máximo 200 caracteres.';
    }

    return errores;
  };

  const validar = (producto) => {
    const errores = validarProducto(producto);
    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  };

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch('https://692cf7f2e5f67cd80a49a3c5.mockapi.io/productos');
        if (!respuesta.ok) throw new Error('Error al cargar productos');
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };
    cargarProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    try {
      const respuesta = await fetch('https://692cf7f2e5f67cd80a49a3c5.mockapi.io/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      const data = await respuesta.json();
      setProductos(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  };

  const editarProducto = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`https://692cf7f2e5f67cd80a49a3c5.mockapi.io/productos/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado),
      });

      if (!respuesta.ok) throw new Error('Error al editar el producto');

      const data = await respuesta.json();
      setProductos(prev =>
        prev.map(producto =>
          producto.id === productoActualizado.id ? data : producto
        )
      );
      return data;
    } catch (error) {
      console.error('Error al editar producto:', error);
      throw error;
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const respuesta = await fetch(`https://692cf7f2e5f67cd80a49a3c5.mockapi.io/productos/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) throw new Error('Error al eliminar el producto');

      setProductos(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  };

  const getProducto = async (id) => {
    try {
      const productoLocal = productos.find(p => p.id === id);
      if (productoLocal) {
        return productoLocal;
      }

      const respuesta = await fetch(`https://692cf7f2e5f67cd80a49a3c5.mockapi.io/productos/${id}`);
      if (!respuesta.ok) {
        throw new Error('Producto no encontrado');
      }
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      throw error;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        productos,
        cargando,
        error,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        getProducto,
        validarProducto,
        validar
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};