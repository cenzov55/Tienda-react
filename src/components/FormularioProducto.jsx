import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { toast } from 'react-toastify';

function FormularioProducto() {
  const { agregarProducto, editarProducto, validar, cargando: cargandoGlobal } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const productoAEditar = location.state?.producto;

  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    avatar: '',
    categoria: ''
  });
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (productoAEditar) {
      setProducto({
        id: productoAEditar.id,
        nombre: productoAEditar.nombre,
        precio: productoAEditar.precio,
        descripcion: productoAEditar.descripcion,
        avatar: productoAEditar.avatar,
        categoria: productoAEditar.categoria
      });
    }
  }, [productoAEditar]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({
      ...prev,
      [name]: value
    }));
    setErrores(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const { esValido, errores: nuevosErrores } = validar(producto);

    if (!esValido) {
      setErrores(nuevosErrores);
      toast.error('Por favor, corrige los errores del formulario.');
      return;
    }

    setCargando(true);
    try {
      if (producto.id) {
        await editarProducto(producto);
        toast.success('Producto actualizado correctamente!');
      } else {
        await agregarProducto(producto);
        toast.success('Producto agregado correctamente!');
      }
      navigate('/productos');
    } catch (error) {
      console.error("Error al guardar producto:", error);
      toast.error('Error al guardar el producto.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        {producto.id ? 'Editar Producto' : 'Agregar Producto'}
      </h2>
      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={manejarCambio}
          />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="text"
            className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={manejarCambio}
          />
          {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
            id="descripcion"
            name="descripcion"
            rows="3"
            value={producto.descripcion}
            onChange={manejarCambio}
          ></textarea>
          {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">URL de Imagen (Avatar)</label>
          <input
            type="text"
            className="form-control"
            id="avatar"
            name="avatar"
            value={producto.avatar}
            onChange={manejarCambio}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <input
            type="text"
            className="form-control"
            id="categoria"
            name="categoria"
            value={producto.categoria}
            onChange={manejarCambio}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/productos')}
            disabled={cargando || cargandoGlobal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={cargando || cargandoGlobal}
            style={{ backgroundColor: cargando ? '#0056b3' : '#007bff' }}
          >
            {cargando ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioProducto;