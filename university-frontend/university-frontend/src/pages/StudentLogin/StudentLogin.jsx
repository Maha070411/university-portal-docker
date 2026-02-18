import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './StudentLogin.css';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNo: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { loginStudent } = useData(); // Get login function from context

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await loginStudent(formData.rollNo, formData.password);
      if (success) {
        navigate('/student-dashboard');
      } else {
        setError('Invalid roll number or password');
      }
    } catch (err) {
      setError('Login failed. Please check credentials.');
    }
  };

  return (
    <div className="login-page student-login">
      <div className="login-container">
        <div className="login-left">
          <div className="login-illustration">
            <div className="illustration-icon">🎓</div>
            <h2>Student Portal</h2>
            <p>Access your academic dashboard, assignments, and attendance records</p>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h1>Student Login</h1>
              <p>Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="rollNo">Roll Number</label>
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  placeholder="e.g., CS2022001"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary btn-login">
                Login
              </button>

              <div className="login-footer">
                <p>Not a student? <a href="/faculty-login">Faculty Login</a></p>
                <p><a href="/">Back to Home</a></p>
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
