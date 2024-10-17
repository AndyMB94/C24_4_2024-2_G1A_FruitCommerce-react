import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import CompradorPage from './components/CompradorPage';
import ProveedorPage from './components/ProveedorPage';
import GestionarProductos from './components/GestionarProductos';
import LoginSuccess from './components/LoginSuccess';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/comprador" element={<CompradorPage />} />
          <Route path="/proveedor" element={<ProveedorPage />} />
          <Route path="/gestionar-productos" element={<GestionarProductos />} />
          <Route path="/login-success" element={<LoginSuccess />} /> {/* Nueva ruta para capturar el token */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
