import React from 'react';
import { useData } from '../../context/DataContext';
import FacultySidebar from '../../components/FacultySidebar/FacultySidebar';
import Attendance from '../Attendance/Attendance';
import './FacultyAttendance.css';

const FacultyAttendance = () => {
  const { faculty = [] } = useData();

  const currentFaculty = faculty[0] || {
    name: 'Dr. Sarah Johnson',
    employeeId: 'FAC2019045',
    department: 'Computer Science',
    designation: 'Associate Professor'
  };

  return (
    <div className="dashboard-page with-sidebar">
      <FacultySidebar faculty={currentFaculty} />
      <div className="dashboard-content">
        <Attendance canMark={true} showTips={false} />
      </div>
    </div>
  );
};

export default FacultyAttendance;
