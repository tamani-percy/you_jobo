<script setup lang="ts">
import BoxReveal from '@/components/ui/box-reveal/BoxReveal.vue'
import NoteCard from "@/components/Notes/NoteCard.vue";
import {useNote} from "@/composables/Notes/useNote.ts";
import {onMounted} from "vue";
import {NeoLoading, NeoEmpty} from "neo-brutal-vue";

const {isNotesLoading, notes, onFetchNotes, notesWithJobApplication} = useNote()

onMounted(() => {
  onFetchNotes()
})
</script>

<template>
  <div>
    <div class="flex justify-between w-full">
      <BoxReveal color="#E1251B" :duration="0.8">
        <h2 class="text-4xl inline-flex items-center italic">
          MY
          <span class="bg-[#fa3899] p-2 ms-1 text-white">NOTES</span>
        </h2>
      </BoxReveal>
    </div>
  </div>
  <NeoLoading v-if="isNotesLoading"/>
  <div v-else>
    <div class="mt-10 flex flex-row gap-10">
    <NoteCard v-if="notesWithJobApplication.length > 0" v-for="note in notesWithJobApplication" :key="note.note.id" :note="note"/>
    <NeoEmpty v-else description="No notes exist. Add them through a job application"/>
    </div>
  </div>
</template>