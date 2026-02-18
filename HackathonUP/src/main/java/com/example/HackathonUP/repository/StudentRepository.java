package com.example.HackathonUP.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.example.HackathonUP.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRollNo(String rollNo);

    Optional<Student> findByEmail(String email);
}
