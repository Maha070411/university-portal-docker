import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal/Modal';
import './AssignmentUpload.css';

const AssignmentUpload = () => {
  const { assignments, submissions, addSubmission, updateSubmission, deleteSubmission } = useData();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [formData, setFormData] = useState({
    assignmentId: '',
    studentId: '',
    fileName: '',
    submittedDate: '',
    grade: '',
    marks: '',
    feedback: ''
  });

  // Filter pending assignments (those without submissions)
  const submittedAssignmentIds = submissions.map(s => s.assignmentId);
  const pendingAssignments = assignments.filter(a => !submittedAssignmentIds.includes(a.id)).slice(0, 3);
  
  // Get submitted assignments
  const submittedAssignments = submissions.map(sub => {
    const assignment = assignments.find(a => a.id === sub.assignmentId);
    return {
      ...sub,
      title: assignment?.title || 'Assignment',
      course: assignment?.courseId || 'Course'
    };
  });

  // Use static data as fallback
  const staticAssignments = [
    {
      id: 1,
      title: 'Machine Learning Project Report',
      course: 'CS405 - Machine Learning',
      dueDate: '2026-02-25',
      status: 'pending',
      maxMarks: 100
    },
    {
      id: 2,
      title: 'Database Design Schema',
      course: 'CS301 - Database Systems',
      dueDate: '2026-02-20',
      status: 'urgent',
      maxMarks: 50
    },
    {
      id: 3,
      title: 'React Application Development',
      course: 'CS404 - Web Development',
      dueDate: '2026-03-01',
      status: 'pending',
      maxMarks: 75
    }
  ];

  const staticSubmittedAssignments = [
    {
      id: 1,
      title: 'Data Structures Implementation',
      course: 'CS301',
      submittedDate: '2026-02-10',
      grade: 'A',
      marks: '45/50',
      feedback: 'Excellent implementation. Good code quality.'
    },
    {
      id: 2,
      title: 'Algorithm Analysis Report',
      course: 'CS502',
      submittedDate: '2026-02-08',
      grade: 'A-',
      marks: '42/50',
      feedback: 'Well analyzed. Could improve time complexity discussion.'
    }
  ];

  const handleOpenModal = (assignment, submission = null) => {
    setSelectedAssignment(assignment);
    if (submission) {
      setEditingSubmission(submission);
      setFormData({
        assignmentId: submission.assignmentId,
        studentId: submission.studentId,
        fileName: submission.fileName,
        submittedDate: submission.submittedDate,
        grade: submission.grade || '',
        marks: submission.marks || '',
        feedback: submission.feedback || ''
      });
    } else {
      setEditingSubmission(null);
      setFormData({
        assignmentId: assignment?.id || '',
        studentId: 'STU2022001',
        fileName: selectedFile?.name || '',
        submittedDate: new Date().toISOString().split('T')[0],
        grade: '',
        marks: '',
        feedback: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
    setEditingSubmission(null);
    setSelectedFile(null);
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
    if (editingSubmission) {
      updateSubmission(editingSubmission.id, formData);
    } else {
      addSubmission({
        ...formData,
        fileName: selectedFile?.name || formData.fileName
      });
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      deleteSubmission(id);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('');
      setAiFeedback(null);
    }
  };

  const simulateAIAnalysis = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: 85,
          strengths: [
            'Well-structured code with proper documentation',
            'Follows best practices and coding standards',
            'Good error handling implementation'
          ],
          improvements: [
            'Consider adding more unit tests for edge cases',
            'Some functions could be optimized for better performance',
            'Add more inline comments for complex logic'
          ],
          plagiarismCheck: 'No plagiarism detected',
          readabilityScore: 92,
          suggestions: [
            'Great work! Your submission meets most requirements.',
            'Focus on improving test coverage in future assignments.',
            'Consider using more descriptive variable names in some sections.'
          ]
        });
      }, 3000);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first');
      return;
    }

    setUploadStatus('Uploading...');
    setIsAnalyzing(true);

    // Simulate upload and AI analysis
    setTimeout(async () => {
      setUploadStatus('Analyzing with AI...');
      const feedback = await simulateAIAnalysis();
      setAiFeedback(feedback);
      setUploadStatus('Upload successful! AI feedback generated.');
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="assignment-page">
      <div className="container">
        <h1>Assignment Upload</h1>

        {/* Pending Assignments */}
        <div className="assignments-section">
          <h2>Pending Assignments</h2>
          <div className="assignments-grid">
            {(pendingAssignments.length > 0 ? pendingAssignments : staticAssignments).map((assignment) => (
              <div key={assignment.id} className={`assignment-card ${assignment.status}`}>
                <div className="assignment-header">
                  <h3>{assignment.title}</h3>
                  <span className={`status-tag ${assignment.status}`}>
                    {assignment.status === 'urgent' ? '⚠️ Urgent' : '📌 Pending'}
                  </span>
                </div>
                <p className="course-name">{assignment.course || assignment.courseId}</p>
                <p className="due-date">📅 Due: {assignment.dueDate}</p>
                <p className="max-marks">Maximum Marks: {assignment.maxMarks}</p>
                <button 
                  className="btn btn-primary upload-btn" 
                  onClick={() => handleOpenModal(assignment)}
                >
                  Upload Submission
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <h2>📤 Upload Assignment</h2>
          <div className="upload-area">
            <div className="file-input-wrapper">
              <input
                type="file"
                id="fileInput"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.zip"
              />
              <label htmlFor="fileInput" className="file-input-label">
                <span className="upload-icon">📎</span>
                <span>{selectedFile ? selectedFile.name : 'Click to select file'}</span>
                <span className="file-hint">Supported: PDF, DOC, DOCX, ZIP (Max 10MB)</span>
              </label>
            </div>

            {selectedFile && (
              <div className="file-info">
                <p>Selected: {selectedFile.name}</p>
                <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}

            <button 
              className="btn btn-primary upload-submit-btn" 
              onClick={handleUpload}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Upload & Get AI Feedback'}
            </button>

            {uploadStatus && (
              <div className={`upload-status ${uploadStatus.includes('successful') ? 'success' : ''}`}>
                {uploadStatus}
              </div>
            )}
          </div>

          {/* AI Feedback Display */}
          {aiFeedback && (
            <div className="ai-feedback-section">
              <div className="feedback-header">
                <h3>🤖 AI-Powered Feedback</h3>
                <div className="ai-score">
                  Score: <span className="score-value">{aiFeedback.score}/100</span>
                </div>
              </div>

              <div className="feedback-grid">
                <div className="feedback-card strengths">
                  <h4>✅ Strengths</h4>
                  <ul>
                    {aiFeedback.strengths.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="feedback-card improvements">
                  <h4>💡 Areas for Improvement</h4>
                  <ul>
                    {aiFeedback.improvements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="feedback-metrics">
                <div className="metric">
                  <span className="metric-label">Plagiarism Check:</span>
                  <span className="metric-value success">✓ {aiFeedback.plagiarismCheck}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Readability Score:</span>
                  <span className="metric-value">{aiFeedback.readabilityScore}/100</span>
                </div>
              </div>

              <div className="ai-suggestions">
                <h4>📝 AI Suggestions</h4>
                {aiFeedback.suggestions.map((suggestion, index) => (
                  <p key={index}>{suggestion}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submitted Assignments */}
        <div className="submitted-section">
          <h2>Previously Submitted</h2>
          <div className="submitted-list">
            {(submittedAssignments.length > 0 ? submittedAssignments : staticSubmittedAssignments).map((assignment) => (
              <div key={assignment.id} className="submitted-card">
                <div className="submitted-info">
                  <h3>{assignment.title}</h3>
                  <p>{assignment.course}</p>
                  <p className="submitted-date">Submitted: {assignment.submittedDate}</p>
                  {assignment.fileName && <p className="file-name">File: {assignment.fileName}</p>}
                </div>
                <div className="submitted-grade">
                  {assignment.grade && <div className="grade-display">{assignment.grade}</div>}
                  {assignment.marks && <div className="marks-display">{assignment.marks}</div>}
                  {assignment.feedback && <p className="teacher-feedback">{assignment.feedback}</p>}
                  {assignment.id && !assignment.id.toString().startsWith('static') && (
                    <div className="submission-actions">
                      <button className="btn-edit-small" onClick={() => handleOpenModal(null, assignment)}>
                        Edit
                      </button>
                      <button className="btn-delete-small" onClick={() => handleDelete(assignment.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingSubmission ? 'Edit Submission' : 'Submit Assignment'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="assignmentId">Assignment</label>
            <input
              type="text"
              id="assignmentId"
              name="assignmentId"
              value={selectedAssignment?.title || formData.assignmentId}
              disabled
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="fileName">File Name</label>
            <input
              type="text"
              id="fileName"
              name="fileName"
              value={formData.fileName}
              onChange={handleInputChange}
              required
              placeholder="e.g., assignment.pdf"
            />
          </div>

          <div className="form-group">
            <label htmlFor="submittedDate">Submission Date</label>
            <input
              type="date"
              id="submittedDate"
              name="submittedDate"
              value={formData.submittedDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="grade">Grade (Optional)</label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              placeholder="e.g., A"
            />
          </div>

          <div className="form-group">
            <label htmlFor="marks">Marks (Optional)</label>
            <input
              type="text"
              id="marks"
              name="marks"
              value={formData.marks}
              onChange={handleInputChange}
              placeholder="e.g., 45/50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Feedback (Optional)</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              placeholder="Teacher feedback..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingSubmission ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssignmentUpload;
