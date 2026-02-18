package com.example.HackathonUP.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.HackathonUP.dto.AssignmentDto;
import com.example.HackathonUP.entity.Assignment;
import com.example.HackathonUP.repository.AssignmentRepository;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public AssignmentDto createAssignment(AssignmentDto dto) {
        Assignment assignment = mapToEntity(dto);
        return mapToDto(assignmentRepository.save(assignment));
    }

    public List<AssignmentDto> getAssignmentsByStudentId(Long studentId) {
        return assignmentRepository.findByStudentId(studentId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<AssignmentDto> getAllAssignments() {
        return assignmentRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private AssignmentDto mapToDto(Assignment a) {
        AssignmentDto dto = new AssignmentDto();
        dto.setId(a.getId());
        dto.setStudentId(a.getStudentId());
        dto.setTitle(a.getTitle());
        dto.setDescription(a.getDescription());
        dto.setCourse(a.getCourse());
        dto.setDueDate(a.getDueDate());
        dto.setStatus(a.getStatus());
        return dto;
    }

    private Assignment mapToEntity(AssignmentDto dto) {
        Assignment a = new Assignment();
        a.setStudentId(dto.getStudentId());
        a.setTitle(dto.getTitle());
        a.setDescription(dto.getDescription());
        a.setCourse(dto.getCourse());
        a.setDueDate(dto.getDueDate());
        a.setStatus(dto.getStatus());
        return a;
    }
}
