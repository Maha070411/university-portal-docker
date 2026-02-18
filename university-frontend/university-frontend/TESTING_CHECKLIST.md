# Testing Checklist - University Portal CRUD Operations

## 🧪 Complete Testing Guide

Use this checklist to verify all CRUD operations are working correctly.

---

## ✅ Pre-Testing Setup

- [ ] Run `npm install` (if not already done)
- [ ] Run `npm run dev`
- [ ] Open browser to `http://localhost:3000` (or shown port)
- [ ] Verify home page loads without errors

---

## 📄 Page-by-Page Testing

### 1️⃣ **Home Page** - Event Management

**Location:** `/` (Home)

#### Create Event ✅
- [ ] Click "Add Event" button
- [ ] Modal opens with form
- [ ] Fill in all fields:
  - Title: "Tech Conference"
  - Type: Select "Technical"
  - Date: Select today's date
  - Description: "Annual tech conference"
  - Location: "Main Auditorium"
- [ ] Click "Add Event"
- [ ] Modal closes
- [ ] New event appears in "Upcoming Events" section

#### Edit Event ✅
- [ ] Find the event you just created
- [ ] Click "Edit" button on that event
- [ ] Modal opens with pre-filled data
- [ ] Change title to "Tech Conference 2026"
- [ ] Click "Update Event"
- [ ] Event title updates in the list

#### Delete Event ✅
- [ ] Click "Delete" button on the event
- [ ] Confirmation dialog appears
- [ ] Click "OK"
- [ ] Event disappears from list

---

### 2️⃣ **Courses Page** - Course Management

**Location:** `/courses`

#### Create Course ✅
- [ ] Navigate to Courses page
- [ ] Click "Add Course" button
- [ ] Fill in all fields:
  - Course Name: "Introduction to AI"
  - Course Code: "CS601"
  - Credits: "4"
  - Department: "Computer Science"
  - Description: "Learn AI fundamentals"
  - Instructor: "Dr. Smith"
  - Schedule: "Mon, Wed 10:00 AM"
- [ ] Click "Add Course"
- [ ] New course appears in list

#### Filter Courses ✅
- [ ] Click "Computer Science" department button
- [ ] Only CS courses show
- [ ] Click "All Departments"
- [ ] All courses visible again

#### Edit Course ✅
- [ ] Find your created course
- [ ] Click "Edit" button
- [ ] Change credits to "3"
- [ ] Click "Update Course"
- [ ] Credits update in display

#### Delete Course ✅
- [ ] Click "Delete" button
- [ ] Confirm deletion
- [ ] Course removed from list

---

### 3️⃣ **Faculty Dashboard** - Assignment Management

**Location:** `/faculty-dashboard`

#### Create Assignment ✅
- [ ] Navigate to Faculty Dashboard
- [ ] Click "Create Assignment" in Quick Actions
- [ ] Fill form:
  - Title: "AI Project Proposal"
  - Course: Select any course from dropdown
  - Due Date: Select future date
  - Max Marks: "100"
  - Description: "Submit your AI project proposal"
- [ ] Click "Create Assignment"
- [ ] Assignment appears in "Pending Tasks"

#### Edit Assignment ✅
- [ ] Click "Edit" on your assignment
- [ ] Change max marks to "150"
- [ ] Update
- [ ] Marks updated

#### Delete Assignment ✅
- [ ] Click "Delete" on assignment
- [ ] Confirm
- [ ] Assignment removed

---

### 4️⃣ **Student Dashboard** - Profile Management

**Location:** `/student-dashboard`

#### Edit Profile ✅
- [ ] Navigate to Student Dashboard
- [ ] Click "✏️ Edit Profile" button
- [ ] Modal opens with current info
- [ ] Change:
  - Name: Update to new name
  - Email: Update email
  - Phone: Update phone number
  - Semester: Change semester
- [ ] Click "Update Profile"
- [ ] Info card updates with new data

#### Verify Dynamic Data ✅
- [ ] Check "Recent Grades" section shows grades from context
- [ ] Check "Upcoming Assignments" shows pending assignments

---

### 5️⃣ **Attendance Page** - Attendance Management

**Location:** `/attendance`

#### Mark Attendance ✅
- [ ] Navigate to Attendance page
- [ ] Click "Mark Attendance" button
- [ ] Fill form:
  - Student ID: "STU2022001"
  - Course: Select from dropdown
  - Date: Select today
  - Status: "Present"
- [ ] Click "Mark Attendance"
- [ ] New record appears in list
- [ ] Attendance percentage updates

