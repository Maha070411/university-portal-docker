package com.example.HackathonUP.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.HackathonUP.entity.Attendance;
import com.example.HackathonUP.entity.Student;
import com.example.HackathonUP.entity.Faculty;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {


    List<Attendance> findByStudentId(Long studentId);


}
