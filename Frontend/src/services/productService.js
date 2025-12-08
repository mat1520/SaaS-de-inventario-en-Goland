import api from './api';

const getAll = async () => {
    const response = await api.get('/products');
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

const create = async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
};

const update = async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
};
