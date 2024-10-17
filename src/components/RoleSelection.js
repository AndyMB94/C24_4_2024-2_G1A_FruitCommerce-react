import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'comprador') {
      navigate('/comprador');
    } else if (role === 'proveedor') {
      navigate('/proveedor');
    }
  };

  return (
    <div>
      <h2>Seleccione su rol</h2>
      <button onClick={() => handleRoleSelection('comprador')}>Comprador</button>
      <button onClick={() => handleRoleSelection('proveedor')}>Proveedor</button>
    </div>
  );
};

export default RoleSelection;
