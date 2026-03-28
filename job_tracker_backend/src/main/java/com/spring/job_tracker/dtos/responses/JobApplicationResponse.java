package com.spring.job_tracker.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationResponse {

    private Long id;
    private String title;
    private String department;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String currency;
    private String jobPostUrl;
    private LocalDate datePosted;
    private LocalDate dateApplied;
    private LocalDate deadline;
    private String outcomeReason;
    private CompanyResponse company;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private String priority;
    private String workMode;
    private String jobType;
    private String source;
    private String status;
}
