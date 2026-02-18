import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal/Modal';
import './Courses.css';

const Courses = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department: 'engineering',
    duration: '',
    degree: '',
    description: '',
    credits: ''
  });

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData(course);
    } else {
      setEditingCourse(null);
      setFormData({
        code: '',
        name: '',
        department: 'engineering',
        duration: '',
        degree: '',
        description: '',
        credits: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse(editingCourse.id, formData);
    } else {
      addCourse(formData);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(id);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const staticCourses = [
    {
      id: 1,
      name: 'Computer Science & Engineering',
      department: 'engineering',
      duration: '4 Years',
      degree: 'B.Tech',
      description: 'Advanced programming, AI, Machine Learning, and Software Development'
    },
    {
      id: 2,
      name: 'Business Administration',
      department: 'business',
      duration: '2 Years',
      degree: 'MBA',
      description: 'Strategic management, finance, marketing, and entrepreneurship'
    },
    {
      id: 3,
      name: 'Data Science',
      department: 'science',
      duration: '2 Years',
      degree: 'M.Sc',
      description: 'Big Data analytics, statistical modeling, and machine learning'
    },
    {
      id: 4,
      name: 'Electrical Engineering',
      department: 'engineering',
      duration: '4 Years',
      degree: 'B.Tech',
      description: 'Power systems, electronics, and renewable energy technologies'
    },
    {
      id: 5,
      name: 'Psychology',
      department: 'arts',
      duration: '3 Years',
      degree: 'B.A',
      description: 'Clinical psychology, behavioral science, and counseling'
    },
    {
      id: 6,
      name: 'Mechanical Engineering',
      department: 'engineering',
      duration: '4 Years',
      degree: 'B.Tech',
      description: 'Thermodynamics, robotics, and manufacturing technology'
    }
  ];

  // Combine static courses with user-added courses
  const allCourses = [...staticCourses, ...courses];
  
  const filteredCourses = selectedDepartment === 'all' 
    ? allCourses 
    : allCourses.filter(course => course.department === selectedDepartment);

  return (
    <div className="courses-page">
      <section className="courses-hero">
        <div className="container">
          <h1>Our Programs</h1>
          <p>Discover your path to success with our diverse range of courses</p>
        </div>
      </section>

      <section className="courses-content">
        <div className="container">
          <div className="courses-header">
            <div className="filter-section">
              <h3>Filter by Department</h3>
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${selectedDepartment === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedDepartment('all')}
                >
                  All Programs
                </button>
                <button 
                  className={`filter-btn ${selectedDepartment === 'engineering' ? 'active' : ''}`}
                  onClick={() => setSelectedDepartment('engineering')}
                >
                  Engineering
                </button>
                <button 
                  className={`filter-btn ${selectedDepartment === 'business' ? 'active' : ''}`}
                  onClick={() => setSelectedDepartment('business')}
                >
                  Business
                </button>
                <button 
                  className={`filter-btn ${selectedDepartment === 'science' ? 'active' : ''}`}
                  onClick={() => setSelectedDepartment('science')}
                >
                  Science
                </button>
                <button 
                  className={`filter-btn ${selectedDepartment === 'arts' ? 'active' : ''}`}
                  onClick={() => setSelectedDepartment('arts')}
                >
                  Arts
                </button>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              + Add New Course
            </button>
          </div>

          <div className="courses-grid">
            {filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <span className="course-degree">{course.degree}</span>
                  <span className="course-duration">{course.duration}</span>
                </div>
                <h3 className="course-name">{course.name}</h3>
                {course.code && <p className="course-code">{course.code}</p>}
                <p className="course-description">{course.description}</p>
                {courses.some(c => c.id === course.id) && (
                  <div className="course-actions">
                    <button className="btn btn-secondary" onClick={() => handleOpenModal(course)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(course.id)}>
                      Delete
                    </button>
                  </div>
                )}
                {!courses.some(c => c.id === course.id) && (
                  <button className="btn btn-primary">Learn More</button>
                )}
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="no-courses">
              <p>No courses found in this department.</p>
              <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                Add First Course
              </button>
            </div>
          )}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingCourse ? 'Edit Course' : 'Add New Course'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Course Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
              placeholder="e.g., CS301"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Course Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g, Data Structures"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
            >
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="science">Science</option>
              <option value="arts">Arts</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="degree">Degree</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
              required
              placeholder="e.g., B.Tech"
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              placeholder="e.g., 4 Years"
            />
          </div>

          <div className="form-group">
            <label htmlFor="credits">Credits</label>
            <input
              type="number"
              id="credits"
              name="credits"
              value={formData.credits}
              onChange={handleInputChange}
              placeholder="e.g., 4"
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
              placeholder="Brief description of the course"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingCourse ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Courses;
