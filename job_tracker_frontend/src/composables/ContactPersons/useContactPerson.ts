import {computed, ref} from "vue";
import type {ContactPersonRequest, ContactPersonResponse} from "@/api/interfaces/contact.person.interfaces.ts";
import {
    createContactPerson,
    deleteContactPersonById,
    getAllContactPersons,
    getContactPersonsByJobApplicationId
} from "@/api/services/ContactPersonService.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {formatLocalDateTime} from "@/utils/DateUtils.ts";
import {useToast} from "@/composables/useToast.ts";

export type ContactResponseRow = ContactPersonResponse & {
    createdAtFormatted: string,
    updatedAtFormatted: string
}

export function useContactPerson(jobApplicationId?: number) {

    // TABLE COLUMNS
    const columns = [
        {prop: 'fullName', label: 'BIO'},
        {prop: 'role', label: 'Role'},
        {prop: 'notes', label: 'NOTES'},
        {prop: 'createdAt', label: 'CREATED AT'},
        {prop: 'updatedAt', label: 'UPDATED AT'},
    ]

    const {showToast} = useToast()
    const queryClient = useQueryClient()
    const deletingId = ref<number | null>(null)

    const contactPersonsByJobApplicationQuery = useQuery<ContactPersonResponse[], Error, ContactPersonResponse[]>({
        queryKey: ['contact-persons', jobApplicationId],
        queryFn: () => getContactPersonsByJobApplicationId(jobApplicationId ?? 0),
        staleTime: 1000 * 60 * 5,
        enabled: !!jobApplicationId
    })

    const contactPersonsQuery = useQuery<ContactPersonResponse[], Error, ContactResponseRow[]>({
        queryKey: ['contact-persons'],
        queryFn: () => getAllContactPersons(),
        staleTime: 1000 * 60 * 5,
        select: (res) =>
            res.map((contact) => ({
                ...contact,
                createdAtFormatted: formatLocalDateTime(contact.createdAt),
                updatedAtFormatted: formatLocalDateTime(contact.updatedAt),
            }))
    })
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            deletingId.value = id
            await deleteContactPersonById(id)
            return id
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['contact-persons'],
            })
            showToast({
                type: 'success',
                title: 'Success',
                message: 'Contact person successfully deleted!!',
                duration: 3000
            })
        },
        onSettled: () => {
            deletingId.value = null
        },
    })

    const onDeleteContactPerson = async (id: number) => {
        await deleteMutation.mutateAsync(id)
    }

    const createContactPersonMutation = useMutation<ContactPersonResponse, Error, ContactPersonRequest>({
        mutationFn: createContactPerson,
        onSuccess: async (): Promise<void> => {
            await queryClient.invalidateQueries({
                queryKey: ['contact-persons']
            })
            showToast({
                type: 'success',
                title: 'Success',
                message: 'Contact person successfully created!!',
                duration: 3000
            })
        }
    })

    return {
        isCreateContactPersonLoading:contactPersonsQuery.isLoading,
        jobApplicationContactPersons: computed(() => contactPersonsByJobApplicationQuery.data.value ?? []),
        isJobApplicationsContactPersonsLoading: contactPersonsQuery.isLoading,
        isContactPersonsLoading: contactPersonsByJobApplicationQuery.isLoading,
        contactPersons: computed(() => contactPersonsQuery.data.value ?? []),
        onFetchContactPersons: contactPersonsQuery,
        deletingId,
        onDeleteContactPerson,
       createContactPersonMutation,
        columns,
    }
}