import type {Ref} from "vue";
import {ref} from "vue";
import type {NoteResponse} from "@/api/interfaces/note.interfaces.ts";
import {getAllNotes} from "@/api/services/NoteService.ts";
import type {JobApplicationResponse} from "@/api/interfaces/job.applications.interfaces.ts";
import {getJobApplicationById} from "@/api/services/JobApplicationService.ts";

export interface NoteWithJobApplication {
    note: NoteResponse,
    jobApplication: JobApplicationResponse
}

const notes: Ref<NoteResponse[]> = ref<NoteResponse[]>([])
const notesWithJobApplication: Ref<NoteWithJobApplication[]> = ref<NoteWithJobApplication[]>([])
const isNotesLoading: Ref<boolean> = ref<boolean>(false)


const onFetchNotes = async (): Promise<void> => {
    try {
        isNotesLoading.value = true

        const res = await getAllNotes()
        notes.value = res

        notesWithJobApplication.value = await Promise.all(
            res.map(async (note) => ({
                note,
                jobApplication: await getJobApplicationById(note.jobApplicationId)
            }))
        )

    } catch (e) {

    } finally {
        isNotesLoading.value = false
    }
}
export function useNote() {
    return {
        isNotesLoading,
        notes,
        notesWithJobApplication,
        onFetchNotes
    }
}