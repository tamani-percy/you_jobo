<script setup lang="ts">
import {Eye} from "lucide-vue-next";
import {NeoButton, NeoCard, NeoDivider, NeoLoading, NeoTag, NeoTooltip} from "neo-brutal-vue";
import JobStatusBreakdownCharts from "@/components/Dashboard/components/JobStatusBreakdownCharts.vue";
import router from "@/router";
import {useDashboardStats} from "@/composables/Dashboard/useDashboardStats.ts";

const {oldestJobApplications, isDashboardStatsLoading} = useDashboardStats()

const viewJobApplication = async (id: number) => {
  await router.push(`job-applications/${id}`)
}

</script>

<template>
  <div class="flex flex-col lg:flex-row gap-10">

    <div class="w-full md:w-2/3">
      <NeoCard title="STATUS BREAKDOWN" type="info">
        <JobStatusBreakdownCharts/>
      </NeoCard>
    </div>

    <NeoCard :showHeader="false" type="warning" class="!bg-[#fb923c] w-full md:w-1/3 " variant="colored">
      <div class="flex justify-between">
        <h2 class="mb-5">NEEDS FOLLOW-UP</h2>
        <NeoTag type="danger">
          URGENT
        </NeoTag>
      </div>
      <NeoLoading v-if="isDashboardStatsLoading"/>
      <div v-else v-for="(jobApplication, index) in oldestJobApplications" :key="jobApplication.id">
        <div class="flex gap-3 items-center">
          <NeoTooltip content="View">
            <NeoButton type="neo" size="sm" @click="viewJobApplication(jobApplication.id)">
              <Eye :size="20"/>
            </NeoButton>

          </NeoTooltip>
          <h2 class="!font-medium lowercase"> {{ jobApplication.company.name.toUpperCase() }} /
            {{ jobApplication.title }}</h2>
        </div>
        <NeoDivider v-show="index !== 4"/>
      </div>
      <div v-if="oldestJobApplications.length == 0" class="justify-center flex items-center">
      <h2 class="text-center py-10 text-xl">NO JOBS NEED A FOLLOW-UP!!</h2>
      </div>
    </NeoCard>
  </div>

</template>

<style scoped>

</style>