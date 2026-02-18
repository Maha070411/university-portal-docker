package com.example.HackathonUP.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.HackathonUP.entity.Assignment;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    // Get all assignments by studentId
    List<Assignment> findByStudentId(Long studentId);

    // Optional: Get assignments by course name
    List<Assignment> findByCourse(String course);
}
