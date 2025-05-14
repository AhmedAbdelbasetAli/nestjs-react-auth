import axios from 'axios';

// Create an instance with base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend URL
  timeout: 10000, // 10 sec timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to inject JWT token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;