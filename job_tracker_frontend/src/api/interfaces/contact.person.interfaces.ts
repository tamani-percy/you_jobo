export interface ContactPersonRequest {
    id?: number,
    jobApplicationId: number,
    fullName: string,
    email: string,
    phone: string,
    linkedinUrl: string,
    notes: string,
    role: string
}

export interface ContactPersonResponse {
    id: number,
    jobApplicationId: number,
    fullName: string,
    email: string,
    phone: string,
    linkedinUrl: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
    role: string
}