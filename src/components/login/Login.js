import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock } from 'react-icons/fa'; 
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await authService.login(email, password);
      login(token);
      toast.success('Inicio de sesión exitoso!');
      navigate('/taskmanager');
    } catch (error) {
      toast.error('Error en el inicio de sesión');
    }
  };

  return (
    <div className="container-all">
    <div className="login-container">
      <div className="login-box">
        <div className="image-container">
          <img src={require('../assets/mapacheccc.png')} alt="Logo" className="logo" />
        </div>
        <div className="login-card">
          <h2>¡Bienvenido de nuevo!</h2>
          <p>Inicia sesión para continuar</p>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-wrapper">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Iniciar Sesión</button>
          </form>
          <div className="register-link">
            ¿No tienes cuenta? <a onClick={() => navigate('/register')}> Regístrate aquí</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
