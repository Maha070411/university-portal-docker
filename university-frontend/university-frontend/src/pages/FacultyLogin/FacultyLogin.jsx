import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './FacultyLogin.css';

const FacultyLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { loginFaculty } = useData(); // Get login function from context

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
      const success = await loginFaculty(formData.employeeId, formData.password);
      if (success) {
        navigate('/faculty-dashboard');
      } else {
        setError('Invalid employee ID or password');
      }
    } catch (err) {
      setError('Login failed. Please check credentials.');
    }
  };

  return (
    <div className="login-page faculty-login">
      <div className="login-container">
        <div className="login-left">
          <div className="login-illustration">
            <div className="illustration-icon">👨‍🏫</div>
            <h2>Faculty Portal</h2>
            <p>Manage courses, assignments, and track student progress</p>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h1>Faculty Login</h1>
              <p>Access your teaching dashboard and resources</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="employeeId">Employee ID</label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="e.g., FAC2019045"
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
                <p>Are you a student? <a href="/student-login">Student Login</a></p>
                <p><a href="/">Back to Home</a></p>
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;
