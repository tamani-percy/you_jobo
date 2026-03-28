import type {AxiosResponse} from "axios";
import type {JobApplicationRequest, JobApplicationResponse} from "@/api/interfaces/job.applications.interfaces.ts";
import axiosInstance from "@/api/axiosInstance/axiosInstance.ts";

export const getAllJobApplications = async (): Promise<JobApplicationResponse[]> => {
    const res: AxiosResponse<JobApplicationResponse[]> = await axiosInstance.get("job-applications/all")
    return res.data
}

export const getJobApplicationById = async (id: number): Promise<JobApplicationResponse> => {

    const res: AxiosResponse<JobApplicationResponse> = await axiosInstance.get(`job-applications/${id}`)
    return res.data

}

export const createJobApplication = async (jobApplicationRequest: JobApplicationRequest): Promise<JobApplicationResponse> => {

    const res: AxiosResponse<JobApplicationResponse> = await axiosInstance.post("job-applications/", jobApplicationRequest)
    return res.data

}

export const updateJobApplication = async (jobApplicationRequest: JobApplicationRequest): Promise<JobApplicationResponse> => {

    const res: AxiosResponse<JobApplicationResponse> = await axiosInstance.patch("job-applications/", jobApplicationRequest)
    return res.data

}

export const deleteJobApplicationById = async (id: number): Promise<boolean> => {

    const res: AxiosResponse<boolean> = await axiosInstance.delete(`job-applications/${id}`)
    return res.data

}

export const changeJobApplicationStatus = async (id: number, status: string): Promise<JobApplicationResponse> => {

    const res: AxiosResponse<JobApplicationResponse> = await axiosInstance.post(`job-applications/status?jobApplicationId=${id}&status=${status}`)
    return res.data

}


// STATISTICS
export const countJobApplications = async (): Promise<number> => {

    const res: AxiosResponse<number> = await axiosInstance.get("job-applications/count")
    return res.data

}

export const countJobApplicationsByJobStatusActive = async (): Promise<number> => {
    const res: AxiosResponse<number> = await axiosInstance.get(`job-applications/count/status/active`)
    return res.data
}

export const countJobApplicationsByJobStatusOffers = async (): Promise<number> => {

    const res: AxiosResponse<number> = await axiosInstance.get(`job-applications/count/offers`)
    return res.data

}

export const countJobApplicationsByJobStatusAccepted = async (): Promise<number> => {

    const res: AxiosResponse<number> = await axiosInstance.get(`job-applications/count/accepted`)
    return res.data

}

export const getJobApplicationsInterviewRate = async (): Promise<number> => {

    const res: AxiosResponse<number> = await axiosInstance.get(`job-applications/rate/interview`)
    return res.data

}

export const getJobApplicationsResponseRate = async (): Promise<number> => {

    const res: AxiosResponse<number> = await axiosInstance.get(`job-applications/rate/response`)
    return res.data

}

export const getJobApplicationsOfferRate = async (): Promise<number> => {

    const res: AxiosResponse<number> = await axiosInstance.get(`job-applications/rate/offer`)
    return res.data

}

export const getJobApplicationsSuccessRate = async (): Promise<number> => {

    const res: AxiosResponse<number> = await axiosInstance.get(`job-applications/rate/success`)
    return res.data

}

export const getJobApplicationsJobStatusCount = async (): Promise<number> => {

    const res: AxiosResponse<number> = await axiosInstance.get(`job-applications/statistics/job-status-count`)
    return res.data

}

export const getOldestJobApplications = async (): Promise<JobApplicationResponse> => {

    const res: AxiosResponse<JobApplicationResponse> = await axiosInstance.get("job-applications/oldest")
    return res.data

}

