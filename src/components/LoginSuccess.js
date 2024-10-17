import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService'; // Servicio para almacenar el token

const LoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      authService.setToken(token); // Almacenar el token en localStorage
      navigate('/'); // Redirigir a la página de selección de rol
    } else {
      console.error("No token found in URL");
      // Manejar el error en caso de que no haya token
    }
  }, [location, navigate]);

  return <div>Redirigiendo...</div>;
};

export default LoginSuccess;
