import {computed, type Ref, ref} from 'vue'
import {useMutation, useQuery, useQueryClient} from '@tanstack/vue-query'
import type {DocumentResponse} from '@/api/interfaces/document.interfaces'
import {formatLocalDateTime} from '@/utils/DateUtils'
import {
    deleteDocumentById,
    downloadFile,
    getAllDocuments,
    getDocumentsByJobApplicationId
} from '@/api/services/DocumentService'
import {useToast} from "@/composables/useToast.ts";

// INTERFACE
export type DocumentRow = DocumentResponse & {
    createdAtFormatted: string
}

export function useDocuments(jobApplicationId?: number) {

    //COLUMNS
    const columns = [
        {prop: 'view', label: ''},
        {prop: 'fileKey', label: 'FILE NAME'},
        {prop: 'version', label: 'VERSION'},
        {prop: 'documentType', label: 'DOCUMENT TYPE'},
        {prop: 'createdAtFormatted', label: 'CREATED AT'},
        {prop: 'actions', label: ''}
    ]

    // HOOKS/COMPOSABLES
    const {showToast} = useToast()
    const queryClient = useQueryClient()

    // REFS
    const deletingId = ref<number | null>(null)
    const downloadingFileKey: Ref<string | null> = ref(null)

    // METHODS
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            deletingId.value = id
            await deleteDocumentById(id)
            return id
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['job-application-documents', jobApplicationId],
            })
            showToast({
                type: 'success',
                title: 'Success',
                message: 'Document successfully deleted!!',
                duration: 3000
            })
        },
        onSettled: () => {
            deletingId.value = null
        },
    })

    const onDownloadDocument = async (fileKey: string) => {
        try {
            downloadingFileKey.value = fileKey

            const res = await downloadFile(fileKey)

            let fileName = 'download'

            const disposition = res.headers['content-disposition']
            if (disposition) {
                const match = disposition.match(/filename="(.+)"/)
                if (match?.[1]) {
                    fileName = match[1]
                }
            }

            const url = window.URL.createObjectURL(res.data)

            const a = document.createElement('a')
            a.href = url
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            a.remove()

            window.URL.revokeObjectURL(url)
        } catch (e) {
            console.error('Failed to download document', e)
        } finally {
            downloadingFileKey.value = null
        }
    }
    const onDeleteDocument = async (id: number) => {
        await deleteMutation.mutateAsync(id)
    }

    const jobApplicationDocumentsQuery = useQuery<DocumentResponse[], Error, DocumentRow[]>({
        queryKey: ['job-application-documents', jobApplicationId],
        queryFn: () => getDocumentsByJobApplicationId(jobApplicationId ?? 0),
        enabled: !!jobApplicationId,
        staleTime: 1000 * 60 * 5,
        select: (res) =>
            res.map((doc) => ({
                ...doc,
                createdAtFormatted: formatLocalDateTime(doc.createdAt),
            })),
    })

    const documentsQuery = useQuery<DocumentResponse[], Error, DocumentRow[]>({
        queryKey: ['documents'],
        queryFn: () => getAllDocuments(),
        enabled: true,
        staleTime: 1000 * 60 * 5,
        select: (res) =>
            res.map((doc) => ({
                ...doc,

                createdAtFormatted: formatLocalDateTime(doc.createdAt),
            }))
    })

    return {
        columns,
        deletingId,
        onDeleteDocument,
        onDownloadDocument,
        isDocumentsLoading: documentsQuery.isLoading,
        documents: computed(() => documentsQuery.data.value ?? []),
        jobApplicationDocuments: computed(() => jobApplicationDocumentsQuery.data.value ?? []),
        isJobApplicationDocumentsLoading: jobApplicationDocumentsQuery.isPending,
        isJobApplicationDocumentsFetching: jobApplicationDocumentsQuery.isFetching,
        jobApplicationDocumentsError: jobApplicationDocumentsQuery.error,
        jobApplicationDocumentsRefetch: jobApplicationDocumentsQuery.refetch,
    }
}