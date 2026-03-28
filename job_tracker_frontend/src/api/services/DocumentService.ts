import type {AxiosResponse} from 'axios'
import axiosInstance from '@/api/axiosInstance/axiosInstance'
import type {DocumentRequest, DocumentResponse,} from '@/api/interfaces/document.interfaces'

export const getAllDocuments = async (): Promise<DocumentResponse[]> => {
    const res: AxiosResponse<DocumentResponse[]> = await axiosInstance.get('documents/all')
    return res.data
}

export const getDocumentsByJobApplicationId = async (
    id: number
): Promise<DocumentResponse[]> => {
    const res: AxiosResponse<DocumentResponse[]> = await axiosInstance.get(
        `documents/job-application/${id}`
    )
    return res.data
}

export const createDocument = async (
    documentRequest: DocumentRequest,
    file: File,
    onProgress?: (progress: number) => void
): Promise<DocumentResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('documentRequest', JSON.stringify(documentRequest))

    const res: AxiosResponse<DocumentResponse> = await axiosInstance.post(
        'documents/',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total && onProgress) {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    )
                    onProgress(progress)
                }
            },
        }
    )

    return res.data
}

export const updateDocument = async (
    documentRequest: DocumentRequest,
    file: File,
    onProgress?: (progress: number) => void
): Promise<DocumentResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('documentRequest', JSON.stringify(documentRequest))

    const res: AxiosResponse<DocumentResponse> = await axiosInstance.patch(
        'documents/',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total && onProgress) {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    )
                    onProgress(progress)
                }
            },
        }
    )

    return res.data
}

export const deleteDocumentById = async (id: number): Promise<boolean> => {
    const res: AxiosResponse<boolean> = await axiosInstance.delete(`documents/${id}`)
    return res.data
}

export const downloadFile = async (fileKey: string) => {
    return await axiosInstance.get(`documents/download`, {
        params: {fileKey},
        responseType: 'blob',
    })
}