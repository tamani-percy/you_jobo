import type {SelectOption} from "neo-brutal-vue";

export const JobApplicationStatus: SelectOption[] = [
    {
        label: "DRAFT", value: 'DRAFT'
    },
    {
        label: 'APPLIED', value: 'APPLIED'
    },
    {
        label: 'UNDER REVIEW', value: 'UNDER_REVIEW'
    },
    {
        label: 'SHORTLISTED', value: 'SHORTLISTED'
    },
    {
        label: 'INTERVIEW SCHEDULED', value: 'INTERVIEW_SCHEDULED'
    },
    {
        label: 'INTERVIEWED', value: 'INTERVIEWED'
    },
    {
        label: 'OFFER RECEIVED', value: 'OFFER_RECEIVED'
    },
    {
        label: 'ACCEPTED', value: 'ACCEPTED'
    },
    {
        label: 'REJECTED', value: 'REJECTED'
    },
    {
        label: 'WITHDRAWN', value: 'WITHDRAWN'
    }
]

export const JobType: SelectOption[] = [
    {
        label: 'FULL-TIME', value: 'FULLTIME'
    },
    {
        label: 'PART-TIME', value: 'PARTTIME'
    },
    {
        label: 'TEMPORARY', value: 'TEMPORARY'
    },
    {
        label: 'INTERNSHIP', value: 'INTERNSHIP'
    },
    {
        label: 'CONSULTANCY', value: 'CONSULTANCY'
    },
    {
        label: 'CONTRACT', value: 'CONTRACT'
    },
    {
        label: 'FREELANCE', value: 'FREELANCE'
    },
    {
        label: 'SEASONAL', value: 'SEASONAL'
    }
]

export const WorkMode: SelectOption[] = [
    {
        label: 'HYBRID', value: 'HYBRID'
    },
    {
        label: 'ONSITE', value: 'ONSITE'
    },
    {
        label: 'REMOTE', value: 'REMOTE'
    }
]

export const Source: SelectOption[] = [
    {
        label: 'LINKEDIN', value: 'LINKEDIN'
    },
    {
        label: 'COMPANY WEBSITE', value: 'COMPANYWEBSITE'
    },
    {
        label: 'REFERRAL', value: 'REFERRAL'
    }
]

export const Priority: SelectOption[] = [
    {
        label: 'HIGH', value: 'HIGH'
    },
    {
        label: 'LOW', value: 'LOW'
    },
    {
        label: 'MEDIUM', value: 'MEDIUM'
    }
]