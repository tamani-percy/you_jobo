<script setup lang="ts">
import {computed, ref, type Ref} from 'vue'
import {
  NeoButton,
  NeoCalendar,
  NeoDialog,
  NeoInput,
  NeoSelect,
  NeoSpace,
  NeoStep,
  NeoSteps,
  NeoTextarea
} from 'neo-brutal-vue'
import type {InterviewRequest} from "@/api/interfaces/interviews.interfaces.ts";
import {createInterview} from "@/api/services/InterviewService.ts";
import {InterviewResults, InterviewStages, InterviewTypes} from "@/api/data/InterviewStatuses.ts";
import {useInterview} from "@/composables/Interviews/useInterview.ts";

const props = defineProps<{
  jobApplicationId: number
}>()

const emits = defineEmits<{
  (e: 'createdInterview', interview: any): void
}>()

const {createInterview, isCreating} = useInterview(props.jobApplicationId)

const isCreateInterviewLoading: Ref<boolean> = ref(false)
const currentStep = ref(1)

const scheduledAt = ref<Date | undefined>(undefined)
const durationMinutes = ref<number | undefined>(undefined)
const locationOrLink = ref('')
const interviewerName = ref('')
const interviewerEmail = ref('')
const notes = ref('')
const selectedInterviewType = ref('')
const selectedInterviewStage = ref('')
const selectedInterviewResult = ref('')

const isAddInterviewDialogOpen = defineModel<boolean>('isAddInterviewDialogOpen', {
  default: false
})

const isStepOneValid = computed(() => {
  return !!interviewerName.value && !!locationOrLink.value
})

const isStepTwoValid = computed(() => {
  return !!scheduledAt.value
})

const isStepThreeValid = computed(() => {
  return !!selectedInterviewStage.value &&
      !!selectedInterviewType.value &&
      !!selectedInterviewResult.value
})
const resetForm = () => {
  currentStep.value = 1
  scheduledAt.value = undefined
  durationMinutes.value = 0
  locationOrLink.value = ''
  interviewerName.value = ''
  interviewerEmail.value = ''
  notes.value = ''
  selectedInterviewType.value = ''
  selectedInterviewStage.value = ''
  selectedInterviewResult.value = ''
}

const closeDialog = () => {
  isAddInterviewDialogOpen.value = false
  resetForm()
}

const onCreateInterview = async () => {
  if (!isStepTwoValid.value) return

  if (durationMinutes.value != null) {
    isCreateInterviewLoading.value = true

    const interviewRequest: InterviewRequest = {
      jobApplicationId: props.jobApplicationId,
      scheduledAt: scheduledAt.value,
      durationMinutes: durationMinutes.value,
      locationOrLink: locationOrLink.value,
      interviewerName: interviewerName.value,
      interviewerEmail: interviewerEmail.value,
      notes: notes.value,
      interviewType: selectedInterviewType.value,
      interviewResult: selectedInterviewResult.value,
      interviewStage: selectedInterviewStage.value
    }

    await createInterview(interviewRequest)
    closeDialog()
  }
}
</script>

<template>
  <NeoDialog
      v-model="isAddInterviewDialogOpen"
      title="Create Interview"
      width="700px"
  >
    <div class="space-y-6">
      <NeoSteps :active="currentStep">
        <NeoStep title="Details" description="Interviewer and location"/>
        <NeoStep title="Schedule" description="Date, status and notes"/>
        <NeoStep title="Outcome"/>
      </NeoSteps>

      <div v-if="currentStep === 1">
        <NeoSpace>
          <NeoInput
              v-model="interviewerName"
              placeholder="Interviewer name"
              required
          />
          <NeoInput
              v-model="interviewerEmail"
              placeholder="Interviewer email"
          />
          <NeoInput
              v-model="locationOrLink"
              placeholder="Location or link"
              required
          />
          <NeoInput
              v-model="durationMinutes"
              type="number"
              placeholder="Duration in minutes"
          />
        </NeoSpace>
      </div>

      <div v-else-if="currentStep === 2">
        <div class="flex justify-center flex-col items-center">
          <p class="text-lg font-bold mb-3 text-center">
            Select interview date
          </p>
          <NeoCalendar v-model="scheduledAt" :first-day-of-week="1"/>
        </div>
      </div>

      <div v-else class="space-y-4">
        <NeoSpace class="w-full">
          <NeoSelect v-model="selectedInterviewStage" :options="InterviewStages" placeholder="Select interview stage"/>
          <NeoSelect v-model="selectedInterviewType" :options="InterviewTypes" placeholder="Select interview type"/>
          <NeoSelect v-model="selectedInterviewResult" :options="InterviewResults"
                     placeholder="Select interview result"/>
        </NeoSpace>

        <NeoTextarea v-model="notes" placeholder="Notes..." :rows="4"/>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between w-full">
        <NeoButton @click="isAddInterviewDialogOpen = false">
          Cancel
        </NeoButton>

        <div class="flex gap-2">
          <NeoButton v-if="currentStep > 1" @click="currentStep--">
            Back
          </NeoButton>

          <NeoButton
              v-if="currentStep === 1"
              type="primary"
              :disabled="!isStepOneValid"
              @click="currentStep++"
          >
            Next
          </NeoButton>

          <NeoButton
              v-else-if="currentStep === 2"
              type="primary"
              :disabled="!isStepTwoValid"
              @click="currentStep++"
          >
            Next
          </NeoButton>

          <NeoButton
              v-else
              type="primary"
              :loading="isCreateInterviewLoading"
              :disabled="!isStepThreeValid"
              @click="onCreateInterview"
          >
            Save
          </NeoButton>
        </div>
      </div>
    </template>
  </NeoDialog>
</template>