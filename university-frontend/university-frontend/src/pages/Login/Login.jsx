import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page login-selector">
      <div className="login-container selector-container">
        <div className="login-header">
          <div className="logo">🎓</div>
          <h1>University Portal</h1>
          <p className="subtitle">Select your portal to continue</p>
        </div>

        <div className="portal-options">
          <div className="portal-card student-card" onClick={() => navigate('/student-login')}>
            <div className="portal-icon">👨‍🎓</div>
            <h2>Student Portal</h2>
            <p className="portal-desc">Access your courses, assignments, and grades</p>
            <button className="btn btn-primary">Student Login →</button>
          </div>

          <div className="portal-card faculty-card" onClick={() => navigate('/faculty-login')}>
            <div className="portal-icon">👨‍🏫</div>
            <h2>Faculty Portal</h2>
            <p className="portal-desc">Manage courses and student progress</p>
            <button className="btn btn-primary">Faculty Login →</button>
          </div>
        </div>

        <div className="login-footer">
          <a href="/" className="back-link">← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
