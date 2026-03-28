export interface NoteRequest {
    id?: number,
    jobApplicationId: number,
    content: string
}

export interface NoteResponse {
    id: number,
    jobApplicationId: number,
    content: string,
    createdAt: string,
    updatedAt: string
}