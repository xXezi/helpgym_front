import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Definir process.env globalmente para evitar erros
window.process = {
  env: {
    NODE_ENV: 'development',
    PUBLIC_URL: '',
    REACT_APP_API_URL: 'http://localhost:8080/api'
  }
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
