package com.example.HackathonUP.entity;

import jakarta.persistence.*;

@Entity
public class Faculty {

    @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String department;
    private String password;  // for login

    public Faculty() {
    }

    public Faculty(Long id, String name, String email, String department, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getDepartment() {
        return department;
    }

    public String getPassword() {
        return password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
