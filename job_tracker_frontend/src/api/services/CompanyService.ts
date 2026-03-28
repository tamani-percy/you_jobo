import type {AxiosResponse} from "axios";
import axiosInstance from "@/api/axiosInstance/axiosInstance.ts";
import type {CompanyRequest, CompanyResponse} from "@/api/interfaces/company.interfaces.ts";
import type {JobApplicationResponse} from "@/api/interfaces/job.applications.interfaces.ts";

export const getAllCompanies = async (): Promise<CompanyResponse[]> => {
    const res: AxiosResponse<CompanyResponse[]> = await axiosInstance.get("companies/all")
    return res.data

}

export const getCompanyById = async (id: number): Promise<CompanyResponse> => {
    const res: AxiosResponse<CompanyResponse> = await axiosInstance.get(`companies/${id}`)
    return res.data

}

export const createCompany = async (companyRequest: CompanyRequest): Promise<CompanyResponse> => {
    const res: AxiosResponse<CompanyResponse> = await axiosInstance.post("companies/", companyRequest)
    return res.data

}

export const updateCompany = async (companyRequest: CompanyRequest): Promise<CompanyResponse> => {
    const res: AxiosResponse<CompanyResponse> = await axiosInstance.patch("companies/", companyRequest)
    return res.data

}

export const deleteCompanyById = async (id: number): Promise<boolean> => {
    const res: AxiosResponse<boolean> = await axiosInstance.delete(`companies/${id}`)
    return res.data

}

export const getCompanyJobApplications = async (id: number): Promise<JobApplicationResponse[]> => {
    const res: AxiosResponse<JobApplicationResponse[]> = await axiosInstance.get(`companies/${id}/job-applications`)
    return res.data

}

export const getCompanyByJobApplicationId = async (id: number): Promise<CompanyResponse> => {
    const res: AxiosResponse<CompanyResponse> = await axiosInstance.get(`companies/job-application/${id}`)
    return res.data

}