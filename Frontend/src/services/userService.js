import api from './api';

const getProfile = async () => {
    const response = await api.get('/profile');
    return response.data;
};

const updateProfile = async (userData) => {
    const response = await api.put('/profile', userData);
    return response.data;
};

export default {
    getProfile,
    updateProfile,
};
