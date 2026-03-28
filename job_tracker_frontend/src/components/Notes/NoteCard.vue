<script setup lang="ts">
import {NeoButton, NeoCard, NeoTooltip} from "neo-brutal-vue"
import {Eye} from "lucide-vue-next";
import type {NoteResponse} from "@/api/interfaces/note.interfaces.ts";
import router from "@/router";
import type {NoteWithJobApplication} from "@/composables/Notes/useNote.ts";

const props = defineProps<{
  note: NoteWithJobApplication
}>()

const viewApplication = async (id: number) => {
  await router.push(`job-applications/${id}`)
}
</script>

<template>
    <NeoCard class="w-[400px]">
      <div class="flex justify-end">
        <h2>{{ props.note?.jobApplication?.title}}</h2>
        <NeoTooltip content="Job Application" placement="left">
          <NeoButton
              type="neo"
              size="sm"
              class="w-full flex flex-col items-start"
              @click="viewApplication(props.note?.note?.jobApplicationId)"
          >
            <div class="inline-flex items-center">
              <Eye :size="24"/> &nbsp;
              VIEW
            </div>
          </NeoButton>
        </NeoTooltip>

      </div>
      <div class="w-full mt-4">
        {{ props.note?.note?.content }}
      </div>
    </NeoCard>
</template>

<style scoped>

</style>