import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal/Modal';
import StudentSidebar from '../../components/StudentSidebar/StudentSidebar';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, students, updateStudent, grades, assignments } = useData();

  // State for modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    semester: ''
  });

  // Use currentUser if available, otherwise fallback (or redirect)
  const currentStudent = currentUser || students[0] || {
    id: 'STU2022001',
    name: 'John Smith',
    rollNo: 'CS2022001',
    program: 'B.Tech Computer Science',
    semester: '6th Semester',
    cgpa: '8.5',
    email: 'john.smith@university.edu',
    phone: '+1 234 567 8900'
  };

  // If no user is logged in (and no mock fallback), redirect to login
  React.useEffect(() => {
    // Logic to check auth could go here
  }, [currentUser]);

  // Get student's grades (Mock for now as backend doesn't have grades)
  const studentGrades = grades ? grades.filter(g => g.studentId === currentStudent.id).slice(0, 4) : [];

  // Get student's assignments (pending and upcoming)
  // assignments from context are already specific to student if logged in
  const studentAssignments = assignments ? assignments.filter(a => a.status !== 'completed').slice(0, 3) : [];

  const handleOpenModal = () => {
    setFormData({
      name: currentStudent.name,
      email: currentStudent.email || '',
      phone: currentStudent.phone || '',
      program: currentStudent.program,
      semester: currentStudent.semester
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(currentStudent.id, formData);
    handleCloseModal();
  };

  const studentInfo = {
    name: currentStudent.name,
    rollNo: currentStudent.rollNo,
    program: currentStudent.program,
    semester: currentStudent.semester,
    cgpa: currentStudent.cgpa
  };

  const recentGrades = studentGrades.length > 0 ? studentGrades.map(g => ({
    course: g.courseName || g.courseId,
    grade: g.grade,
    credits: 4 // Default credits
  })) : [
    { course: 'Data Structures', grade: 'A', credits: 4 },
    { course: 'Database Systems', grade: 'A-', credits: 4 },
    { course: 'Web Development', grade: 'B+', credits: 3 },
    { course: 'Operating Systems', grade: 'A', credits: 4 }
  ];

  const upcomingAssignments = studentAssignments.length > 0 ? studentAssignments.map(a => ({
    title: a.title,
    course: a.courseId,
    dueDate: a.dueDate,
    status: new Date(a.dueDate) - new Date() < 3 * 24 * 60 * 60 * 1000 ? 'urgent' : 'pending'
  })) : [
    { title: 'ML Project Report', course: 'Machine Learning', dueDate: '2026-02-25', status: 'pending' },
    { title: 'Database Design', course: 'DBMS', dueDate: '2026-02-20', status: 'urgent' },
    { title: 'React Application', course: 'Web Dev', dueDate: '2026-03-01', status: 'pending' }
  ];

  return (
    <div className="dashboard-page with-sidebar">
      <StudentSidebar student={currentStudent} />

      <div className="dashboard-content">
        <div className="container">
          <div className="dashboard-header">
            <h1>Student Dashboard</h1>
          </div>

          {/* Student Info Card */}
          <div className="info-card">
            <div className="student-avatar">👨‍🎓</div>
            <div className="student-details">
              <h2>{studentInfo.name}</h2>
              <p>Roll No: {studentInfo.rollNo}</p>
              <p>{studentInfo.program} • {studentInfo.semester}</p>
            </div>
            <div className="cgpa-display">
              <div className="cgpa-label">CGPA</div>
              <div className="cgpa-value">{studentInfo.cgpa}</div>
            </div>
            <button className="btn-edit-profile" onClick={handleOpenModal}>✏️ Edit Profile</button>
          </div>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Recent Grades */}
            <div className="dashboard-section">
              <h2>Recent Grades</h2>
              <div className="grades-list">
                {recentGrades.map((grade, index) => (
                  <div key={index} className="grade-item">
                    <div className="grade-info">
                      <h4>{grade.course}</h4>
                      <p>{grade.credits} Credits</p>
                    </div>
                    <div className={`grade-badge grade-${grade.grade.charAt(0).toLowerCase()}`}>
                      {grade.grade}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="dashboard-section">
              <h2>Upcoming Assignments</h2>
              <div className="assignments-list">
                {upcomingAssignments.map((assignment, index) => (
                  <div key={index} className={`assignment-item ${assignment.status}`}>
                    <div className="assignment-info">
                      <h4>{assignment.title}</h4>
                      <p>{assignment.course}</p>
                      <p className="due-date">Due: {assignment.dueDate}</p>
                    </div>
                    <div className={`status-badge ${assignment.status}`}>
                      {assignment.status === 'urgent' ? '⚠️ Urgent' : '📌 Pending'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Edit Profile">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="program">Program</label>
              <input
                type="text"
                id="program"
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <input
                type="text"
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default StudentDashboard;
