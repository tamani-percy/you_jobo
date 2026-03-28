export interface DocumentResponse {
    id: number,
    jobApplication: number,
    fileName: string,
    filePath: string,
    fileKey:string,
    fileUrl: string,
    version: string,
    createdAt: string,
    documentType: string
}

export interface DocumentRequest {
    id?: number,
    jobApplicationId: number,
    version: string,
    documentType: string
}