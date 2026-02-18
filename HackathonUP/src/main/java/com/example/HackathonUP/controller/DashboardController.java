package com.example.HackathonUP.controller;

import com.example.HackathonUP.entity.Student;
import com.example.HackathonUP.service.StudentService;
import com.example.HackathonUP.service.AssignmentService;
import com.example.HackathonUP.service.AttendanceService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/dashboard")
public class DashboardController {

    private final StudentService studentService;
    private final AssignmentService assignmentService;
    private final AttendanceService attendanceService;

    public DashboardController(StudentService studentService,
            AssignmentService assignmentService,
            AttendanceService attendanceService) {
        this.studentService = studentService;
        this.assignmentService = assignmentService;
        this.attendanceService = attendanceService;
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<Map<String, Object>> getStudentDashboard(@PathVariable Long studentId) {

        Student student = studentService.getStudentById(studentId);

        if (student == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put("student", student);
        dashboard.put("assignments",
                assignmentService.getAssignmentsByStudentId(studentId));
        dashboard.put("attendance",
                attendanceService.getAttendanceByStudent(studentId));

        return ResponseEntity.ok(dashboard);
    }
}
