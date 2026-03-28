<script setup lang="ts">
import {vAutoAnimate} from '@formkit/auto-animate/vue'
import {NeoButton, NeoSpace, NeoTable, NeoTag, NeoTooltip} from "neo-brutal-vue";
import {useInterview} from "@/composables/Interviews/useInterview.ts";
import {onMounted} from "vue";
import {Eye, Trash} from "lucide-vue-next";
import {formatLocalDateTime} from "@/utils/DateUtils.ts";
import router from "@/router";

const {interviews, onFetchInterviews, isInterviewsLoading, columns, onDeleteInterview} = useInterview()

onMounted(() => {
  onFetchInterviews()
})

const viewApplication = async (id: number) => {
  await router.push(`job-applications/${id}`)
}
</script>

<template>
  <div class="mt-10">
    <NeoTable
        :loading="isInterviewsLoading"
        v-auto-animate
        row-key="id"
        :data="interviews"
        :columns="columns"
        stripe
        border
        highlightCurrentRow
    >
      <template #view="{ row }">
        <div class="flex justify-center">
          <NeoTooltip content="Job Application">
            <NeoButton type="neo" @click="viewApplication(row.jobApplicationId)">
              <div class="inline-flex items-center">
                <Eye/> &nbsp;
              </div>
            </NeoButton>
          </NeoTooltip>
        </div>
      </template>
      <template #actions="{ row }">
        <div class="flex justify-center">
          <NeoTooltip content="Delete Interview">
            <NeoButton type="danger" @click="onDeleteInterview(row.id)" :loading="isInterviewsLoading">
              <div class="inline-flex items-center">
                <Trash/> &nbsp;
              </div>
            </NeoButton>
          </NeoTooltip>
        </div>
      </template>
      <template #notes="{ row }">
        <p class="text-lg !font-medium">{{ row.notes }}</p>
      </template>
      <template #scheduledAt="{ row }">
        <p class="text-lg">{{ formatLocalDateTime(row.scheduledAt) }}</p>
        <p class="text-lg ">Duration: {{ row.durationMinutes }}mins</p>
      </template>
      <template #interviewerName="{ row }">
        <div class="flex flex-col text-center">
          <p class="text-lg">{{ row.interviewerName }}</p>
          <p class="text-lg !font-medium">{{ row.interviewerEmail }}</p>
          <p class="text-lg !font-medium">{{ row.interviewerPhone }}</p>
        </div>
      </template>
      <template #createdAt="{ row }">
        <p class="text-lg !font-medium">{{ formatLocalDateTime(row.createdAt) }}</p>
      </template>
      <template #updatedAt="{ row }">
        <p class="text-lg !font-medium">{{ formatLocalDateTime(row.updatedAt) || 'N/A' }}</p>
      </template>
      <template #interviewResult="{ row }">
        <NeoSpace class="p-13">
          <NeoTooltip content="Interview Result" placement="bottom">
            <NeoTag class="p-10" size="md" type="danger">
              <h2>{{ row.interviewResult }}</h2>
            </NeoTag>
          </NeoTooltip>
          <NeoTooltip content="Interview Type" placement="bottom">
            <NeoTag class="p-10" size="md" type="info">
              <h2>{{ row.interviewType }}</h2>
            </NeoTag>
          </NeoTooltip>
          <NeoTooltip content="Interview Stage" placement="bottom">
            <NeoTag class="p-10" size="md">
              <h2>{{ row.interviewStage }}</h2>
            </NeoTag>
          </NeoTooltip>
        </NeoSpace>
      </template>
    </NeoTable>
  </div>
</template>

<style scoped>

</style>