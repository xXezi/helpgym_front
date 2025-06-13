import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Obter usuário do localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Olá, {user.nome}</span>
          <button onClick={handleLogout} className="logout-button">Sair</button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2>Bem-vindo ao HelpGym!</h2>
          <p>Este é um exemplo de dashboard para o projeto de integração.</p>
          <p>Aqui você poderá visualizar informações sobre academias, artigos, patrocinadores e treinamentos.</p>
        </section>
        
        <div className="dashboard-grid">
          <section className="dashboard-card">
            <h3>Academias</h3>
            <p>Gerencie suas academias cadastradas.</p>
            <button className="action-button">Ver Academias</button>
          </section>
          
          <section className="dashboard-card">
            <h3>Artigos</h3>
            <p>Acesse artigos sobre saúde e fitness.</p>
            <button className="action-button">Ver Artigos</button>
          </section>
          
          <section className="dashboard-card">
            <h3>Patrocinadores</h3>
            <p>Veja os patrocinadores do sistema.</p>
            <button className="action-button">Ver Patrocinadores</button>
          </section>
          
          <section className="dashboard-card">
            <h3>Treinamentos</h3>
            <p>Acesse seus treinamentos personalizados.</p>
            <button className="action-button">Ver Treinamentos</button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
