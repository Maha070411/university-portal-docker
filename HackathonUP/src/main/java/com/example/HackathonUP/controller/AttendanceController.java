package com.example.HackathonUP.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.HackathonUP.dto.AttendanceDto;
import com.example.HackathonUP.service.AttendanceService;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Mark Attendance (Faculty)
    @PostMapping("/mark")
    public ResponseEntity<AttendanceDto> markAttendance(@RequestBody AttendanceDto attendanceDto) {
        AttendanceDto savedAttendance = attendanceService.markAttendance(attendanceDto);
        return new ResponseEntity<>(savedAttendance, HttpStatus.CREATED);
    }

    // Get Attendance by Student ID
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<AttendanceDto>> getAttendanceByStudent(@PathVariable Long studentId) {
        List<AttendanceDto> attendanceList = attendanceService.getAttendanceByStudent(studentId);
        return ResponseEntity.ok(attendanceList);
    }

    // Get All Attendance (Faculty Dashboard)
    @GetMapping("/all")
    public ResponseEntity<List<AttendanceDto>> getAllAttendance() {
        List<AttendanceDto> attendanceList = attendanceService.getAllAttendance();
        return ResponseEntity.ok(attendanceList);
    }
}