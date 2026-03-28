<template>
  <div class="space-y-6">
    <NeoSteps :active="currentStep">
      <NeoStep title="Basic Info" description="Title, department, type, source, status"/>
      <NeoStep title="Dates" description="Posted, applied, and deadline dates"/>
      <NeoStep title="Compensation" description="Salary and job post link"/>
      <NeoStep title="Company" description="Select existing or create a new company"/>
    </NeoSteps>

    <p class="text-sm text-gray-600">
      Fields marked <span class="text-red-500">*</span> are required.
    </p>

    <!-- STEP 1 -->
    <NeoSpace v-if="currentStep === 1" class="w-full flex flex-col">
      <div class="grid grid-cols-2 gap-10">
        <div class="space-y-1">
          <FieldLabel label="Job Title" required/>
          <NeoInput :model-value="title" @update:model-value="emit('update:title', $event)" placeholder="Job title"/>
        </div>
        <div class="space-y-1">
          <FieldLabel label="Department"/>
          <NeoInput :model-value="department" @update:model-value="emit('update:department', $event)"
                    placeholder="Department"/>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-10">
        <div class="space-y-1">
          <FieldLabel label="Job Type" required/>
          <NeoSelect
              :model-value="selectedJobType"
              @update:model-value="emit('update:selectedJobType', $event)"
              :options="JobType"
              placeholder="Select job type"
          />
        </div>
        <div class="space-y-1">
          <FieldLabel label="Job Source" required/>
          <NeoSelect
              :model-value="selectedJobSource"
              @update:model-value="emit('update:selectedJobSource', $event)"
              :options="Source"
              placeholder="Select job source"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-10">
        <div class="space-y-1">
          <FieldLabel label="Work Mode" required/>
          <NeoSelect
              :model-value="selectedWorkMode"
              @update:model-value="emit('update:selectedWorkMode', $event)"
              :options="WorkMode"
              placeholder="Select work mode"
          />
        </div>
        <div class="space-y-1">
          <FieldLabel label="Application Status" required/>
          <NeoSelect
              :model-value="selectedJobStatus"
              @update:model-value="emit('update:selectedJobStatus', $event)"
              :options="JobApplicationStatus"
              placeholder="Select application status"
          />
        </div>
      </div>

      <div class="space-y-1">
        <FieldLabel label="Priority" required/>
        <div class="flex gap-2">
          <NeoButton :type="priority === 'LOW' ? 'info' : 'neo'" @click="emit('update:priority', 'LOW')">LOW
          </NeoButton>
          <NeoButton :type="priority === 'MEDIUM' ? 'warning' : 'neo'" @click="emit('update:priority', 'MEDIUM')">
            MEDIUM
          </NeoButton>
          <NeoButton :type="priority === 'HIGH' ? 'danger' : 'neo'" @click="emit('update:priority', 'HIGH')">HIGH
          </NeoButton>
        </div>
      </div>
    </NeoSpace>

    <!-- STEP 2 -->
    <div v-if="currentStep === 2" class="flex gap-10 flex-wrap justify-center">
      <div>
        <BlurReveal :delay="0.2" :duration="0.75" class="mb-2">
          <h2 class="text-base text-center font-bold tracking-tighter">
            Date Posted <span class="text-red-500">*</span>
          </h2>
        </BlurReveal>
        <NeoCalendar :model-value="datePosted" @update:model-value="emit('update:datePosted', $event)"
                     :first-day-of-week="1"/>
      </div>
      <div>
        <BlurReveal :delay="0.2" :duration="0.75" class="mb-2">
          <h2 class="text-base text-center font-bold tracking-tighter">
            Date Applied <span class="text-red-500">*</span>
          </h2>
        </BlurReveal>
        <NeoCalendar :model-value="dateApplied" @update:model-value="emit('update:dateApplied', $event)"
                     :first-day-of-week="1"/>
      </div>
      <div>
        <BlurReveal :delay="0.2" :duration="0.75" class="mb-2">
          <h2 class="text-base text-center font-bold tracking-tighter">
            Deadline <span class="text-red-500">*</span>
          </h2>
        </BlurReveal>
        <NeoCalendar :model-value="deadline" @update:model-value="emit('update:deadline', $event)"
                     :first-day-of-week="1"/>
      </div>
    </div>

    <!-- STEP 3 -->
    <NeoSpace v-if="currentStep === 3" class="w-full">
      <div class="space-y-1">
        <FieldLabel label="Salary (Min)"/>
        <NeoInput
            :model-value="salaryMin"
            @update:model-value="onSalaryMinUpdate"
            placeholder="Salary (Min)"
            type="number"
        />

      </div>
      <div class="space-y-1">
        <FieldLabel label="Salary (Max)"/>
        <NeoInput
            :model-value="salaryMax"
            @update:model-value="onSalaryMaxUpdate"
            placeholder="Salary (Max)"
            type="number"
        />

      </div>
      <div class="space-y-1">
        <FieldLabel label="Salary Currency"/>
        <NeoSelect
            :model-value="selectedCurrency"
            @update:model-value="emit('update:selectedCurrency', $event)"
            :options="Currencies"
            placeholder="Select currency"
        />
      </div>
      <div class="space-y-1">
        <FieldLabel label="Job Post URL"/>
        <NeoInput :model-value="jobPostUrl" @update:model-value="emit('update:jobPostUrl', $event)"
                  placeholder="Job Post URL"/>
      </div>
    </NeoSpace>

    <!-- STEP 4 -->
    <div v-if="currentStep === 4" class="space-y-4">

      <NeoCheckbox
          :model-value="companyAlreadyExists"
          @update:model-value="onCompanyAlreadyExistsUpdate"
      >
        I already saved company
      </NeoCheckbox>

      <div v-if="companyAlreadyExists" class="space-y-1">
        <FieldLabel label="Company"/>
        <NeoSelect
            :model-value="selectedCompanyId"
            @update:model-value="emit('update:selectedCompanyId', $event)"
            :options="companies"
            placeholder="Select existing company"
            filterable
        />
      </div>

      <NeoSpace v-else class="w-full">
        <div class="space-y-1">
          <FieldLabel label="Company Name"/>
          <NeoInput :model-value="companyName" @update:model-value="emit('update:companyName', $event)"
                    placeholder="Company Name"/>
        </div>
        <div class="space-y-1">
          <FieldLabel label="Company Website"/>
          <NeoInput :model-value="companyWebsite" @update:model-value="emit('update:companyWebsite', $event)"
                    placeholder="Company Website"/>
        </div>
        <div class="space-y-1">
          <FieldLabel label="Company Location"/>
          <NeoInput :model-value="companyLocation" @update:model-value="emit('update:companyLocation', $event)"
                    placeholder="Company Location"/>
        </div>
        <div class="space-y-1">
          <FieldLabel label="Company Industry"/>
          <NeoInput :model-value="companyIndustry" @update:model-value="emit('update:companyIndustry', $event)"
                    placeholder="Company Industry"/>
        </div>
        <div class="space-y-1">
          <FieldLabel label="Company Description"/>
          <NeoTextarea :model-value="companyDescription"
                       @update:model-value="emit('update:companyDescription', $event)"
                       placeholder="Company Description"/>
        </div>
      </NeoSpace>
    </div>

    <!-- ACTIONS -->
    <div class="flex justify-between pt-4">
      <NeoButton @click="emit('prev')" :disabled="currentStep === 1">Previous</NeoButton>
      <div class="flex gap-2">
        <NeoButton v-if="currentStep < 4" @click="emit('next')" :disabled="!canGoNext">Next</NeoButton>
        <NeoButton v-else @click="emit('submit')" :disabled="!canSubmit">
          {{ submitLabel }}
        </NeoButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  NeoButton,
  NeoCalendar,
  NeoCheckbox,
  NeoInput,
  NeoSelect,
  NeoSpace,
  NeoStep,
  NeoSteps,
  NeoTextarea, type SelectOption
} from 'neo-brutal-vue'
import {JobApplicationStatus, JobType, Source, WorkMode} from '@/api/data/JobApplicationStatuses.ts'
import BlurReveal from '@/components/ui/blur-reveal/BlurReveal.vue'
import FieldLabel from '@/components/FieldLabel.vue'
import {Currencies} from "@/api/data/Currencies.ts";

