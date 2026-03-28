<script setup lang="ts">
import {ref, type Ref, watch} from 'vue'
import {vAutoAnimate} from '@formkit/auto-animate/vue'
import {NeoButton, NeoEmpty, NeoTag, NeoTimeline, NeoTimelineItem, NeoTooltip} from 'neo-brutal-vue'
import {ChartNoAxesGantt, Trash2} from 'lucide-vue-next'
import type {InterviewResponse} from '@/api/interfaces/interviews.interfaces.ts'
import CreateInterviewDialog from '@/components/Application/components/CreateInterviewDialog.vue'
import {deleteInterviewById} from '@/api/services/InterviewService.ts'
import {
  getInterviewResultColour,
  getInterviewResultIcon,
  getInterviewStageColour,
  getInterviewStageIcon,
  getInterviewTypesColour,
  getInterviewTypesIcon
} from "@/utils/InterviewUtil.ts"
import {formatLocalDateTime} from "@/utils/DateUtils.ts"
import type {InterviewRow} from "@/composables/Interviews/useInterview.ts";

const props = defineProps<{
  interviews: InterviewRow[],
  jobApplicationId: number
}>()

const isAddInterviewDialogOpen: Ref<boolean> = ref(false)
const localInterviews = ref<InterviewResponse[]>([...props.interviews])
const editingInterview = ref<InterviewResponse | null>(null)

watch(
    () => props.interviews,
    (newInterviews) => {
      localInterviews.value = [...newInterviews]
    },
    {deep: true}
)

const onInterviewCreated = (interview: InterviewResponse) => {
  localInterviews.value.unshift(interview)
}

const onInterviewUpdated = (updatedInterview: InterviewResponse) => {
  const index = localInterviews.value.findIndex(i => i.id === updatedInterview.id)
  if (index !== -1) {
    localInterviews.value[index] = updatedInterview
  }
}

const onDeleteInterview = async (interviewId: number) => {
  try {
    await deleteInterviewById(interviewId)
    localInterviews.value = localInterviews.value.filter(i => i.id !== interviewId)

    if (editingInterview.value?.id === interviewId) {
      editingInterview.value = null
    }
  } catch (e) {
    console.error(e)
  }
}

const onDialogClosed = () => {
  editingInterview.value = null
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl inline-flex items-center">
        <ChartNoAxesGantt :size="30" class="text-[#f472b6]"/>
        &nbsp;TIMELINE
      </h2>

      <NeoButton
          v-if="localInterviews.length > 0"
          type="primary"
          @click="
          editingInterview = null;
          isAddInterviewDialogOpen = true
        "
      >
        Add Interview
      </NeoButton>
    </div>

    <div v-if="localInterviews.length > 0" >
      <NeoTimeline>
        <NeoTimelineItem
            v-auto-animate
            v-for="item in localInterviews"
            :key="item.id"
        >
          <div class="group pb-2 flex justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap gap-2">
                <NeoTooltip content="Interview Result" placement="bottom">
                  <NeoTag :type="getInterviewResultColour(item.interviewResult)" size="md">
                    <component :is="getInterviewResultIcon(item.interviewResult)" :size="20"/>
                    &nbsp;
                    <p>{{ item.interviewResult }}</p>
                  </NeoTag>
                </NeoTooltip>

                <NeoTooltip content="Interview Type" placement="bottom">
                  <NeoTag :type="getInterviewTypesColour(item.interviewType)" size="md">
                    <component :is="getInterviewTypesIcon(item.interviewType)" :size="20"/>
                    &nbsp;
                    <p>{{ item.interviewType }}</p>
                  </NeoTag>
                </NeoTooltip>

                <NeoTooltip content="Interview Stage" placement="bottom">
                  <NeoTag :type="getInterviewStageColour(item.interviewStage)" size="md">
                    <component :is="getInterviewStageIcon(item.interviewStage)" :size="20"/>
                    &nbsp;
                    <p>{{ item.interviewStage }}</p>
                  </NeoTag>
                </NeoTooltip>
              </div>

              <p class="mt-3">
                <span class="font-bold">Scheduled At: </span>
                {{ formatLocalDateTime(item.scheduledAt) }}
                <span v-if="item.durationMinutes">
                  | Interview Duration: {{ item.durationMinutes }}mins
                </span>
              </p>

              <p>
                <span class="font-bold">Interviewer: </span>
                {{ item.interviewerName }}
                <span v-if="item.interviewerEmail"> | {{ item.interviewerEmail }}</span>
              </p>

              <p v-if="item.locationOrLink">
                <span class="font-bold">Location/Link: </span>{{ item.locationOrLink }}
              </p>

              <p v-if="item.notes" class="text-base italic w-3/4 mt-3">
                {{ item.notes }}
              </p>
            </div>

            <div class="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <NeoTooltip content="Delete interview" placement="bottom">
                <NeoButton
                    type="neo"
                    class="p-1 border-2 border-black bg-white"
                    @click="onDeleteInterview(item.id)"
                >
                  <Trash2 :size="16"/>
                </NeoButton>
              </NeoTooltip>
            </div>
          </div>
        </NeoTimelineItem>
      </NeoTimeline>
    </div>

    <div v-else>
      <NeoEmpty>
        <template #default>
          <p>No interviews</p>
          <NeoButton
              type="primary"
              @click="
              editingInterview = null;
              isAddInterviewDialogOpen = true
            "
          >
            Add
          </NeoButton>
        </template>
      </NeoEmpty>
    </div>
  </div>

  <CreateInterviewDialog
      v-model:isAddInterviewDialogOpen="isAddInterviewDialogOpen"
      :jobApplicationId="jobApplicationId"
      :interview="editingInterview"
      @createdInterview="onInterviewCreated"
      @updatedInterview="onInterviewUpdated"
      @closed="onDialogClosed"
  />
</template>