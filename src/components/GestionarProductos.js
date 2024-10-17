import React, { useState, useEffect } from 'react';
import productService from '../services/productService';

const GestionarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: 0,
    categoriaId: 1,  // Puedes inicializar con un ID válido
    proveedorId: 1   // Puedes inicializar con un ID válido
  });
  const [editando, setEditando] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
  const [error, setError] = useState(null);

  // Cargar todos los productos
  useEffect(() => {
    productService.getAll()
      .then(response => {
        if (Array.isArray(response.data)) {
          setProductos(response.data); // Asignar productos si es un arreglo
        } else {
          setProductos([]); // Si no es un arreglo, asignar arreglo vacío
        }
      })
      .catch(err => {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos");
      });
  }, []);

  // Manejar cambios en los campos de formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  // Agregar nuevo producto
  const agregarProducto = () => {
    productService.createProduct(nuevoProducto)
      .then(response => {
        setProductos([...productos, response.data]);  // Agregar el producto a la lista
        setNuevoProducto({ nombre: '', precio: 0, categoriaId: 1, proveedorId: 1 }); // Resetear el formulario
      })
      .catch(err => {
        console.error("Error al agregar producto:", err);
      });
  };

  // Iniciar edición de un producto
  const iniciarEdicion = (producto) => {
    setEditando(true);
    setProductoActual(producto);
  };

  // Editar producto
  const editarProducto = () => {
    productService.updateProduct(productoActual.idProducto, productoActual)
      .then(() => {
        setProductos(productos.map(p => p.idProducto === productoActual.idProducto ? productoActual : p));
        setEditando(false);
        setProductoActual(null);
      })
      .catch(err => {
        console.error("Error al editar producto:", err);
      });
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    productService.deleteProduct(id)
      .then(() => {
        setProductos(productos.filter(p => p.idProducto !== id));
      })
      .catch(err => {
        console.error("Error al eliminar producto:", err);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gestión de Productos</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Formulario para agregar nuevo producto */}
      <div className="card mb-4">
        <div className="card-header">
          {editando ? "Editar Producto" : "Agregar Producto"}
        </div>
        <div className="card-body">
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre del producto</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Nombre del producto"
                value={editando ? productoActual?.nombre : nuevoProducto.nombre}
                onChange={editando ? (e) => setProductoActual({ ...productoActual, nombre: e.target.value }) : handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Precio del producto</label>
              <input
                type="number"
                name="precio"
                className="form-control"
                placeholder="Precio del producto"
                value={editando ? productoActual?.precio : nuevoProducto.precio}
                onChange={editando ? (e) => setProductoActual({ ...productoActual, precio: e.target.value }) : handleInputChange}
              />
            </div>
            {/* Añade aquí inputs para proveedorId y categoriaId si lo necesitas */}
            <div className="col-12">
              <button type="button" className="btn btn-primary mt-3" onClick={editando ? editarProducto : agregarProducto}>
                {editando ? "Guardar Cambios" : "Agregar Producto"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tabla de productos */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr><td colSpan="4">No hay productos disponibles</td></tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.idProducto}>
                <td>{producto.idProducto}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => iniciarEdicion(producto)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(producto.idProducto)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GestionarProductos;
