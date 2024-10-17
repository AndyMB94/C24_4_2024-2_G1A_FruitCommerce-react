import axios from 'axios';

const API_URL = 'http://localhost:8087'; // URL del backend

const authService = {
  loginWithGoogle: async (token) => {
    // Esto depende de cómo tu backend maneje la autenticación OAuth2
    return axios.post(`${API_URL}/oauth2/authorization/google`, { token });
  },
  
  setToken: (token) => {
    localStorage.setItem('jwt', token); // Almacenar el token en localStorage
  },
  
  getToken: () => {
    return localStorage.getItem('jwt'); // Obtener el token desde localStorage
  },
  
  clearToken: () => {
    localStorage.removeItem('jwt'); // Eliminar el token del localStorage
  }
};

export default authService;
