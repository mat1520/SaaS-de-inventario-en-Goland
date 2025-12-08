import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Ensure API_URL ends with /api/v1
if (!API_URL.endsWith('/api/v1')) {
    if (API_URL.endsWith('/')) {
        API_URL = API_URL.slice(0, -1);
    }
    API_URL += '/api/v1';
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
