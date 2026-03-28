import type {SelectOption} from "neo-brutal-vue";

export const InterviewTypes: SelectOption[] = [
    {
        label: 'PHONE', value: 'PHONE'
    },
    {
        label: 'EMAIL', value: 'EMAIL'
    },
    {
        label: 'ONSITE', value: 'ONSITE'
    }
]

export const InterviewStages: SelectOption[] = [
    {
        label: 'HR', value: 'HR'
    },
    {
        label: 'TECHNICAL', value: 'FINAL'
    },
    {
        label: 'FINAL', value: 'FINAL'
    }
]

export const InterviewResults: SelectOption[] = [
    {
        label: 'PENDING', value: 'PENDING'
    },
    {
        label: 'FAILED', value: 'FAILED'
    },
    {
        label: 'PASSED', value: 'PASSED'
    }
]