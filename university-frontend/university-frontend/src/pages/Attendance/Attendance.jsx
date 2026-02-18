import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal/Modal';
import './Attendance.css';

const Attendance = ({ canMark = false, showTips = true }) => {
  const { attendance, addAttendance, updateAttendance, deleteAttendance, courses } = useData();
  const [selectedCourse, setSelectedCourse] = useState('CS301'); // stores course *code* like 'CS301'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    date: '',
    status: 'present'
  });

  const handleOpenModal = (attendanceRecord = null) => {
    if (attendanceRecord) {
      setEditingAttendance(attendanceRecord);
      setFormData({
        studentId: attendanceRecord.studentId,
        courseId: attendanceRecord.courseId,
        date: attendanceRecord.date,
        status: attendanceRecord.status
      });
    } else {
      const selectedCourseObj = courses.find(c => c.code === selectedCourse) || courses[0];
      setEditingAttendance(null);
      setFormData({
        studentId: 'STU2022001',
        courseId: selectedCourseObj ? selectedCourseObj.id : '',
        date: new Date().toISOString().split('T')[0],
        status: 'present'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAttendance(null);
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
    const selectedCourseObj = courses.find(c => c.id === Number(formData.courseId));

    const attendanceRecord = {
      ...formData,
      courseId: selectedCourseObj ? selectedCourseObj.id : formData.courseId,
      courseCode: selectedCourseObj ? selectedCourseObj.code : selectedCourse,
      courseName: selectedCourseObj ? selectedCourseObj.name : undefined
    };

    if (editingAttendance) {
      updateAttendance(editingAttendance.id, attendanceRecord);
    } else {
      addAttendance(attendanceRecord);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      deleteAttendance(id);
    }
  };

  // Get attendance data for selected course (match by course code)
  const courseAttendance = attendance.filter(a => a.courseCode === selectedCourse);
  const totalClasses = courseAttendance.length;
  const attended = courseAttendance.filter(a => a.status === 'present').length;
  const percentage = totalClasses > 0 ? (attended / totalClasses) * 100 : 0;

  const attendanceData = {
    CS301: {
      courseName: 'Data Structures',
      totalClasses: 45,
      attended: 40,
      percentage: 88.9,
      classes: [
        { date: '2026-02-10', status: 'present' },
        { date: '2026-02-08', status: 'present' },
        { date: '2026-02-06', status: 'absent' },
        { date: '2026-02-04', status: 'present' },
        { date: '2026-02-01', status: 'present' }
      ]
    },
    CS405: {
      courseName: 'Machine Learning',
      totalClasses: 42,
      attended: 39,
      percentage: 92.9,
      classes: [
        { date: '2026-02-10', status: 'present' },
        { date: '2026-02-08', status: 'present' },
        { date: '2026-02-06', status: 'present' },
        { date: '2026-02-04', status: 'absent' },
        { date: '2026-02-01', status: 'present' }
      ]
    },
    CS502: {
      courseName: 'Advanced Algorithms',
      totalClasses: 38,
      attended: 35,
      percentage: 92.1,
      classes: [
        { date: '2026-02-09', status: 'present' },
        { date: '2026-02-07', status: 'present' },
        { date: '2026-02-05', status: 'absent' },
        { date: '2026-02-03', status: 'present' },
        { date: '2026-02-01', status: 'present' }
      ]
    }
  };

  // Use actual data or fallback to static sample data
  const currentCourse = courseAttendance.length > 0 ? {
    courseName:
      courses.find(c => c.code === selectedCourse)?.name ||
      attendanceData[selectedCourse]?.courseName ||
      'Data Structures',
    totalClasses: totalClasses,
    attended: attended,
    percentage: percentage,
    // keep full records so we can edit/delete using their ids
    classes: courseAttendance.slice(0, 5)
  } : attendanceData[selectedCourse];

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 75) return 'good';
    if (percentage >= 65) return 'warning';
    return 'danger';
  };

  return (
    <div className="attendance-page">
      <div className="container">
        <div className="attendance-header">
          <h1>Attendance</h1>
          {canMark && (
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              + Mark Attendance
            </button>
          )}
        </div>

        {/* Course Selector */}
        <div className="course-selector">
          <h3>Select Course</h3>
          <div className="course-buttons">
            {Object.keys(attendanceData).map((courseCode) => (
              <button
                key={courseCode}
                className={`course-btn ${selectedCourse === courseCode ? 'active' : ''}`}
                onClick={() => setSelectedCourse(courseCode)}
              >
                {courseCode}
                <span>{attendanceData[courseCode].courseName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="attendance-summary">
          <div className="summary-header">
            <h2>{selectedCourse} - {currentCourse.courseName}</h2>
          </div>

          <div className="summary-stats">
            <div className="stat-card">
              <div className="stat-label">Total Classes</div>
              <div className="stat-value">{currentCourse.totalClasses}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Attended</div>
              <div className="stat-value success">{currentCourse.attended}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Missed</div>
              <div className="stat-value danger">
                {currentCourse.totalClasses - currentCourse.attended}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Percentage</div>
              <div className={`stat-value ${getAttendanceStatus(currentCourse.percentage)}`}>
                {currentCourse.percentage.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-label">
              <span>Attendance Progress</span>
              <span className="progress-text">{currentCourse.percentage.toFixed(1)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${getAttendanceStatus(currentCourse.percentage)}`}
                style={{ width: `${currentCourse.percentage}%` }}
              ></div>
            </div>
            <div className="progress-info">
              {currentCourse.percentage >= 75 ? (
                <p className="success-message">✓ Your attendance is healthy!</p>
              ) : (
                <p className="warning-message">⚠️ Attendance below 75% requirement</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="recent-attendance">
          <h2>Recent Attendance</h2>
          <div className="attendance-list">
            {currentCourse.classes && currentCourse.classes.length > 0 ? (
              currentCourse.classes.map((classItem, index) => (
                <div key={classItem.id || index} className={`attendance-item ${classItem.status}`}>
                  <div className="attendance-date">
                    <span className="date-icon">📅</span>
                    <span>{classItem.date}</span>
                  </div>
                  <div className="attendance-actions">
                    <div className={`status-badge ${classItem.status}`}>
                      {classItem.status === 'present' ? '✓ Present' : '✗ Absent'}
                    </div>
                    {canMark && classItem.id && (
                      <div className="action-buttons">
                        <button className="btn-edit-small" onClick={() => handleOpenModal(classItem)}>
                          Edit
                        </button>
                        <button className="btn-delete-small" onClick={() => handleDelete(classItem.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-attendance">
                {canMark
                  ? 'No attendance records found. Click "Mark Attendance" to add.'
                  : 'No attendance records available.'}
              </p>
            )}
          </div>
        </div>

        {/* Tips (hidden on faculty portal when showTips is false) */}
        {showTips && (
          <div className="attendance-tips">
            <h3>💡 Attendance Tips</h3>
            <ul>
              <li>Maintain at least 75% attendance to be eligible for exams</li>
              <li>Regular attendance improves academic performance</li>
              <li>Contact your instructor if you have valid reasons for absence</li>
            </ul>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingAttendance ? 'Edit Attendance' : 'Mark Attendance'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              required
              placeholder="e.g., STU2022001"
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseId">Course</label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingAttendance ? 'Update' : 'Mark'} Attendance
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Attendance;
