import axios from 'axios';

// Base instance create karo
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8880/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - har request se pehle
axiosInstance.interceptors.request.use(
  (config) => {
    // Token add karna ho toh yahan karo
    const token = localStorage.getItem('authToken');
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

// Response interceptor - har response ke baad
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    // Global error handling
    if (error.response?.status === 401) {
      // Unauthorized - logout kar do
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;