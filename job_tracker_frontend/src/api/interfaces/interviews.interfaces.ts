export interface InterviewResponse {
    id: number,
    jobApplicationId: number,
    scheduledAt: string,
    durationMinutes: number,
    locationOrLink: string,
    interviewerName: string,
    interviewerEmail: string,
    createdAt: string,
    updatedAt: string,
    notes: string,
    interviewType: string,
    interviewStage: string,
    interviewResult: string
}

export interface InterviewRequest{
    id?: number,
    jobApplicationId: number,
    scheduledAt: Date,
    durationMinutes: number,
    locationOrLink: string,
    interviewerName: string,
    interviewerEmail: string,
    notes: string,
    interviewType: string,
    interviewStage: string,
    interviewResult: string
}