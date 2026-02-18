package com.example.HackathonUP.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.HackathonUP.entity.Faculty;
import java.util.Optional;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    // for login: find faculty by email
    Optional<Faculty> findByEmail(String email);
}
