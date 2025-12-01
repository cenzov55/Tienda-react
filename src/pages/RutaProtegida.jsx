import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function RutaProtegida({ children, soloAdmin = false }) {
  const { isAuthenticated, usuario } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  if (soloAdmin && usuario?.nombre !== "admin") {
    // Si la ruta es solo para admin y el usuario no es admin, redirigir a una página de no autorizado o al inicio
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegida;