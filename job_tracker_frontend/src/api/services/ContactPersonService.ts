import type {AxiosResponse} from "axios";
import axiosInstance from "@/api/axiosInstance/axiosInstance.ts";
import type {ContactPersonRequest, ContactPersonResponse} from "@/api/interfaces/contact.person.interfaces.ts";

export const getAllContactPersons = async (): Promise<ContactPersonResponse[]> => {
    const res: AxiosResponse<ContactPersonResponse[]> = await axiosInstance.get(`contact-persons/all`)
    return res.data

}

export const getContactPersonById = async (id: number): Promise<ContactPersonResponse> => {
    const res: AxiosResponse<ContactPersonResponse> = await axiosInstance.get(`contact-persons/${id}`)
    return res.data
}

export const deleteContactPersonById = async (id: number): Promise<boolean> => {
    const res: AxiosResponse<boolean> = await axiosInstance.delete(`contact-persons/${id}`)
    return res.data
}

export const createContactPerson = async (contactPersonRequest: ContactPersonRequest): Promise<ContactPersonResponse> => {
    const res: AxiosResponse<ContactPersonResponse> = await axiosInstance.post(`contact-persons/`, contactPersonRequest)
    return res.data
}

export const updateContactPerson = async (contactPersonRequest: ContactPersonRequest): Promise<ContactPersonResponse> => {
    const res: AxiosResponse<ContactPersonResponse> = await axiosInstance.patch(`contact-persons/`, contactPersonRequest)
    return res.data
}

export const getContactPersonsByJobApplicationId = async (id: number): Promise<ContactPersonResponse[]> => {
    const res: AxiosResponse<ContactPersonResponse[]> = await axiosInstance.get(`contact-persons/job-application/${id}`)
    return res.data
}