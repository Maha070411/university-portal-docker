import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FacultySidebar.css';

const FacultySidebar = ({ faculty }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/faculty-dashboard'
    },
    {
      id: 'create-assignment',
      label: 'Create Assignment',
      icon: '📝',
      path: '/faculty-dashboard',
      action: 'create-assignment',
      description: 'Add new assignment'
    },
    {
      id: 'mark-attendance',
      label: 'Mark Attendance',
      icon: '🗓️',
      path: '/faculty-attendance',
      description: 'Record student attendance'
    },
    {
      id: 'grade-assignments',
      label: 'Grade Assignments',
      icon: '✅',
      path: '/faculty-dashboard',
      description: 'Evaluate submissions'
    },
    {
      id: 'course-materials',
      label: 'Course Materials',
      icon: '📚',
      path: '/faculty-dashboard',
      description: 'Upload resources'
    },
    {
      id: 'student-records',
      label: 'Student Records',
      icon: '👥',
      path: '/faculty-dashboard',
      description: 'View student profiles'
    }
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userId');
    navigate('/faculty-login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleMenuClick = (item) => {
    if (item.action === 'create-assignment') {
      // Trigger create assignment modal
      const event = new CustomEvent('openAssignmentModal');
      window.dispatchEvent(event);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="faculty-sidebar">
      <div className="sidebar-header">
        <div className="faculty-profile">
          <div className="profile-avatar">👨‍🏫</div>
          <div className="profile-info">
            <h3>{faculty?.name || 'Dr. Sarah Johnson'}</h3>
            <p className="faculty-id">{faculty?.employeeId || 'FAC2019045'}</p>
            <p className="faculty-designation">{faculty?.designation || 'Associate Professor'}</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id} className={isActive(item.path) ? 'active' : ''}>
              <button
                className="nav-item"
                onClick={() => handleMenuClick(item)}
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
            <span className="stat-label">Courses</span>
            <span className="stat-value">3</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Students</span>
            <span className="stat-value">111</span>
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

export default FacultySidebar;
