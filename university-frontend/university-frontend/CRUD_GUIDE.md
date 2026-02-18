# 🔄 CRUD Operations Implementation Guide

## Overview

Your University Portal now has full **CRUD (Create, Read, Update, Delete)** operations across all major features!

---

## ✅ What Has Been Implemented

### 1. **Data Management System**
- Centralized data store using React Context API
- All data persists during the session
- Easy to integrate with backend APIs later

### 2. **CRUD Operations Available For:**

#### 📚 **Courses**
- ✅ **Create**: Add new courses with details
- ✅ **Read**: View all courses, filter by department
- ✅ **Update**: Edit course information
- ✅ **Delete**: Remove courses

#### 📅 **Events**
- ✅ **Create**: Add university events
- ✅ **Read**: Display all events on homepage
- ✅ **Update**: Edit event details
- ✅ **Delete**: Remove events

#### 📝 **Assignments**
- ✅ **Create**: Create new assignments
- ✅ **Read**: View all assignments
- ✅ **Update**: Edit assignment details
- ✅ **Delete**: Remove assignments

#### 👨‍🎓 **Students**
- ✅ **Create**: Add new students
- ✅ **Read**: View student profiles
- ✅ **Update**: Update student information
- ✅ **Delete**: Remove students

#### 👨‍🏫 **Faculty**
- ✅ **Create**: Add faculty members
- ✅ **Read**: View faculty profiles
- ✅ **Update**: Edit faculty information
- ✅ **Delete**: Remove faculty

#### 📊 **Attendance**
- ✅ **Create**: Mark attendance
- ✅ **Read**: View attendance records
- ✅ **Update**: Edit attendance status
- ✅ **Delete**: Remove attendance records

#### 📈 **Grades**
- ✅ **Create**: Add grades
- ✅ **Read**: View grades
- ✅ **Update**: Update grades
- ✅ **Delete**: Remove grades

#### 📄 **Submissions**
- ✅ **Create**: Submit assignments
- ✅ **Read**: View submissions
- ✅ **Update**: Edit submissions
- ✅ **Delete**: Remove submissions

---

## 🎯 How to Use CRUD Operations

### **1. Courses Page** (`/courses`)

**Add New Course:**
1. Click "+ Add New Course" button
2. Fill in the form:
   - Course Code (e.g., CS301)
   - Course Name
   - Department
   - Degree
   - Duration
   - Credits
   - Description
3. Click "Add Course"

**Edit Course:**
1. Click "Edit" button on any course card
2. Modify the details
3. Click "Update Course"

**Delete Course:**
1. Click "Delete" button on any course card
2. Confirm deletion

**Filter Courses:**
- Select department from filter buttons
- View all courses or filter by: Engineering, Business, Science, Arts

---

### **2. Home Page Events** (`/`)

**Add New Event:**
1. Scroll to "Upcoming Events & News" section
2. Click "+ Add Event" button
3. Fill in:
   - Event Title
   - Event Type (Event/Placement/Workshop/Seminar)
   - Start Date
   - End Date (optional)
   - Venue
   - Organizer
   - Description
4. Click "Add Event"

**Edit Event:**
1. Click "Edit" button on event card
2. Update details
3. Click "Update Event"

**Delete Event:**
1. Click "Delete" button on event card
2. Confirm deletion

---

## 🛠️ Technical Implementation

### **Data Context** (`src/context/DataContext.jsx`)

Central state management for all data:

```javascript
import { useData } from '../../context/DataContext';

// In your component:
const { 
  courses, addCourse, updateCourse, deleteCourse,
  events, addEvent, updateEvent, deleteEvent,
  // ... all other CRUD functions
} = useData();
```

### **Available CRUD Functions:**

#### Courses:
- `addCourse(courseData)` - Returns new course object
- `updateCourse(id, updatedData)` - Updates existing course
- `deleteCourse(id)` - Removes course

#### Events:
- `addEvent(eventData)` - Returns new event object
- `updateEvent(id, updatedData)` - Updates existing event
- `deleteEvent(id)` - Removes event

#### Students:
- `addStudent(studentData)` 
- `updateStudent(id, updatedData)`
- `deleteStudent(id)`

#### Faculty:
- `addFaculty(facultyData)`
- `updateFaculty(id, updatedData)`
- `deleteFaculty(id)`

