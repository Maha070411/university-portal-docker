package com.example.HackathonUP.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.HackathonUP.entity.Faculty;
import com.example.HackathonUP.entity.Student;
import com.example.HackathonUP.repository.FacultyRepository;
import com.example.HackathonUP.repository.StudentRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(StudentRepository studentRepository, FacultyRepository facultyRepository) {
        return args -> {
            // Initialize Students
            // Initialize Students
            if (studentRepository.findByRollNo("CS2022001").isEmpty()) {
                Student student = new Student();
                student.setName("Student One");
                student.setEmail("student1@example.com");
                student.setDepartment("CSE");
                student.setRollNo("CS2022001");
                student.setPassword("password");
                studentRepository.save(student);
                System.out.println("Initialized Student: " + student.getName());
            } else {
                System.out.println("Student CS2022001 already exists.");
            }

            // Initialize Faculty
            if (facultyRepository.count() == 0) {
                Faculty faculty = new Faculty();
                faculty.setName("Faculty One");
                faculty.setEmail("faculty1@example.com");
                faculty.setDepartment("CSE");
                faculty.setPassword("password");
                facultyRepository.save(faculty);
                System.out.println("Initialized Faculty: " + faculty.getName());
            }
        };
    }
}
