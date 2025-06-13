import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Register.css';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }
    
    try {
      setLoading(true);
      
      const userData = {
        nome: nome,
        email: email,
        senha: senha
      };
      
      // Usando fetch com caminho relativo para evitar problemas de CORS
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        // Armazenando dados do usuário
        localStorage.setItem('user', JSON.stringify({
          nome,
          email,
        }));
        
        // Exibindo mensagem de sucesso ao invés de redirecionar
        setSuccess('Cadastro realizado com sucesso!');
        
        // Limpar os campos do formulário após sucesso
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
      } else {
        try {
          const errorData = await response.json();
          setError(errorData.message || 'Erro ao registrar. Tente novamente mais tarde.');
        } catch {
          setError('Erro ao registrar. Tente novamente mais tarde.');
        }
      }
    } catch (err) {
      setError('Falha na conexão. Verifique sua internet e tente novamente.');
      console.error('Erro de registro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Registrar'}
        </button>
      </form>
      <p>
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
}

export default Register;