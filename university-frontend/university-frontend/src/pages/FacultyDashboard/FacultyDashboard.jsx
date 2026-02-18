import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal/Modal';
import FacultySidebar from '../../components/FacultySidebar/FacultySidebar';
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, courses, assignments, addAssignment, updateAssignment, deleteAssignment } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    courseName: '',
    dueDate: '',
    maxMarks: '',
    description: ''
  });

  const facultyInfo = currentUser || {
    name: 'Dr. Sarah Johnson',
    employeeId: 'FAC2019045',
    department: 'Computer Science',
    designation: 'Associate Professor',
    email: 'sarah.johnson@university.edu'
  };

  const pendingTasks = assignments ? assignments.filter(a => a.status !== 'completed') : [];

  const handleOpenModal = (assignment = null) => {
    if (assignment) {
      setEditingAssignment(assignment);
      setFormData(assignment);
    } else {
      setEditingAssignment(null);
      setFormData({
        title: '',
        courseId: '',
        courseName: '',
        dueDate: '',
        maxMarks: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAssignment(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCourse = courses.find(c => c.id === parseInt(formData.courseId));
    const assignmentData = {
      ...formData,
      courseName: selectedCourse ? `${selectedCourse.code} - ${selectedCourse.name}` : formData.courseName
    };

    if (editingAssignment) {
      updateAssignment(editingAssignment.id, assignmentData);
    } else {
      addAssignment(assignmentData);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      deleteAssignment(id);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Listen for create assignment event from sidebar
  useEffect(() => {
    const handleOpenAssignmentModal = () => {
      handleOpenModal();
    };

    window.addEventListener('openAssignmentModal', handleOpenAssignmentModal);

    return () => {
      window.removeEventListener('openAssignmentModal', handleOpenAssignmentModal);
    };
  }, []);

  return (
    <div className="faculty-dashboard-page with-sidebar">
      <FacultySidebar faculty={facultyInfo} />

      <div className="dashboard-content">
        <div className="container">
          <div className="dashboard-header">
            <h1>Faculty Dashboard</h1>
          </div>

          {/* Faculty Info Card */}
          <div className="info-card faculty-info">
            <div className="faculty-avatar">👨‍🏫</div>
            <div className="faculty-details">
              <h2>{facultyInfo.name}</h2>
              <p>Employee ID: {facultyInfo.employeeId}</p>
              <p>{facultyInfo.designation} • {facultyInfo.department}</p>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            {/* My Courses */}
            <div className="dashboard-section">
              <h2>My Courses</h2>
              <div className="courses-list">
                {courses.map((course, index) => (
                  <div key={index} className="course-item">
                    <div className="course-info">
                      <h4>{course.code} - {course.name}</h4>
                      <p>Section {course.section} • {course.students} Students</p>
                    </div>
                    <button className="btn-manage">Manage</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="dashboard-section">
              <h2>Pending Assignments ({pendingTasks.length})</h2>
              <div className="tasks-list">
                {pendingTasks.length > 0 ? (
                  pendingTasks.map((assignment, index) => (
                    <div key={index} className="task-item">
                      <div className="task-info">
                        <h4>{assignment.title}</h4>
                        <p>{assignment.courseName}</p>
                        <p className="deadline">⏰ Due: {assignment.dueDate}</p>
                      </div>
                      <div className="task-actions">
                        <button className="btn-edit" onClick={() => handleOpenModal(assignment)}>
                          Edit
                        </button>
                        <button className="btn-delete-small" onClick={() => handleDelete(assignment.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-tasks">No pending assignments</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingAssignment ? 'Edit Assignment' : 'Create Assignment'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Assignment Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g., ML Project Report"
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseId">Select Course</label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxMarks">Maximum Marks</label>
            <input
              type="number"
              id="maxMarks"
              name="maxMarks"
              value={formData.maxMarks}
              onChange={handleInputChange}
              required
              placeholder="e.g., 100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Assignment instructions and requirements"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingAssignment ? 'Update Assignment' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FacultyDashboard;
