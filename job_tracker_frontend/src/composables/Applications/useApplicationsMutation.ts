import type {JobApplicationRequest, JobApplicationResponse} from "@/api/interfaces/job.applications.interfaces.ts";
import {createJobApplication, updateJobApplication} from "@/api/services/JobApplicationService.ts";
import {QueryClient, useMutation, useQueryClient} from "@tanstack/vue-query";
import {useToast} from "@/composables/useToast.ts";

export const useCreateJobApplicationMutation = () => {
    const queryClient: QueryClient = useQueryClient()
    const {showToast} = useToast()

    return useMutation<JobApplicationResponse, Error, JobApplicationRequest>({
        mutationFn: createJobApplication,
        onSuccess: async (): Promise<void> => {
            await queryClient.invalidateQueries({queryKey: ['job-applications']})
            showToast({
                type: 'success',
                title: 'Success',
                message: 'Job application successfully created!!',
                duration: 3000
            })
        },
    })
}

export const useEditJobApplicationMutation = () => {
    const queryClient: QueryClient = useQueryClient()

    return useMutation<JobApplicationResponse, Error, JobApplicationRequest>({
        mutationFn: updateJobApplication,
        onSuccess: async (): Promise<void> => {
            await queryClient.invalidateQueries({queryKey: ['job-applications']})
        },
    })
}