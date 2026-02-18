import React, { createContext, useContext, useState, useEffect } from 'react';
// import api from '../services/api';
const BASE_URL = 'http://localhost:8080/api';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Students Data
  const [students, setStudents] = useState([]);

  // Faculty Data
  const [faculty, setFaculty] = useState([]);

  // Courses Data
  const [courses, setCourses] = useState([]);

  // Assignments Data
  const [assignments, setAssignments] = useState([]);

  // Submissions Data
  const [submissions, setSubmissions] = useState([]);

  // Attendance Data
  const [attendance, setAttendance] = useState([]);

  // Events Data (Still Mock for now as backend might not have it)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Campus Placement Drive 2026',
      date: '2026-03-15',
      endDate: '2026-03-20',
      description: 'Top companies visiting campus for recruitment. Register now!',
      type: 'placement',
      venue: 'Main Auditorium',
      organizer: 'Career Services'
    },
    {
      id: 2,
      title: 'Annual Tech Fest - InnoVision',
      date: '2026-04-05',
      endDate: '2026-04-07',
      description: 'Three days of innovation, workshops, and competitions.',
      type: 'event',
      venue: 'Campus Grounds',
      organizer: 'Student Council'
    }
  ]);

  // Grades Data
  const [grades, setGrades] = useState([]);

  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const studentsRes = await fetch(`${BASE_URL}/students/all`);
      if (studentsRes.ok) {
        const data = await studentsRes.json();
        setStudents(data);
      }

      // const facultyRes = await fetch(`${BASE_URL}/faculty/all`); 
      // if (facultyRes.ok) setFaculty(await facultyRes.json());

      const assignmentsRes = await fetch(`${BASE_URL}/assignments/all`);
      if (assignmentsRes.ok) {
        const data = await assignmentsRes.json();
        setAssignments(data);
      }

      const attendanceRes = await fetch(`${BASE_URL}/attendance/all`);
      if (attendanceRes.ok) {
        const data = await attendanceRes.json();
        setAttendance(data);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Login Functions
  const loginStudent = async (rollNo, password) => {
    try {
      const response = await fetch(`${BASE_URL}/students/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rollNo, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
        setUserType('student');

        // Fetch student specific data
        try {
          const assignmentsRes = await fetch(`${BASE_URL}/assignments/student/${data.id}`);
          if (assignmentsRes.ok) {
            const assignData = await assignmentsRes.json();
            setAssignments(assignData);
          }

          const attendanceRes = await fetch(`${BASE_URL}/attendance/student/${data.id}`);
          if (attendanceRes.ok) {
            const attendData = await attendanceRes.json();
            setAttendance(attendData);
          }
        } catch (subError) {
          console.error("Error fetching student details", subError);
        }

        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
    return false;
  };

  const loginFaculty = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/faculty/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const text = await response.text();
        if (text === "Login Successful") {
          // Mock setting user since backend doesn't return user object yet
          setCurrentUser({ email, name: "Faculty Member", role: "faculty" });
          setUserType('faculty');
          return true;
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
    return false;
  };

  // CRUD Operations (Mocked for now mostly, updated locally)
  // ... (Keep existing CRUD functions but maybe update them to call API later)

  // CRUD Operations for Students
  const addStudent = (student) => {
    // const newStudent = { ...student, id: Date.now() };
    // setStudents([...students, newStudent]);
    // return newStudent;
    // Call API
    // return api.post('/students/register', student).then(res => {
    //    setStudents([...students, res.data]);
    //    return res.data;
    // });
    const newStudent = { ...student, id: Date.now() };
    setStudents([...students, newStudent]);
    return newStudent;
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedStudent } : s));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  // CRUD Operations for Faculty
  const addFaculty = (facultyMember) => {
    const newFaculty = { ...facultyMember, id: Date.now() };
    setFaculty([...faculty, newFaculty]);
    return newFaculty;
  };

  const updateFaculty = (id, updatedFaculty) => {
    setFaculty(faculty.map(f => f.id === id ? { ...f, ...updatedFaculty } : f));
  };

  const deleteFaculty = (id) => {
    setFaculty(faculty.filter(f => f.id !== id));
  };

  // CRUD Operations for Courses
  const addCourse = (course) => {
    const newCourse = { ...course, id: Date.now() };
    setCourses([...courses, newCourse]);
    return newCourse;
  };

  const updateCourse = (id, updatedCourse) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updatedCourse } : c));
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // CRUD Operations for Assignments
  const addAssignment = (assignment) => {
    const newAssignment = { ...assignment, id: Date.now(), status: 'pending' };
    setAssignments([...assignments, newAssignment]);
    return newAssignment;
  };

  const updateAssignment = (id, updatedAssignment) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, ...updatedAssignment } : a));
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  // CRUD Operations for Submissions
  const addSubmission = (submission) => {
    const newSubmission = { ...submission, id: Date.now() };
    setSubmissions([...submissions, newSubmission]);
    return newSubmission;
  };

  const updateSubmission = (id, updatedSubmission) => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, ...updatedSubmission } : s));
  };

  const deleteSubmission = (id) => {
    setSubmissions(submissions.filter(s => s.id !== id));
  };

  // CRUD Operations for Attendance
  const addAttendance = (attendanceRecord) => {
    const newRecord = { ...attendanceRecord, id: Date.now() };
    setAttendance([...attendance, newRecord]);
    return newRecord;
  };

  const updateAttendance = (id, updatedAttendance) => {
    setAttendance(attendance.map(a => a.id === id ? { ...a, ...updatedAttendance } : a));
  };

  const deleteAttendance = (id) => {
    setAttendance(attendance.filter(a => a.id !== id));
  };

  // CRUD Operations for Events
  const addEvent = (event) => {
    const newEvent = { ...event, id: Date.now() };
    setEvents([...events, newEvent]);
    return newEvent;
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  // CRUD Operations for Grades
  const addGrade = (grade) => {
    const newGrade = { ...grade, id: Date.now() };
    setGrades([...grades, newGrade]);
    return newGrade;
  };

  const updateGrade = (id, updatedGrade) => {
    setGrades(grades.map(g => g.id === id ? { ...g, ...updatedGrade } : g));
  };

  const deleteGrade = (id) => {
    setGrades(grades.filter(g => g.id !== id));
  };

  const value = {
    // Data
    students,
    faculty,
    courses,
    assignments,
    submissions,
    attendance,
    events,
    grades,
    currentUser,
    userType,
    loginStudent,
    loginFaculty,
    // Student CRUD
    addStudent,
    updateStudent,
    deleteStudent,
    // Faculty CRUD
    addFaculty,
    updateFaculty,
    deleteFaculty,
    // Course CRUD
    addCourse,
    updateCourse,
    deleteCourse,
    // Assignment CRUD
    addAssignment,
    updateAssignment,
    deleteAssignment,
    // Submission CRUD
    addSubmission,
    updateSubmission,
    deleteSubmission,
    // Attendance CRUD
    addAttendance,
    updateAttendance,
    deleteAttendance,
    // Event CRUD
    addEvent,
    updateEvent,
    deleteEvent,
    // Grade CRUD
    addGrade,
    updateGrade,
    deleteGrade
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
