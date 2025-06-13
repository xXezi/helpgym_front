// Arquivo para testar a integração entre frontend e backend
import React, { useState, useEffect } from 'react';
import apiTests from '../services/apiTests';

function TestIntegracao() {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [academias, setAcademias] = useState(null);
  const [artigos, setArtigos] = useState(null);
  const [patrocinadores, setPatrocinadores] = useState(null);
  const [treinamentos, setTreinamentos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const runTests = async () => {
      try {
        setLoading(true);
        
        // Teste de conexão
        const connection = await apiTests.testConnection();
        setConnectionStatus(connection);
        
        if (connection) {
          // Se a conexão for bem-sucedida, testa os outros endpoints
          
          // Teste de autenticação (usando credenciais de teste)
          const auth = await apiTests.testAuth('teste@exemplo.com', 'senha123');
          setAuthStatus(auth);
          
          // Teste de obtenção de dados
          const academiasData = await apiTests.testGetAcademias();
          setAcademias(academiasData);
          
          const artigosData = await apiTests.testGetArtigos();
          setArtigos(artigosData);
          
          const patrocinadoresData = await apiTests.testGetPatrocinadores();
          setPatrocinadores(patrocinadoresData);
          
          const treinamentosData = await apiTests.testGetTreinamentos();
          setTreinamentos(treinamentosData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    runTests();
  }, []);

  if (loading) {
    return <div>Testando integração com o backend...</div>;
  }

  if (error) {
    return <div>Erro ao testar integração: {error}</div>;
  }

  return (
    <div>
      <h1>Resultados dos Testes de Integração</h1>
      
      <h2>Conexão com o Backend</h2>
      <p>Status: {connectionStatus ? 'Conectado' : 'Falha na conexão'}</p>
      
      {connectionStatus && (
        <>
          <h2>Autenticação</h2>
          <p>Status: {authStatus ? 'Sucesso' : 'Falha'}</p>
          
          <h2>Academias</h2>
          <p>Status: {academias ? 'Dados obtidos' : 'Falha ao obter dados'}</p>
          
          <h2>Artigos</h2>
          <p>Status: {artigos ? 'Dados obtidos' : 'Falha ao obter dados'}</p>
          
          <h2>Patrocinadores</h2>
          <p>Status: {patrocinadores ? 'Dados obtidos' : 'Falha ao obter dados'}</p>
          
          <h2>Treinamentos</h2>
          <p>Status: {treinamentos ? 'Dados obtidos' : 'Falha ao obter dados'}</p>
        </>
      )}
    </div>
  );
}

export default TestIntegracao;
