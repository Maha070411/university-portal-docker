package com.example.HackathonUP.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.HackathonUP.dto.StudentDto;
import com.example.HackathonUP.entity.Student;
import com.example.HackathonUP.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public StudentDto registerStudent(StudentDto dto) {
        Student student = new Student();
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setDepartment(dto.getDepartment());
        student.setRollNo(dto.getRollNo());
        student.setPassword(dto.getPassword()); // In real app, this should be hashed

        Student savedStudent = studentRepository.save(student);
        return mapToDto(savedStudent);
    }

    public StudentDto loginStudent(String rollNo, String password) {
        Student student = studentRepository.findByRollNo(rollNo)
                .orElse(null);

        if (student != null && student.getPassword().equals(password)) {
            return mapToDto(student);
        }
        return null;
    }

    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private StudentDto mapToDto(Student student) {
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setDepartment(student.getDepartment());
        dto.setRollNo(student.getRollNo());
        // Do not return password in DTO
        return dto;
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

}