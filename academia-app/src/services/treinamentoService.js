import api from './api';

const getAll = async () => {
  try {
    const response = await api.get('/treinamentos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const response = await api.get(`/treinamentos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  try {
    const response = await api.post('/treinamentos', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const response = await api.put(`/treinamentos/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const response = await api.delete(`/treinamentos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const treinamentoService = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default treinamentoService;