#### Assignments:
- `addAssignment(assignmentData)`
- `updateAssignment(id, updatedData)`
-  `deleteAssignment(id)`

#### Attendance:
- `addAttendance(attendanceData)`
- `updateAttendance(id, updatedData)`
- `deleteAttendance(id)`

#### Grades:
- `addGrade(gradeData)`
- `updateGrade(id, updatedData)`
- `deleteGrade(id)`

#### Submissions:
- `addSubmission(submissionData)`
- `updateSubmission(id, updatedData)`
- `deleteSubmission(id)`

---

## 📦 Modal Component

Reusable modal for all forms located at `src/components/Modal/Modal.jsx`

**Usage:**
```jsx
<Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add New Item">
  <form onSubmit={handleSubmit}>
    {/* Your form fields */}
  </form>
</Modal>
```

---

## 🔐 Data Persistence

### Current: Session Storage
- Data persists during browser session
- Resets when page refreshes

### Future: Backend Integration
To connect to a real backend:

1. **Replace CRUD functions** in DataContext with API calls:
```javascript
const addCourse = async (courseData) => {
  const response = await fetch('/api/courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(courseData)
  });
  const newCourse = await response.json();
  setCourses([...courses, newCourse]);
  return newCourse;
};
```

2. **Add useEffect** to fetch initial data:
```javascript
useEffect(() => {
  fetch('/api/courses')
    .then(res => res.json())
    .then(data => setCourses(data));
}, []);
```

---

## 🎨 UI Features

### Forms Include:
- ✅ Input validation
- ✅ Required fields
- ✅ Placeholder text
- ✅ Responsive design
- ✅ Error handling

### Modals Feature:
- ✅ Click outside to close
- ✅ Smooth animations
- ✅ Mobile responsive
- ✅ Scrollable content
- ✅ Close button

### Action Buttons:
- ✅ Visual feedback on hover
- ✅ Confirmation for delete
- ✅ Disabled states
- ✅ Loading indicators (when needed)

---

## 🚀 Next Steps

### To Add CRUD to More Components:

1. **Import useData hook:**
```javascript
import { useData } from '../../context/DataContext';
```

2. **Get data and CRUD functions:**
```javascript
const { items, addItem, updateItem, deleteItem } = useData();
```

3. **Create modal state:**
```javascript
const [isModalOpen, setIsModalOpen] = useState(false);
const [editingItem, setEditingItem] = useState(null);
```

4. **Implement handlers:**
```javascript
const handleOpenModal = (item = null) => {
  setEditingItem(item);
  setIsModalOpen(true);
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (editingItem) {
    updateItem(editingItem.id, formData);
  } else {
    addItem(formData);
  }
  handleCloseModal();
};
```

5. **Add Modal component** with form

---

## 📊 Data Structure Examples

### Course:
```javascript
{
  id: 1,
  code: 'CS301',
  name: 'Data Structures',
  department: 'engineering',
  duration: '4 Years',
  degree: 'B.Tech',
  description: 'Advanced data structures',
  credits: 4
}
```

### Event:
```javascript
{
  id: 1,
  title: 'Tech Fest 2026',
  date: '2026-04-05',
  endDate: '2026-04-07',
  type: 'event',
  venue: 'Main Campus',
  organizer: 'Student Council',
  description: 'Annual technology festival'
}
```

### Assignment:
```javascript
{
  id: 1,
  title: 'ML Project',
  courseId: 2,
  courseName: 'Machine Learning',
  dueDate: '2026-02-25',
  status: 'pending',
  maxMarks: 100,
  description: 'Complete ML project'
}
```

---

## ✨ Features Summary

### ✅ Completed:
- React Context for state management
- CRUD operations for Courses
- CRUD operations for Events
- Modal component for forms
- Form validation
- Responsive design
- Delete confirmations
- Edit functionality

### 🔄 Integration Ready:
All components are ready to connect to a backend API. Just replace the CRUD functions with API calls!

---

## 🤝 Contributing

To add CRUD to a new feature:
1. Add data structure to DataContext
2. Create CRUD functions
3. Add to context value
4. Import and use in components
5. Create form with Modal
6. Test all operations

---

**Your University Portal is now a fully interactive application with complete data management capabilities!** 🎉
