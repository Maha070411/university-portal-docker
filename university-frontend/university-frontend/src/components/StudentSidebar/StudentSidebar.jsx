import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StudentSidebar.css';

const StudentSidebar = ({ student }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/student-dashboard'
    },
    {
      id: 'attendance',
      label: 'View Attendance',
      icon: '📈',
      path: '/student-attendance',
      description: 'Track your attendance'
    },
    {
      id: 'assignments',
      label: 'Submit Assignments',
      icon: '📝',
      path: '/student-assignments',
      description: 'Upload your work'
    },
    {
      id: 'study-materials',
      label: 'Study Materials',
      icon: '📚',
      path: '/student-dashboard?tab=materials',
      description: 'Access course materials'
    },
    {
      id: 'timetable',
      label: 'Timetable',
      icon: '📅',
      path: '/student-dashboard?tab=timetable',
      description: 'View class schedule'
    }
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userId');
    navigate('/student-login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="student-sidebar">
      <div className="sidebar-header">
        <div className="student-profile">
          <div className="profile-avatar">👨‍🎓</div>
          <div className="profile-info">
            <h3>{student?.name || 'John Smith'}</h3>
            <p className="student-id">{student?.rollNo || 'CS2022001'}</p>
            <p className="student-program">{student?.program || 'B.Tech CS'}</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id} className={isActive(item.path) ? 'active' : ''}>
              <button
                className="nav-item"
                onClick={() => navigate(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-label">CGPA</span>
            <span className="stat-value">{student?.cgpa || '8.5'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Semester</span>
            <span className="stat-value">{student?.semester || '6th'}</span>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default StudentSidebar;
