import type {LucideIcon} from "lucide-vue-next";
import {Ban, Building, Check, Clock, FlagTriangleRight, Laptop, Mail, Phone, UserRoundSearch, X} from "lucide-vue-next"
import type {TagType} from "neo-brutal-vue";

// INTERVIEW STATUSES/ENUMS
export const InterviewResults = {
    PENDING: 'PENDING',
    FAILED: 'FAILED',
    PASSED: 'PASSED'
} as const

export const InterviewTypes = {
    PHONE: 'PHONE',
    EMAIL: 'EMAIL',
    ONSITE: 'ONSITE'
} as const


export const InterviewStage = {
    HR: 'HR',
    TECHNICAL: 'TECHNICAL',
    FINAL: 'FINAL'
} as const


// UTILS
export const getInterviewResultColour = (interviewResult: string): TagType => {
    switch (interviewResult) {
        case InterviewResults.FAILED:
            return <"primary" | "success" | "warning" | "danger" | "info" | "default">'error'
        case InterviewResults.PASSED:
            return 'success'
        case InterviewResults.PENDING:
            return 'info'
        default:
            return 'primary'
    }
}

export const getInterviewResultIcon = (interviewResult: string): LucideIcon => {
    switch (interviewResult) {
        case InterviewResults.FAILED:
            return X
        case InterviewResults.PASSED:
            return Check
        case InterviewResults.PENDING:
            return Clock
        default:
            return Ban
    }
}

export const getInterviewTypesColour = (interviewType: string): TagType => {
    switch (interviewType) {
        case InterviewTypes.PHONE:
            return "info"
        case InterviewTypes.ONSITE:
            return "success"
        case InterviewTypes.EMAIL:
            return "warning"
        default:
            return "primary"
    }
}

export const getInterviewTypesIcon = (interviewType: string): LucideIcon => {
    switch (interviewType) {
        case InterviewTypes.PHONE:
            return Phone
        case InterviewTypes.ONSITE:
            return Building
        case InterviewTypes.EMAIL:
            return Mail
        default:
            return Ban
    }
}

export const getInterviewStageColour = (interviewStage: string): TagType => {
    switch (interviewStage) {
        case InterviewStage.HR:
            return "info"
        case InterviewStage.FINAL:
            return "success"
        case InterviewStage.TECHNICAL:
            return "warning"
        default:
            return "primary"
    }
}

export const getInterviewStageIcon = (interviewStage: string): LucideIcon => {
    switch (interviewStage) {
        case InterviewStage.HR:
            return UserRoundSearch
        case InterviewStage.FINAL:
            return FlagTriangleRight
        case InterviewStage.TECHNICAL:
            return Laptop
        default:
            return Ban
    }
}