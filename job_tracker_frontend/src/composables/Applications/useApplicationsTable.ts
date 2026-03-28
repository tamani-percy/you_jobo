import { computed, ref, type Ref } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type {
    JobApplicationRequest,
    JobApplicationResponse,
} from '@/api/interfaces/job.applications.interfaces'
import {
    createJobApplication,
    deleteJobApplicationById,
    getAllJobApplications,
    updateJobApplication,
} from '@/api/services/JobApplicationService'
import { formatLocalDateTime } from '@/utils/DateUtils.ts'
import type {TagType} from "neo-brutal-vue";
import {useToast} from "@/composables/useToast.ts";

export type JobStatus =
    | 'DRAFT'
    | 'APPLIED'
    | 'UNDER_REVIEW'
    | 'SHORTLISTED'
    | 'INTERVIEW_SCHEDULED'
    | 'INTERVIEWED'
    | 'OFFER_RECEIVED'
    | 'ACCEPTED'
    | 'REJECTED'
    | 'WITHDRAWN'

const statusTypeMap: Record<JobStatus, string> = {
    DRAFT: 'info',
    APPLIED: 'primary',
    UNDER_REVIEW: 'info',
    SHORTLISTED: 'warning',
    INTERVIEW_SCHEDULED: 'warning',
    INTERVIEWED: 'warning',
    OFFER_RECEIVED: 'success',
    ACCEPTED: 'success',
    REJECTED: 'danger',
    WITHDRAWN: 'danger',
}

export function useApplicationsTable(searchTerm?: Ref<string>) {
    const queryClient = useQueryClient()
    const {showToast} = useToast()

    const current = ref(1)
    const pageSize = ref(10)
    const deletingId = ref<number | null>(null)

    const columns = [
        { prop: 'view', label: '', width: '150px' },
        { prop: 'company', label: 'COMPANY' },
        { prop: 'title', label: 'JOB TITLE' },
        { prop: 'status', label: 'STATUS' },
        { prop: 'dateApplied', label: 'DATE APPLIED' },
        { prop: 'actions', label: 'ACTIONS' },
    ]

    const applicationsQuery = useQuery({
        queryKey: ['job-applications'],
        queryFn: getAllJobApplications,
        staleTime: 1000 * 60 * 5,
        select: (res: JobApplicationResponse[]) =>
            res.map((app) => ({
                ...app,
                dateAppliedFormatted: formatLocalDateTime(app.dateApplied),
            })),
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            deletingId.value = id
            await deleteJobApplicationById(id)
            return id
        },
        onSuccess: (deletedId) => {
            queryClient.setQueryData<JobApplicationResponse[]>(
                ['job-applications'],
                (old = []) => old.filter((app) => app.id !== deletedId)
            )
            showToast({
                type: 'success',
                title: 'Success',
                message: 'Job application successfully deleted!!',
                duration: 3000
            })
        },
        onSettled: () => {
            deletingId.value = null
        },
    })

    const createMutation = useMutation({
        mutationFn: async (payload: JobApplicationRequest) => {
            return await createJobApplication(payload)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['job-applications'] })
        },
    })

    const updateMutation = useMutation({
        mutationFn: async (payload: JobApplicationRequest & { id: number }) => {
            return await updateJobApplication(payload)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['job-applications'] })
            showToast({
                type: 'success',
                title: 'Success',
                message: 'Job application successfully updated!!',
                duration: 3000
            })
        },
    })

    const jobApplications = computed(() => applicationsQuery.data.value ?? [])

    const filteredApplications = computed(() => {
        const term = searchTerm?.value?.trim().toLowerCase() ?? ''

        if (!term) return jobApplications.value

        return jobApplications.value.filter((app) => {
            const title = app.title?.toLowerCase() ?? ''
            const companyName = app.company?.name?.toLowerCase() ?? ''
            return title.includes(term) || companyName.includes(term)
        })
    })

    const total = computed(() => filteredApplications.value.length)

    const paginatedApplications = computed(() => {
        const start = (current.value - 1) * pageSize.value
        const end = start + pageSize.value
        return filteredApplications.value.slice(start, end)
    })

    const getStatusType = (status: JobStatus): TagType => <"primary" | "success" | "warning" | "danger" | "info" | "default">statusTypeMap[status] ?? 'info'

    const resetToFirstPageOnSearch = () => {
        current.value = 1
    }

    const onDeleteJobApplication = async (id: number) => {
        await deleteMutation.mutateAsync(id)
    }

    const onCreateJobApplication = async (payload: JobApplicationRequest) => {
        await createMutation.mutateAsync(payload)
    }

    const onUpdateJobApplication = async (
        payload: JobApplicationRequest & { id: number }
    ) => {
        await updateMutation.mutateAsync(payload)
    }

    return {
        columns,
        current,
        pageSize,
        total,
        deletingId,

        jobApplications,
        filteredApplications,
        paginatedApplications,

        isLoading: applicationsQuery.isPending,
        isFetching: applicationsQuery.isFetching,
        error: applicationsQuery.error,
        refetch: applicationsQuery.refetch,

        isDeleting: deleteMutation.isPending,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,

        onDeleteJobApplication,
        onCreateJobApplication,
        onUpdateJobApplication,
        getStatusType,
        resetToFirstPageOnSearch,
    }
}