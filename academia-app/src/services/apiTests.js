// Arquivo de teste para verificar a comunicação entre frontend e backend
import api from './api';

// Função para testar a conexão com o backend
const testConnection = async () => {
  try {
    // Tenta fazer uma requisição simples para verificar se o backend está acessível
    const response = await fetch('http://localhost:8080/api/academia', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('Conexão com o backend estabelecida com sucesso!');
      return true;
    } else {
      console.error('Erro ao conectar com o backend:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error);
    return false;
  }
};

// Função para testar a autenticação
const testAuth = async (email, senha) => {
  try {
    const response = await api.post('/auth/login', { email, senha });
    console.log('Autenticação bem-sucedida:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return null;
  }
};

// Função para testar a obtenção de academias
const testGetAcademias = async () => {
  try {
    const response = await api.get('/academia');
    console.log('Academias obtidas com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter academias:', error);
    return null;
  }
};

// Função para testar a obtenção de artigos
const testGetArtigos = async () => {
  try {
    const response = await api.get('/artigos');
    console.log('Artigos obtidos com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter artigos:', error);
    return null;
  }
};

// Função para testar a obtenção de patrocinadores
const testGetPatrocinadores = async () => {
  try {
    const response = await api.get('/patrocinadores');
    console.log('Patrocinadores obtidos com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter patrocinadores:', error);
    return null;
  }
};

// Função para testar a obtenção de treinamentos
const testGetTreinamentos = async () => {
  try {
    const response = await api.get('/treinamentos');
    console.log('Treinamentos obtidos com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter treinamentos:', error);
    return null;
  }
};

// Exporta as funções de teste
const apiTests = {
  testConnection,
  testAuth,
  testGetAcademias,
  testGetArtigos,
  testGetPatrocinadores,
  testGetTreinamentos
};

export default apiTests;
