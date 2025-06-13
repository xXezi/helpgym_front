import api from './api';

const getAll = async () => {
  try {
    const response = await api.get('/academias');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const response = await api.get(`/academias/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  try {
    const response = await api.post('/academias', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const response = await api.put(`/academias/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const response = await api.delete(`/academias/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const academiaService = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default academiaService;
