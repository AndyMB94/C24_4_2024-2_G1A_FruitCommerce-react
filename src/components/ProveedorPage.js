import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProveedorPage = () => {
  const navigate = useNavigate();

  const handleGestionarProductos = () => {
    navigate('/gestionar-productos');
  };

  return (
    <div>
      <h1>Bienvenido Proveedor</h1>
      <button onClick={handleGestionarProductos}>Gestionar Productos</button>
    </div>
  );
};

export default ProveedorPage;
