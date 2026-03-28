<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {NeoButton, NeoCard, NeoEmpty, NeoSpace, NeoTextarea, NeoTooltip} from 'neo-brutal-vue'
import {Check, FilePenLine, Pencil, Trash2, X} from 'lucide-vue-next'
import type {NoteRequest, NoteResponse} from '@/api/interfaces/note.interfaces.ts'
import {createNote, deleteNoteById, updateNote} from "@/api/services/NoteService.ts"
import {vAutoAnimate} from '@formkit/auto-animate/vue'
import {formatLocalDateTime} from "@/utils/DateUtils.ts";

const props = defineProps<{
  notes: NoteResponse[],
  jobApplicationId: number
}>()

const emit = defineEmits<{
  (e: 'save', note: NoteResponse): void
  (e: 'update', note: NoteResponse): void
  (e: 'delete', noteId: number): void
}>()

const note = ref('')
const isSaving = ref(false)
const editingNoteId = ref<number | null>(null)
const localNotes = ref<NoteResponse[]>([...props.notes.reverse()])

watch(
    () => props.notes,
    (newNotes) => {
      localNotes.value = [...newNotes]
    },
    {deep: true}
)

const isEditing = computed(() => editingNoteId.value !== null)

const resetEditor = () => {
  note.value = ''
  editingNoteId.value = null
}

const onEdit = (selectedNote: NoteResponse) => {
  editingNoteId.value = selectedNote.id
  note.value = selectedNote.content
}

const onSave = async () => {
  try {
    if (!note.value.trim()) return

    isSaving.value = true

    if (editingNoteId.value !== null) {
      const noteUpdateRequest: NoteRequest = {
        id: editingNoteId.value,
        jobApplicationId: props.jobApplicationId,
        content: note.value
      }
      const updatedNote = await updateNote(noteUpdateRequest)

      const index = localNotes.value.findIndex(n => n.id === editingNoteId.value)
      if (index !== -1) {
        localNotes.value[index] = updatedNote
      }

    } else {
      const noteRequest: NoteRequest = {

        jobApplicationId: props.jobApplicationId,
        content: note.value
      }

      const noteResponse = await createNote(noteRequest)
      localNotes.value.unshift(noteResponse)
    }

    resetEditor()
  } catch (e) {
    console.error(e)
  } finally {
    isSaving.value = false
  }
}

const onDelete = async (noteId: number) => {
  try {
    await deleteNoteById(noteId)
    localNotes.value = localNotes.value.filter(n => n.id !== noteId)
    emit('delete', noteId)

    if (editingNoteId.value === noteId) {
      resetEditor()
    }
  } catch (e) {
    console.error(e)
  }
}

const wasUpdated = (note: NoteResponse) => {
  if (!note.createdAt || !note.updatedAt) return false
  return new Date(note.updatedAt).getTime() !== new Date(note.createdAt).getTime()
}
</script>

<template>
  <div>
    <h2 class="text-2xl inline-flex items-center mb-4">
      <FilePenLine :size="30" class="text-[#f472b6]"/>
      &nbsp;NOTES
    </h2>

    <div class="flex gap-6">
      <div class="w-1/2 space-y-3" v-auto-animate>
        <NeoEmpty v-if="localNotes.length ==0" description="NO NOTES"/>
        <NeoCard
            shadow="hover"
            variant="flat"
            v-for="n in localNotes"
            :key="n.id"
            class="p-4 flex justify-between gap-3"
        >
          <div class="flex-1 min-w-0">
            <p class="text-base italic">
              {{ n.content }}
            </p>

            <div class="mt-3 text-xs space-y-1">
              <p>
                <span class="text-sm font-semibold">Created:</span>
                {{ formatLocalDateTime(n.createdAt) }}
              </p>

              <p v-if="wasUpdated(n)">
                <span class="text-sm font-semibold">Updated:</span>
                {{ formatLocalDateTime(n.updatedAt) }}
              </p>
            </div>
          </div>

          <NeoSpace class="mt-5 ">
            <NeoTooltip content="Edit note" placement="bottom" >
              <NeoButton
                  size="sm"
                  type="neo"
                  @click="onEdit(n)"
              >
                <Pencil :size="16"/>
              </NeoButton>
            </NeoTooltip>

            <NeoTooltip content="Delete note" placement="bottom">
              <NeoButton
                  size="sm"
                  type="danger"
                  class="p-1 border-2 border-black bg-white"
                  @click="onDelete(n.id)"
              >
                <Trash2 :size="16"/>
              </NeoButton>
            </NeoTooltip>
          </NeoSpace>
        </NeoCard>
      </div>

      <div class="w-1/2 flex flex-col gap-3">
        <NeoTextarea
            v-model="note"
            :placeholder="isEditing ? 'Edit note...' : 'Add a new note...'"
            :rows="8"
        />

        <div class="flex justify-between items-center">
          <div v-if="isEditing" class="text-sm text-gray-600">
            Editing note
          </div>

          <div class="flex gap-2 ml-auto">
            <NeoButton
                v-if="isEditing"
                type="neo"
                @click="resetEditor"
            >
              <div class="inline-flex items-center">
                <X :size="16"/>
                &nbsp;Cancel
              </div>
            </NeoButton>

            <NeoButton
                type="secondary"
                :loading="isSaving"
                @click="onSave"
            >
              <div class="inline-flex items-center">
                <component :is="isEditing ? Check : FilePenLine" :size="16"/>
                &nbsp;{{ isEditing ? 'UPDATE NOTE' : 'SAVE NOTE' }}
              </div>
            </NeoButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>