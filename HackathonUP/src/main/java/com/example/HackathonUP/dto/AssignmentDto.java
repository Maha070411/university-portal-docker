package com.example.HackathonUP.dto;


import java.time.LocalDate;

public class AssignmentDto {

    private Long id;
    private Long studentId;
    private String title;
    private String course; 
    private String description;
    private LocalDate dueDate;
    private String status; // Pending / Submitted / Late
	public AssignmentDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AssignmentDto(Long id, Long studentId, String title, String course, String description, LocalDate dueDate,
			String status) {
		super();
		this.id = id;
		this.studentId = studentId;
		this.title = title;
		this.course = course;
		this.description = description;
		this.dueDate = dueDate;
		this.status = status;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getStudentId() {
		return studentId;
	}
	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCourse() {
		return course;
	}
	public void setCourse(String course) {
		this.course = course;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public LocalDate getDueDate() {
		return dueDate;
	}
	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

   
}

