package com.example.HackathonUP.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.HackathonUP.dto.FacultyDto;
import com.example.HackathonUP.entity.Faculty;
import com.example.HackathonUP.repository.FacultyRepository;

@Service
public class FacultyService {

    private final FacultyRepository facultyRepository;

    public FacultyService(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    // Save faculty
    public Faculty saveFaculty(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    // Get all faculty
    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

   

    // Optional: get Faculty details by email
    public Optional<Faculty> getByEmail(String email) {
        return facultyRepository.findByEmail(email);
    }


    public FacultyDto registerFaculty(FacultyDto dto) {
        Faculty faculty = new Faculty();
        faculty.setName(dto.getName());
        faculty.setEmail(dto.getEmail());
        faculty.setPassword(dto.getPassword());
        faculty.setDepartment(dto.getDepartment());

        Faculty savedFaculty = facultyRepository.save(faculty);
        return mapToDto(savedFaculty);
    }

    public boolean loginFaculty(String email, String password) {

        Optional<Faculty> optionalFaculty = facultyRepository.findByEmail(email);

        if (optionalFaculty.isPresent()) {
            Faculty faculty = optionalFaculty.get();
            return faculty.getPassword().equals(password);
        }

        return false;
    }

    private FacultyDto mapToDto(Faculty faculty) {
        FacultyDto dto = new FacultyDto();
        dto.setId(faculty.getId());
        dto.setName(faculty.getName());
        dto.setEmail(faculty.getEmail());
        dto.setDepartment(faculty.getDepartment());
        return dto;
    }
}
