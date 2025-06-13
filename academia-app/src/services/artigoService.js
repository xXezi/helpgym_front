import api from './api';

const getAll = async () => {
  try {
    const response = await api.get('/artigos');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const response = await api.get(`/artigos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar artigo ${id}:`, error);
    throw error;
  }
};

const create = async (data) => {
  try {
    const response = await api.post('/artigos', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar artigo:', error);
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const response = await api.put(`/artigos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar artigo ${id}:`, error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    const response = await api.delete(`/artigos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir artigo ${id}:`, error);
    throw error;
  }
};

const getComments = async (id) => {
  try {
    const response = await api.get(`/artigos/${id}/comentarios`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar comentários do artigo ${id}:`, error);
    throw error;
  }
};

const addComment = async (id, commentData) => {
  try {
    const response = await api.post(`/artigos/${id}/comentarios`, commentData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao adicionar comentário ao artigo ${id}:`, error);
    throw error;
  }
};

const updateCommentLike = async (articleId, commentId, likeData) => {
  try {
    const response = await api.put(`/artigos/${articleId}/comentarios/${commentId}/like`, likeData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar like do comentário ${commentId}:`, error);
    throw error;
  }
};

const artigoService = {
  getAll,
  getById,
  create,
  update,
  remove,
  getComments,
  addComment,
  updateCommentLike
};

export default artigoService;
