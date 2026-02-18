import React from 'react';
import { useData } from '../../context/DataContext';
import StudentSidebar from '../../components/StudentSidebar/StudentSidebar';
import Attendance from '../Attendance/Attendance';
import './StudentAttendance.css';

const StudentAttendance = () => {
  const { students } = useData();

  const currentStudent = students[0] || {
    id: 'STU2022001',
    name: 'John Smith',
    rollNo: 'CS2022001',
    program: 'B.Tech Computer Science',
    semester: '6th Semester',
    cgpa: '8.5'
  };

  return (
    <div className="dashboard-page with-sidebar">
      <StudentSidebar student={currentStudent} />
      <div className="dashboard-content">
        <Attendance />
      </div>
    </div>
  );
};

export default StudentAttendance;
