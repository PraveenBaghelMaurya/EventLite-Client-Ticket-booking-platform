  import axios from 'axios';

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8880/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('user');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      console.log('Request sent:', config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('Response received:', response);
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );

  export default axiosInstance;