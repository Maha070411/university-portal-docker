package com.example.HackathonUP.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.HackathonUP.dto.FacultyDto;
import com.example.HackathonUP.dto.StudentDto;
import com.example.HackathonUP.service.FacultyService;
import com.example.HackathonUP.service.StudentService;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "*")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private StudentService studentService;

    // Register Faculty
    @PostMapping("/register")
    public ResponseEntity<FacultyDto> registerFaculty(@RequestBody FacultyDto facultyDto) {
        FacultyDto savedFaculty = facultyService.registerFaculty(facultyDto);
        return new ResponseEntity<>(savedFaculty, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginFaculty(@RequestBody FacultyDto facultyDto) {

        boolean isValid = facultyService.loginFaculty(
                facultyDto.getEmail(),
                facultyDto.getPassword());

        if (isValid) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Email or Password");
        }
    }

    // Get All Students for Faculty Dashboard
    @GetMapping("/students")
    public ResponseEntity<List<StudentDto>> getAllStudentsForFaculty() {
        List<StudentDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
}
