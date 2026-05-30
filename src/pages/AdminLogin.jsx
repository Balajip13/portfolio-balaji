import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      navigate('/console-portal/dashboard');
    } else {
      setError('Invalid credentials. Access Denied.');
    }
  };

  return (
    <div className="admin-login-view">
      <div className="login-overlay"></div>
      
      {/* Return to Home Button - Top Left */}
      <button className="return-home-btn mono" onClick={() => navigate('/')}>
        <FiArrowLeft /> Return Home
      </button>

      <div className="login-content">
        <div className="login-glass-card">
          <div className="login-branding">
            <h2 className="mono">ADMIN_PORTAL</h2>
            <p className="mono">AUTHORIZED ACCESS ONLY</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-input-group">
              <label className="mono">USERNAME</label>
              <div className="input-field">
                <FiUser className="f-icon" />
                <input 
                  type="email" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label className="mono">PASSWORD</label>
              <div className="input-field">
                <FiLock className="f-icon" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            {error && <div className="admin-error-box mono">{error}</div>}

            <button type="submit" className="admin-login-btn mono">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
