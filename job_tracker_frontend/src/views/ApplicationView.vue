<script setup lang="ts">
import {NeoButton, NeoCard, NeoDivider, NeoDropdown, NeoLoading, NeoTag, NeoTooltip,} from 'neo-brutal-vue'
import {Activity, Clock5, Clock8, Info, LaptopMinimal,} from 'lucide-vue-next'
import {onMounted, type Ref, ref} from 'vue'
import {useRoute} from 'vue-router'
import type {JobApplicationResponse} from '@/api/interfaces/job.applications.interfaces.ts'
import {changeJobApplicationStatus, getJobApplicationById} from '@/api/services/JobApplicationService.ts'
import {vAutoAnimate} from '@formkit/auto-animate/vue'
import type {NoteResponse} from '@/api/interfaces/note.interfaces.ts'
import {getNotesByJobApplicationId} from '@/api/services/NoteService.ts'
import Company from "@/components/Application/components/Company.vue";
import ContactPerson from "@/components/Application/components/ContactPerson.vue";
import Interviews from "@/components/Application/components/Interviews.vue";
import Notes from "@/components/Application/components/Notes.vue";
import Documents, {UpdatedDoc} from "@/components/Application/components/Documents.vue";
import {
  getDisplayValue,
  getJobSourceIcon,
  JobPriorities,
  JobSources,
  JobStatuses,
  JobTypes,
  JobWorkModes
} from "@/utils/JobApplicationUtils.ts";
import {useToast} from "@/composables/useToast.ts";
import {useContactPerson} from "@/composables/ContactPersons/useContactPerson.ts";
import {useDocuments} from "@/composables/Documents/useDocument.ts";
import {useInterview} from "@/composables/Interviews/useInterview.ts";

const route = useRoute()
const {showToast} = useToast()

const jobApplicationId = Number(route.params.id)

const isJobApplicationLoading: Ref<boolean> = ref<boolean>(false)
const isNotesLoading: Ref<boolean> = ref<boolean>(false)
const jobApplication: Ref<JobApplicationResponse | null> = ref<JobApplicationResponse | null>(null)
const notes: Ref<NoteResponse[]> = ref<NoteResponse[]>([])

const {jobApplicationContactPersons} = useContactPerson(jobApplicationId)
const {jobApplicationDocuments} = useDocuments(jobApplicationId)
const {jobApplicationInterviews} = useInterview(jobApplicationId)


const onFetchJobApplication = async () => {
  try {
    isJobApplicationLoading.value = true
    jobApplication.value = await getJobApplicationById(jobApplicationId)
  } catch (e) {
  } finally {
    isJobApplicationLoading.value = false
  }
}

const onFetchNotesByJobApplication = async () => {
  try {
    isNotesLoading.value = true
    notes.value = await getNotesByJobApplicationId(jobApplicationId)
  } catch (e) {
  } finally {
    isNotesLoading.value = false
  }
}


const onChangeJobApplicationStatus = async (label: string) => {
  try {
    await changeJobApplicationStatus(jobApplicationId, label)

    if (jobApplication.value) {
      jobApplication.value.status = label
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Job status updated!!',
        duration: 3000
      })
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  onFetchJobApplication()
  onFetchNotesByJobApplication()
})
</script>

<template>
  <NeoLoading :loading="true" type="success" v-if="isJobApplicationLoading"/>
  <div v-else v-if="jobApplication">
    <div>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div>
            <h2 class="text-4xl font-black italic">{{ jobApplication.company.name }}</h2>
            <p class="text-[#f472b6] font-bold tracking-widest text-sm">{{ jobApplication.title }}</p>
          </div>
        </div>
      </div>

      <NeoDivider class="my-5"/>

      <div class="flex justify-between gap-3">
        <NeoDropdown>
          <NeoButton type="secondary">UPDATE STATUS</NeoButton>
          <template #dropdown>
            <div class="neo-dropdown-menu">
              <div @click="onChangeJobApplicationStatus(value)" class="item" v-for="(label, value) in JobStatuses">{{
                  label
                }}
              </div>
            </div>
          </template>
        </NeoDropdown>
        <div>
          <NeoTooltip content="Priority" placement="bottom">
            <NeoTag type="danger" class="p-10" size="lg">
              <Activity :size="22"/> &nbsp;
              <h2>{{ getDisplayValue(JobPriorities, jobApplication.priority) }}</h2>
            </NeoTag>
          </NeoTooltip>
          <NeoTooltip content="Work Mode" placement="bottom">
            <NeoTag type="warning" class="p-10" size="lg">
              <LaptopMinimal :size="22"/> &nbsp;
              <h2>{{ getDisplayValue(JobWorkModes, jobApplication.workMode) }}</h2>
            </NeoTag>
          </NeoTooltip>
          <NeoTooltip content="Job Type" placement="bottom">
            <NeoTag class="p-10" size="lg">
              <Clock8 :size="22"/> &nbsp;
              <Clock5 :size="22"/> &nbsp;
              <h2>{{ getDisplayValue(JobTypes, jobApplication.jobType) }}</h2>
            </NeoTag>
          </NeoTooltip>
          <NeoTooltip content="Source" placement="bottom">
            <NeoTag type="info" class="p-10" size="lg">
              <component :is="getJobSourceIcon(jobApplication.source)" :size="22"/> &nbsp;
              <h2>{{ getDisplayValue(JobSources, jobApplication.source) }}</h2>
            </NeoTag>
          </NeoTooltip>
          <NeoTooltip content="Status" placement="bottom">
            <NeoTag type="success" class="p-10" size="lg">
              <Info :size="22"/> &nbsp;
              <div v-auto-animate class="inline-flex items-center">
                <h2 :key="jobApplication.status">
                  {{ getDisplayValue(JobStatuses, jobApplication.status) }}
                </h2>
              </div>
            </NeoTag>
          </NeoTooltip>
        </div>
      </div>

      <NeoCard class="mt-5">
        <div class="flex flex-row gap-6">

          <div class="w-2/3 pr-6 border-r-2 border-black space-y-8">
            <Company :company="jobApplication.company"/>
            <NeoDivider/>
            <Interviews :interviews="jobApplicationInterviews" :jobApplicationId="jobApplicationId"/>
          </div>

          <div class="w-1/3 space-y-8">
            <ContactPerson
                :contact-persons="jobApplicationContactPersons"
                :job-application-id="jobApplicationId"
            />
            <Documents
                :documents="jobApplicationDocuments"
                :jobApplicationId="jobApplicationId"
            />
          </div>

        </div>
      </NeoCard>

      <NeoCard class="mt-5">
        <Notes
            :notes="notes"
            :jobApplicationId="jobApplicationId"
        />
      </NeoCard>
    </div>
  </div>
</template>


<style scoped>
.neo-dropdown-menu .item {
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 700;
}

.neo-dropdown-menu .item:hover {
  background: var(--neo-yellow);
}
</style>