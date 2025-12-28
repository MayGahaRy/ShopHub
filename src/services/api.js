import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor to add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    register: (userData) => api.post('/auth/register', userData),
    login: (userData) => api.post('/auth/login', userData),
    loadUser: () => api.get('/auth/user'),
    logout: () => api.post('/auth/logout')
};

export const productService = {
    getAll: () => api.get('/products'),
    getOne: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`)
};

export const orderService = {
    create: (orderData) => api.post('/orders', orderData),
    getAll: () => api.get('/orders'), // Admin gets all, user gets theirs
    updateStatus: (id, status) => api.put(`/orders/${id}`, { status })
};

export const reviewService = {
    add: (reviewData) => api.post('/reviews', reviewData),
    getByProduct: (productId) => api.get(`/reviews/${productId}`)
};

export const couponService = {
    validate: (code) => api.post('/coupons/validate', { code }),
    getAll: () => api.get('/coupons'),
    create: (data) => api.post('/coupons', data),
    delete: (id) => api.delete(`/coupons/${id}`)
};

export const chatService = {
    getMessages: () => api.get('/chat'),
    sendMessage: (text, sender, targetUserId, type, image) => api.post('/chat', { text, sender, targetUserId, type, image }),
    getAllMessages: () => api.get('/chat/admin/all')
};

export default api;
