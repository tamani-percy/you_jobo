import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {ref} from "vue";
import type {DocumentRequest, DocumentResponse} from "@/api/interfaces/document.interfaces.ts";
import {createDocument, updateDocument} from "@/api/services/DocumentService.ts";
import {useToast} from "@/composables/useToast.ts";

export function useCreateDocumentMutation(jobApplicationId: number) {

    const {showToast} = useToast()
    const queryClient = useQueryClient()
    const uploadProgress = ref(0)

    const mutation = useMutation<
        DocumentResponse,
        Error,
        { request: DocumentRequest; file: File, replaceDocument: boolean }
    >({
        mutationFn: async ({request, file, replaceDocument}) => {
            uploadProgress.value = 0

            if (replaceDocument) {
                return await updateDocument(request, file, (progress) => {
                    uploadProgress.value = progress
                })
            } else {
                return await createDocument(request, file, (progress) => {
                    uploadProgress.value = progress
                })
            }
        },
        onSuccess: async () => {
            uploadProgress.value = 0
            await queryClient.invalidateQueries({
                queryKey: ['job-application-documents', jobApplicationId],
            })
            await queryClient.invalidateQueries({
                queryKey: ['documents', jobApplicationId],
            })
            showToast({
                type: 'success',
                title: 'Success',
                message: 'Document successfully created!!',
                duration: 3000
            })
        },
        onError: () => {
            uploadProgress.value = 0
        },
    })

    return {
        deleted: mutation.mutateAsync,
        createDocument: mutation.mutateAsync,
        isCreating: mutation.isPending,
        uploadProgress,
        error: mutation.error,
    }
}