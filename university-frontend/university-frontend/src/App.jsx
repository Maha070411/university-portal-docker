import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import StudentLogin from './pages/StudentLogin/StudentLogin';
import FacultyLogin from './pages/FacultyLogin/FacultyLogin';
import AboutUs from './pages/AboutUs/AboutUs';
import Courses from './pages/Courses/Courses';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import StudentAttendance from './pages/StudentAttendance/StudentAttendance';
import StudentAssignments from './pages/StudentAssignments/StudentAssignments';
import FacultyDashboard from './pages/FacultyDashboard/FacultyDashboard';
import FacultyAttendance from './pages/FacultyAttendance/FacultyAttendance';
import Attendance from './pages/Attendance/Attendance';
import AssignmentUpload from './pages/AssignmentUpload/AssignmentUpload';
import './App.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          {/* Auth Routes - No Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          
          {/* Main Routes with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="courses" element={<Courses />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="assignment-upload" element={<AssignmentUpload />} />
          </Route>
          
          {/* Dashboard Routes - No Layout (they have their own sidebars) */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-attendance" element={<StudentAttendance />} />
          <Route path="/student-assignments" element={<StudentAssignments />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty-attendance" element={<FacultyAttendance />} />
          <Route path="/student-portal" element={<StudentDashboard />} />
          <Route path="/faculty-portal" element={<FacultyDashboard />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