withDefaults(defineProps<{
  currentStep: number
  companies: SelectOption[]
  canGoNext: boolean
  canSubmit: boolean
  submitLabel?: string
  // Step 1
  title: string
  department: string
  selectedJobType: string
  selectedJobSource: string
  selectedWorkMode: string
  selectedJobStatus: string
  priority: string
  // Step 2
  datePosted: Date | undefined
  dateApplied: Date | undefined
  deadline: Date | undefined
  // Step 3
  salaryMin: number
  salaryMax: number
  selectedCurrency: string
  jobPostUrl: string
  // Step 4
  companyAlreadyExists: boolean
  selectedCompanyId: string
  companyName: string
  companyWebsite: string
  companyLocation: string
  companyIndustry: string
  companyDescription: string
}>(), {
  submitLabel: 'Save Application',
})

const emit = defineEmits<{
  (e: 'update:title', value: string): void
  (e: 'update:department', value: string): void
  (e: 'update:selectedJobType', value: string): void
  (e: 'update:selectedJobSource', value: string): void
  (e: 'update:selectedWorkMode', value: string): void
  (e: 'update:selectedJobStatus', value: string): void
  (e: 'update:priority', value: string): void
  (e: 'update:datePosted', value: Date | null): void
  (e: 'update:dateApplied', value: Date | null): void
  (e: 'update:deadline', value: Date | null): void
  (e: 'update:salaryMin', value: number): void
  (e: 'update:salaryMax', value: number): void
  (e: 'update:selectedCurrency', value: string): void
  (e: 'update:jobPostUrl', value: string): void
  (e: 'update:companyAlreadyExists', value: boolean): void
  (e: 'update:selectedCompanyId', value: string): void
  (e: 'update:companyName', value: string): void
  (e: 'update:companyWebsite', value: string): void
  (e: 'update:companyLocation', value: string): void
  (e: 'update:companyIndustry', value: string): void
  (e: 'update:companyDescription', value: string): void
  (e: 'next'): void
  (e: 'prev'): void
  (e: 'submit'): void
}>()

const onSalaryMinUpdate = (value: string | number) => {
  emit('update:salaryMin', Number(value))
}

const onSalaryMaxUpdate = (value: string | number) => {
  emit('update:salaryMax', Number(value))
}

const onCompanyAlreadyExistsUpdate = (value: boolean | any[]) => {
  emit('update:companyAlreadyExists', Array.isArray(value) ? value.length > 0 : value)
}
</script>