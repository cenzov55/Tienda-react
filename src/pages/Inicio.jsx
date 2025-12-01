import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProducts } from '../context/ProductsContext';

const InicioContainer = styled.div`
  text-align: center;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s;
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background-color: #dc3545;
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

function Inicio() {
  const { productos, cargando, error } = useProducts();
  const [zapatillaUrbana, setZapatillaUrbana] = useState(null);
  const [zapatillaDeportiva, setZapatillaDeportiva] = useState(null);
  const [zapatillaCasual, setZapatillaCasual] = useState(null);

  useEffect(() => {
    if (productos.length > 0) {
      setZapatillaUrbana(productos.find(p => p.categoria === 'Urbano' && p.nombre.includes('Urbana')) || null);
      setZapatillaDeportiva(productos.find(p => p.categoria === 'Deportivo') || null);
      setZapatillaCasual(productos.find(p => p.categoria === 'Urbano' && p.nombre.includes('Lona')) || null);
    }
  }, [productos]);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;

  return (
    <InicioContainer>
      <Title>Tienda de Zapatillas</Title>
      <hr />
      <main>
        <Subtitle>
          Explora nuestra colección de zapatillas urbanas y deportivas. Diseñadas para ofrecerte la máxima comodidad y estilo, ya sea que estés en la ciudad o en la pista.
        </Subtitle>
      </main>
      <ImageContainer>
        {zapatillaUrbana && (
          <ImageWrapper>
            <img src={zapatillaUrbana.avatar} alt="Zapatilla Urbana" />
            <ImageOverlay className="overlay">Zapatilla Urbana</ImageOverlay>
          </ImageWrapper>
        )}
        {zapatillaDeportiva && (
          <ImageWrapper>
            <img src={zapatillaDeportiva.avatar} alt="Zapatilla Deportiva" />
            <ImageOverlay className="overlay">Zapatilla Deportiva</ImageOverlay>
          </ImageWrapper>
        )}
        {zapatillaCasual && (
          <ImageWrapper>
            <img src={zapatillaCasual.avatar} alt="Zapatilla Casual" />
            <ImageOverlay className="overlay">Zapatilla Casual</ImageOverlay>
          </ImageWrapper>
        )}
      </ImageContainer>
      <CtaButton to="/productos">Ver Productos</CtaButton>
    </InicioContainer>
  );
}

export default Inicio;