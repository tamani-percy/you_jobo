import type {AxiosResponse} from "axios";
import axiosInstance from "@/api/axiosInstance/axiosInstance.ts";
import type {NoteRequest, NoteResponse} from "@/api/interfaces/note.interfaces.ts";

export const getAllNotes = async (): Promise<NoteResponse[]> => {
    try {
        const res: AxiosResponse<NoteResponse[]> = await axiosInstance.get(`notes/all`)
        return res.data
    } catch (err: any) {
        const backendError = err.response?.data;
        throw {
            statusCode: backendError?.statusCode || backendError?.status || 500,
            message: backendError?.message || backendError || "An unexpected error occurred",
            error: true
        };
    }
}

export const getNoteById = async (id: number): Promise<NoteResponse> => {
    try {
        const res: AxiosResponse<NoteResponse> = await axiosInstance.get(`notes/${id}`)
        return res.data
    } catch (err: any) {
        const backendError = err.response?.data;
        throw {
            statusCode: backendError?.statusCode || backendError?.status || 500,
            message: backendError?.message || backendError || "An unexpected error occurred",
            error: true
        };
    }
}

export const createNote = async (noteRequest: NoteRequest): Promise<NoteResponse> => {
    try {
        const res: AxiosResponse<NoteResponse> = await axiosInstance.post(`notes/`, noteRequest)
        return res.data
    } catch (err: any) {
        const backendError = err.response?.data;
        throw {
            statusCode: backendError?.statusCode || backendError?.status || 500,
            message: backendError?.message || backendError || "An unexpected error occurred",
            error: true
        };
    }
}

export const updateNote = async (noteRequest: NoteRequest): Promise<NoteResponse> => {
    try {
        const res: AxiosResponse<NoteResponse> = await axiosInstance.patch(`notes/`, noteRequest)
        return res.data
    } catch (err: any) {
        const backendError = err.response?.data;
        throw {
            statusCode: backendError?.statusCode || backendError?.status || 500,
            message: backendError?.message || backendError || "An unexpected error occurred",
            error: true
        };
    }
}

export const deleteNoteById = async (id: number): Promise<boolean> => {
    try {
        const res: AxiosResponse<boolean> = await axiosInstance.delete(`notes/${id}`)
        return res.data
    } catch (err: any) {
        const backendError = err.response?.data;
        throw {
            statusCode: backendError?.statusCode || backendError?.status || 500,
            message: backendError?.message || backendError || "An unexpected error occurred",
            error: true
        };
    }
}

export const getNotesByJobApplicationId = async (id: number): Promise<NoteResponse[]> => {
    try {
        const res: AxiosResponse<NoteResponse[]> = await axiosInstance.get(`notes/job-application/${id}`,)
        return res.data
    } catch (err: any) {
        const backendError = err.response?.data;
        throw {
            statusCode: backendError?.statusCode || backendError?.status || 500,
            message: backendError?.message || backendError || "An unexpected error occurred",
            error: true
        };
    }
}