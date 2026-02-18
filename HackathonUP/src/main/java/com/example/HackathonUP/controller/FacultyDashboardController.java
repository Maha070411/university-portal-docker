package com.example.HackathonUP.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.HackathonUP.service.AssignmentService;
import com.example.HackathonUP.service.AttendanceService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/dashboard/faculty")
public class FacultyDashboardController {
	

    private final AttendanceService attendanceService;
    private final AssignmentService assignmentService;

    public FacultyDashboardController(AttendanceService attendanceService,
                                      AssignmentService assignmentService) {
        this.attendanceService = attendanceService;
        this.assignmentService = assignmentService;
    }

    @GetMapping("/{course}")
    public Map<String, Object> getFacultyDashboard(@PathVariable String course) {
        Map<String, Object> dashboard = new HashMap<>();
        
        // Attendance for the course
        //dashboard.put("attendance", attendanceService.getAttendanceByCourseAndDate(course, LocalDate.now()));
        
        // Assignments for the course
       // dashboard.put("assignments", assignmentService.getAssignmentsByCourse(course));
        
        return dashboard;
    }
}
