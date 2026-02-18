package com.example.HackathonUP.controller;

import com.example.HackathonUP.dto.AssignmentDto;
import com.example.HackathonUP.service.AssignmentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "*")
public class AssignmentController {

    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    // Create assignment (Faculty)
    @PostMapping("/create")
    public ResponseEntity<AssignmentDto> createAssignment(@RequestBody AssignmentDto dto) {
        return ResponseEntity.ok(assignmentService.createAssignment(dto));
    }

    // Get assignments by studentId (Student)
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<AssignmentDto>> getAssignmentsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(
                assignmentService.getAssignmentsByStudentId(studentId));
    }

    // Get all assignments (Faculty/Admin)
    @GetMapping("/all")
    public ResponseEntity<List<AssignmentDto>> getAllAssignments() {
        return ResponseEntity.ok(assignmentService.getAllAssignments());
    }
}
