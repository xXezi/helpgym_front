import api from './api';

const getAll = async () => {
  try {
    const response = await api.get('/patrocinadores');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const response = await api.get(`/patrocinadores/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  try {
    const response = await api.post('/patrocinadores', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const response = await api.put(`/patrocinadores/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const response = await api.delete(`/patrocinadores/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const patrocinadorService = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default patrocinadorService;