#### Edit Attendance ✅
- [ ] Click "Edit" on attendance record
- [ ] Change status to "Absent"
- [ ] Update
- [ ] Status badge changes to red "✗ Absent"
- [ ] Percentage recalculates

#### Delete Attendance ✅
- [ ] Click "Delete" on record
- [ ] Confirm deletion
- [ ] Record removed
- [ ] Percentage updates again

---

### 6️⃣ **Assignment Upload** - Submission Management

**Location:** `/assignment-upload`

#### Submit Assignment ✅
- [ ] Navigate to Assignment Upload page
- [ ] Find a pending assignment
- [ ] Click "Upload Submission"
- [ ] Fill form:
  - File Name: "my-assignment.pdf"
  - Submission Date: Select date
  - Grade: Leave empty (optional)
  - Marks: Leave empty (optional)
  - Feedback: Leave empty (optional)
- [ ] Click "Submit"
- [ ] Submission moves to "Previously Submitted" section
- [ ] Assignment removed from pending list

#### Edit Submission ✅
- [ ] Find your submission in "Previously Submitted"
- [ ] Click "Edit" button
- [ ] Add:
  - Grade: "A"
  - Marks: "95/100"
  - Feedback: "Excellent work!"
- [ ] Update
- [ ] Grade and marks display on submission card

#### Delete Submission ✅
- [ ] Click "Delete" on submission
- [ ] Confirm
- [ ] Submission removed
- [ ] Assignment returns to pending (if applicable)

---

## 🔍 Advanced Testing

### Test Data Persistence Within Session
- [ ] Create an event on home page
- [ ] Navigate to courses page
- [ ] Navigate back to home page
- [ ] Event still visible (context maintaining state)

### Test Form Validation
- [ ] Try to submit empty form
- [ ] Required fields should show browser validation
- [ ] Cannot submit without filling required fields

### Test Modal Behavior
- [ ] Open modal
- [ ] Click outside modal (on overlay)
- [ ] Modal closes
- [ ] Open modal
- [ ] Click X button
- [ ] Modal closes

### Test Responsive Design
- [ ] Resize browser to mobile width (< 768px)
- [ ] All modals still usable
- [ ] Forms stack vertically
- [ ] Buttons accessible

---

## 🐛 Common Issues & Solutions

### Issue: Modal doesn't open
**Solution:** Check browser console for errors, ensure Modal component imported

### Issue: Data disappears on page refresh
**Expected:** Data stored in memory, resets on refresh. See IMPLEMENTATION_SUMMARY.md for persistence solutions.

### Issue: Delete doesn't work
**Solution:** Make sure you're clicking "OK" on confirmation dialog

### Issue: Edit shows wrong data
**Solution:** Ensure clicking Edit button for correct item

### Issue: Course dropdown empty in forms
**Solution:** Make sure DataContext has courses data

---

## 📊 Testing Results Template

```
Date: ___________
Tester: ___________

✅ Home Page Events: PASS / FAIL
✅ Courses Management: PASS / FAIL
✅ Faculty Dashboard: PASS / FAIL
✅ Student Dashboard: PASS / FAIL
✅ Attendance Tracking: PASS / FAIL
✅ Assignment Upload: PASS / FAIL

Notes:
_________________________________
_________________________________
```

---

## 🎯 Quick Testing Script

**5-Minute Smoke Test:**

1. Home: Add event → Edit → Delete (1 min)
2. Courses: Add course → Filter → Delete (1 min)
3. Faculty: Create assignment → Edit → Delete (1 min)
4. Student: Edit profile (30 sec)
5. Attendance: Mark → Edit status → Delete (1 min)
6. Upload: Submit → Edit feedback → Delete (1 min)

If all above work → **All CRUD operations functional** ✅

---

## 🔄 Regression Testing

After making any code changes, re-run this checklist to ensure nothing broke.

**Priority Tests:**
1. ✅ Create operations (Add new items)
2. ✅ Read operations (View existing items)
3. ✅ Update operations (Edit items)
4. ✅ Delete operations (Remove items)

---

## 📝 Notes

- Test in Chrome, Firefox, and Edge for compatibility
- Check browser console for any warnings/errors
- Verify responsive design on different screen sizes
- Test keyboard navigation (Tab through forms)
- Test form validation for all required fields

---

**All tests passing?** 🎉 Your university portal CRUD implementation is complete and working!

**Found issues?** Check:
1. Browser console for errors
2. Component imports are correct
3. DataContext is wrapped around App
4. All dependencies installed (`npm install`)
