package com.example.HackathonUP.entity;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String department;

    @Column(unique = true)
    private String rollNo;

    private String password;

    public Student() {
    }

    public Student(Long id, String name, String email, String department, String rollNo, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
        this.rollNo = rollNo;
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

    public String getRollNo() {
        return rollNo;
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

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
