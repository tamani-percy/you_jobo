import type {Ref} from "vue";
import {computed, ref} from "vue";
import type {InterviewRequest, InterviewResponse} from "@/api/interfaces/interviews.interfaces.ts";
import {
    createInterview,
    deleteInterviewById,
    getAllInterviews,
    getInterviewsByJobApplicationId
} from "@/api/services/InterviewService.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {formatLocalDateTime} from "@/utils/DateUtils.ts";
import {useToast} from "@/composables/useToast.ts";

const interviews: Ref<InterviewResponse[]> = ref<InterviewResponse[]>([])
const isInterviewsLoading: Ref<boolean> = ref<boolean>(false)

export type InterviewRow = InterviewResponse & {
    createdAtFormatted: string
}

export function useInterview(jobApplicationId?: number) {

    const {showToast} = useToast()
    const queryClient = useQueryClient()

    const columns = [
        {prop: 'view', label: ''},
        {prop: 'scheduledAt', label: 'SCHEDULED AT'},
        {prop: 'interviewerName', label: 'INTERVIEWER'},
        {prop: 'notes', label: 'NOTES'},
        {prop: 'interviewResult', label: 'STATS'},
        {prop: 'createdAt', label: 'CREATED AT'},
        {prop: 'updatedAt', label: 'UPDATED AT'},
        {prop: 'actions', label: ''}
    ]

    const mutation = useMutation<InterviewResponse, Error, InterviewRequest>({
        mutationFn: async (interviewRequest: InterviewRequest) => {
            return await createInterview(interviewRequest)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['job-application-interviews',jobApplicationId]
            })
            showToast({
                type: 'success',
                title: 'Success',
                message: 'Interview successfully created!!',
                duration: 3000
            })
        }
    })


    const jobApplicationInterviewsQuery = useQuery<InterviewResponse[], Error, InterviewRow[]>({
        queryKey: ['job-application-interviews', jobApplicationId],
        queryFn: () => getInterviewsByJobApplicationId(jobApplicationId ?? 0),
        enabled: !!jobApplicationId,
        staleTime: 1000 * 60 * 5,
        select: (res) =>
            res.map((doc) => ({
                ...doc,
                createdAtFormatted: formatLocalDateTime(doc.createdAt),
            })),

    })

    const interviewsQuery = useQuery<InterviewResponse[], Error, InterviewRow[]>({
        queryKey: ['job-application-interviews'],
        queryFn: () => getAllInterviews(),
        staleTime: 1000 * 60 * 5,
        select: (res) =>
            res.map((interview) => ({
                ...interview,
                createdAtFormatted: formatLocalDateTime(interview.createdAt),
                updatedAtFormatted: formatLocalDateTime(interview.updatedAt)
            })),

    })

    const onFetchInterviews = async (): Promise<void> => {
        try {
            isInterviewsLoading.value = true
            interviews.value = await getAllInterviews()
        } catch (e) {

        } finally {
            isInterviewsLoading.value = false
        }
    }

    const onDeleteInterview = async (id: number): Promise<void> => {
        try {
            isInterviewsLoading.value = true
            await deleteInterviewById(id)
            await onFetchInterviews()
        } catch (e) {

        } finally {
            isInterviewsLoading.value = false
        }
    }

    return {
        createInterview: mutation.mutateAsync,
        isCreating: mutation.isPending,
        interviews: computed(() => interviews.data.value ?? []),
        jobApplicationInterviews: computed(() => jobApplicationInterviewsQuery.data.value ?? []),
        onFetchInterviews,
        onDeleteInterview,
        interviews,
        columns,
        isInterviewsLoading
    }
}