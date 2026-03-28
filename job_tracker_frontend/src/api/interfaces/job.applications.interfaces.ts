import type {CompanyRequest, CompanyResponse} from "@/api/interfaces/company.interfaces.ts";

export interface JobApplicationResponse {
    id: number,
    title: string,
    department: string,
    salaryMin: number,
    salaryMax: number,
    currency: string,
    jobPostUrl: string,
    datePosted: string,
    dateApplied: string,
    deadline: string,
    outcomeReason: string,
    company: CompanyResponse,
    priority: string,
    workMode: string,
    jobType: string,
    source: string,
    status: string,
    createdAt: string,
    updatedAt: string
}

export interface JobApplicationRequest {
    id?: number,
    title: string,
    department: string,
    salaryMin: number,
    salaryMax: number,
    currency: string,
    jobPostUrl: string,
    datePosted: string,
    dateApplied: string,
    deadline: string,
    outcomeReason: string,
    company: CompanyRequest,
    priority: string,
    workMode: string,
    jobType: string,
    source: string,
    status: string
}