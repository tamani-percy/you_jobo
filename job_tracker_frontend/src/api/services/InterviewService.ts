import type {AxiosResponse} from "axios";
import axiosInstance from "@/api/axiosInstance/axiosInstance.ts";
import type {InterviewRequest, InterviewResponse} from "@/api/interfaces/interviews.interfaces.ts";

export const getAllInterviews = async (): Promise<InterviewResponse[]> => {

    const res: AxiosResponse<InterviewResponse[]> = await axiosInstance.get(`interviews/all`)
    return res.data

}

export const getInterviewById = async (id: number): Promise<InterviewResponse> => {

    const res: AxiosResponse<InterviewResponse> = await axiosInstance.get(`interviews/${id}`)
    return res.data

}

export const createInterview = async (interviewRequest: InterviewRequest): Promise<InterviewResponse> => {

    const res: AxiosResponse<InterviewResponse> = await axiosInstance.post(`interviews`, interviewRequest)
    return res.data

}

export const updateInterview = async (interviewRequest: InterviewRequest): Promise<InterviewResponse> => {

    const res: AxiosResponse<InterviewResponse> = await axiosInstance.patch(`interviews`, interviewRequest)
    return res.data

}

export const deleteInterviewById = async (id: number): Promise<boolean> => {

    const res: AxiosResponse<boolean> = await axiosInstance.delete(`interviews/${id}`)
    return res.data

}

export const getInterviewsByJobApplicationId = async (id: number): Promise<InterviewResponse[]> => {
    const res: AxiosResponse<InterviewResponse[]> = await axiosInstance.get(`interviews/job-application/${id}`)
    return res.data

}

export const getInterviewByInterviewType = async (interviewType: string): Promise<InterviewResponse[]> => {

    const res: AxiosResponse<InterviewResponse[]> = await axiosInstance.get(`interviews/interview-types?interviewType=${interviewType}`)
    return res.data

}

export const getInterviewByInterviewStage = async (interviewStage: string): Promise<InterviewResponse[]> => {

    const res: AxiosResponse<InterviewResponse[]> = await axiosInstance.get(`interviews/interview-stages?interviewStage=${interviewStage}`)
    return res.data

}

export const getInterviewByInterviewResults = async (interviewResult: string): Promise<InterviewResponse[]> => {

    const res: AxiosResponse<InterviewResponse[]> = await axiosInstance.get(`interviews/interview-results?interviewResult=${interviewResult}`)
    return res.data

}


// STATISTICS
export const countAllInterviews = async (): Promise<number> => {

    const res: AxiosResponse<number> = await axiosInstance.get(`interviews/count`)
    return res.data

}

export const getMostRecentInterviews = async (): Promise<InterviewResponse[]> => {

    const res: AxiosResponse<InterviewResponse[]> = await axiosInstance.get(`interviews/most-recents`)
    return res.data

}