import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8087/api/productos';

const productService = {
  getAll: async () => {
    const token = authService.getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return axios.get(`${API_URL}/all`, config);
  },
  
  createProduct: async (producto) => {
    const token = authService.getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return axios.post(`${API_URL}/save`, producto, config);
  },
  
  updateProduct: async (id, producto) => {
    const token = authService.getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return axios.put(`${API_URL}/update/${id}`, producto, config);
  },
  
  deleteProduct: async (id) => {
    const token = authService.getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return axios.delete(`${API_URL}/delete/${id}`, config);
  }
};

export default productService;
