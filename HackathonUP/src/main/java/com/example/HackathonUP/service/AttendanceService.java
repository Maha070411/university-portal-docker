package com.example.HackathonUP.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.HackathonUP.dto.AttendanceDto;
import com.example.HackathonUP.entity.Attendance;
import com.example.HackathonUP.repository.AttendanceRepository;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    // MARK ATTENDANCE
    public AttendanceDto markAttendance(AttendanceDto dto) {

        Attendance attendance = mapToEntity(dto);
        Attendance saved = attendanceRepository.save(attendance);

        return mapToDto(saved);
    }

    // GET ATTENDANCE BY STUDENT ID
    public List<AttendanceDto> getAttendanceByStudent(Long studentId) {
        return attendanceRepository.findByStudentId(studentId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // GET ALL ATTENDANCE
    public List<AttendanceDto> getAllAttendance() {
        return attendanceRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // DTO → ENTITY
    private Attendance mapToEntity(AttendanceDto dto) {
        Attendance attendance = new Attendance();
        attendance.setStudentId(dto.getStudentId());
        attendance.setStudentName(dto.getStudentName());
        attendance.setDate(dto.getDate());
        attendance.setStatus(dto.getStatus());
        return attendance;
    }

    // ENTITY → DTO
    private AttendanceDto mapToDto(Attendance attendance) {
        AttendanceDto dto = new AttendanceDto();
        dto.setId(attendance.getId());
        dto.setStudentId(attendance.getStudentId());
        dto.setStudentName(attendance.getStudentName());
        dto.setDate(attendance.getDate());
        dto.setStatus(attendance.getStatus());
        return dto;
    }
}
