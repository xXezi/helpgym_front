import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Simulação de login bem-sucedido para teste
      localStorage.setItem('token', 'teste-token');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        nome: 'Usuário Teste',
        email: email
      }));
      
      history.push('/dashboard');
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
      console.error('Erro de login:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta? <a href="/register">Registre-se</a>
      </p>
    </div>
  );
}

export default Login;
