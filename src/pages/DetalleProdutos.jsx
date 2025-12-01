import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import styled from 'styled-components';
import { useProducts } from "../context/ProductsContext";

const ProductoDetalle = () => {
    const { id } = useParams();
    const location = useLocation();
    const { getProducto, cargando: cargandoGlobal } = useProducts();
    const [producto, setProducto] = useState(location.state?.producto || null);
    const [cargando, setCargando] = useState(!producto);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!producto) {
            const fetchProducto = async () => {
                try {
                    setCargando(true);
                    const data = await getProducto(id);
                    setProducto(data);
                } catch (err) {
                    setError("Producto no encontrado.");
                    console.error(err);
                } finally {
                    setCargando(false);
                }
            };
            fetchProducto();
        }
    }, [id, producto, getProducto]);

    if (cargando || cargandoGlobal) {
        return <div className="container-md py-3">Cargando...</div>;
    }

    if (error) {
        return (
            <div className="container-md py-3">
                <div className="alert alert-warning">
                    <h4>{error}</h4>
                    <p>No se pudo cargar la información del producto.</p>
                    <Link to="/productos" className="btn btn-primary">
                        Volver a Productos
                    </Link>
                </div>
            </div>
        );
    }

    if (!producto) {
        return null;
    }
 
    return(
        <>
            <h2>Detalles del Producto</h2>
            <ul>
                <li key={producto.id}>
                    {producto.nombre}
                    <br />
                    <p><strong>Descripción: </strong>{producto.descripcion}</p>
                    <p>Precio: ${producto.precio}</p>
                    <img src={producto.avatar} alt={producto.nombre} width="30%" />
                </li>
                <hr />
                <Link to={`/productos`}>
                    <BotonEstilizado>Volver</BotonEstilizado>
                </Link>
            </ul>
        </>
    );
}; export default ProductoDetalle;

const BotonEstilizado = styled.button`
  background: white;
  color: black;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #31312eff;
    color: white;
  }
`;