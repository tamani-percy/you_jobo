import type {LucideIcon} from "lucide-vue-next";
import {Ban, Code, Linkedin, Megaphone} from "lucide-vue-next";

export const JobTypes = {
    FULLTIME: 'FULL TIME',
    PARTTIME: 'PART TIME',
    TEMPORARY: 'TEMPORARY',
    INTERNSHIP: 'INTERNSHIP',
    CONSULTANCY: 'CONSULTANCY',
    CONTRACT: 'CONTRACT',
    FREELANCE: 'FREELANCE',
    SEASONAL: 'SEASONAL'
} as const

export const JobSources = {
    LINKEDIN: 'LINKEDIN',
    COMPANYWEBSITE: 'COMPANY WEBSITE',
    REFERRAL: 'REFERRAL'
} as const

export const JobSourcesB4B = {
    LINKEDIN: 'LINKEDIN',
    COMPANYWEBSITE: 'COMPANYWEBSITE',
    REFERRAL: 'REFERRAL'
} as const

export const JobStatuses = {
    DRAFT: 'DRAFT',
    APPLIED: 'APPLIED',
    UNDER_REVIEW: 'UNDER REVIEW',
    SHORTLISTED: 'SHORTLISTED',
    INTERVIEW_SCHEDULED: 'INTERVIEW SCHEDULED',
    INTERVIEWED: 'INTERVIEWED',
    OFFER_RECEIVED: 'OFFER RECEIVED',
    ACCEPTED: 'ACCEPTED',
    REJECTED: ' REJECTED',
    WITHDRAWN: 'WITHDRAWN'
}


export const JobPriorities = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH'
}

export const JobWorkModes = {
    HYBRID: 'HYBRID',
    ONSITE: 'ONSITE',
    REMOTE: 'REMOTE'
}


export const getDisplayValue = (
    obj: Record<string, string>,
    key: string
): string => {
    return obj[key as keyof typeof obj] ?? key
}


export const getJobSourceIcon = (source: string): LucideIcon => {
    switch (source) {
        case JobSourcesB4B.COMPANYWEBSITE:
            return Code
        case JobSourcesB4B.LINKEDIN:
            return Linkedin
        case JobSourcesB4B.REFERRAL:
            return Megaphone
        default:
            return Ban
    }
}