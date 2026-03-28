<script setup lang="ts">
import {Calendar, Medal, Zap} from 'lucide-vue-next'
import {NeoAccordion, NeoAccordionItem, NeoCard, NeoTag} from 'neo-brutal-vue'
import {onMounted, ref, type Ref} from 'vue'
import NumberFlow from '@number-flow/vue'
import {useDashboardStats} from '@/composables/Dashboard/useDashboardStats.ts'

const activeName: Ref<string> = ref('general')

const {
  onFetchDashboardStats,
  jobApplicationCount,
  interviewsCount,
  jobApplicationsCountByJobStatusActive,
  jobApplicationsCountByJobStatusOffers,
  jobApplicationsInterviewRate,
  jobApplicationsOfferRate,
  jobApplicationsSuccessRate,
  jobApplicationsResponseRate,
} = useDashboardStats()


onMounted(() => {
  onFetchDashboardStats()
})

</script>

<template>
  <div class="mb-5">
    <NeoAccordion v-model="activeName" accordion>
      <NeoAccordionItem name="general" title="GENERAL STATS">
        <div class="flex flex-row justify-between flex-wrap mb-5 gap-5">
          <NeoCard :showHeader="false" class="w-[350px]  h-[200px]">
            <div class="flex flex-col">
              <NeoTag class="text-xl mb-5 italic w-fit">TOTAL APPLICATIONS</NeoTag>
              <NumberFlow class="text-6xl font-bold" :value="jobApplicationCount"/>
            </div>
          </NeoCard>
          <NeoCard type="danger" variant="colored" bodyClass="bg-[#60a5fa]" :showHeader="false"
                   class="w-[350px]  h-[200px]">
            <div class="flex flex-col">
              <NeoTag class="text-xl mb-5 italic w-fit">ACTIVE APPLICATIONS</NeoTag>
              <div class="flex justify-between items-center">
                <NumberFlow class="text-6xl font-bold" :value="jobApplicationsCountByJobStatusActive"/>
                <Zap :size="30"/>
              </div>
            </div>

          </NeoCard>

          <NeoCard type="danger" variant="colored" bodyClass="bg-[#4ade80]"
                   :showHeader="false" class="w-[350px]  h-[200px]">
            <div class="flex flex-col">
              <NeoTag class="text-xl mb-5 italic w-fit">INTERVIEWS</NeoTag>
              <div class="flex justify-between items-center">
                <NumberFlow class="text-6xl font-bold" :value="interviewsCount"/>
                <Calendar :size="30"/>
              </div>
            </div>
          </NeoCard>

          <NeoCard type="success" variant="colored" :showHeader="false"
                   class="w-[350px]  h-[200px]">
            <div class="flex flex-col">
              <NeoTag class="text-xl mb-5 italic w-fit">OFFERS</NeoTag>
              <div class="flex justify-between items-center">
                <NumberFlow class="text-6xl font-bold" :value="jobApplicationsCountByJobStatusOffers"/>
                <Medal :size="30"/>
              </div>
            </div>
          </NeoCard>
        </div>

      </NeoAccordionItem>
      <NeoAccordionItem name="b" title="INSIGHTS">
        <div class="flex flex-row justify-between flex-wrap mb-5 gap-5">
          <NeoCard :showHeader="false" class="w-[350px]  h-[200px]">
            <div class="flex flex-col">
              <NeoTag class="text-xl mb-5 italic w-fit">INTERVIEW RATE</NeoTag>
              <NumberFlow suffix="%" class="text-6xl font-bold" :value="jobApplicationsInterviewRate"/>
            </div>
          </NeoCard>

          <NeoCard bodyClass="bg-[#60a5fa]" variant="colored" :showHeader="false" class="w-[350px]  h-[200px]">
            <div class="flex flex-col">
              <NeoTag class="text-xl mb-5 italic w-fit">OFFER RATE</NeoTag>
              <NumberFlow suffix="%" class="text-6xl font-bold" :value="jobApplicationsOfferRate"/>
            </div>
          </NeoCard>

          <NeoCard bodyClass="bg-[#f472b6]" :showHeader="false" class="w-[350px]  h-[200px]">
            <div class="flex flex-col">
              <NeoTag class="text-xl mb-5 italic w-fit">SUCCESS RATE</NeoTag>
              <NumberFlow suffix="%" class="text-6xl font-bold" :value="jobApplicationsSuccessRate"/>
            </div>
          </NeoCard>

          <NeoCard bodyClass="bg-[#4ade80]" :showHeader="false" class="w-[350px]  h-[200px]">
            <div class="flex flex-col">
              <NeoTag class="text-xl mb-5 italic w-fit">RESPONSE RATE</NeoTag>
              <NumberFlow suffix="%" class="text-6xl font-bold" :value="jobApplicationsResponseRate"/>
            </div>
          </NeoCard>
        </div>

      </NeoAccordionItem>
    </NeoAccordion>
  </div>
</template>